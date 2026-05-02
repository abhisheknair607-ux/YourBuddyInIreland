import {
  type ExchangeHistoryRange,
  type ExchangeRatePoint,
  type ExchangeRateSnapshot
} from "@/lib/exchangeRateTypes";

const ECB_SERIES_KEY = "D.INR.EUR.SP00.A";
const ECB_DATA_URL = `https://data-api.ecb.europa.eu/service/data/EXR/${ECB_SERIES_KEY}`;
const ECB_SOURCE_URL =
  "https://data.ecb.europa.eu/key-figures/ecb-interest-rates-and-exchange-rates/exchange-rates";
const ECB_SOURCE_NAME = "ECB reference exchange rates";
const RATE_CACHE_MS = 15 * 60 * 1000;
const HISTORY_CACHE_MS = 60 * 60 * 1000;

let rateCache:
  | {
      value: ExchangeRateSnapshot;
      expiresAt: number;
    }
  | null = null;

const historyCache = new Map<
  ExchangeHistoryRange,
  {
    value: ExchangeRatePoint[];
    expiresAt: number;
  }
>();

function roundRate(value: number, decimals = 4) {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function parseCsvPoints(csv: string) {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("ECB exchange-rate response did not include any data.");
  }

  const header = parseCsvLine(lines[0]).map((column) => column.toUpperCase());
  const dateIndex = header.indexOf("TIME_PERIOD");
  const valueIndex = header.indexOf("OBS_VALUE");

  if (dateIndex === -1 || valueIndex === -1) {
    throw new Error("ECB exchange-rate response did not include expected columns.");
  }

  const points = lines
    .slice(1)
    .map((line) => parseCsvLine(line))
    .map((columns) => {
      const date = columns[dateIndex] || "";
      const rawValue = Number(columns[valueIndex]);

      if (!date || !Number.isFinite(rawValue)) {
        return null;
      }

      return {
        date,
        eurToInr: roundRate(rawValue, 4)
      } satisfies ExchangeRatePoint;
    })
    .filter((point): point is ExchangeRatePoint => Boolean(point));

  if (!points.length) {
    throw new Error("ECB exchange-rate response did not contain valid observations.");
  }

  return points.sort((first, second) => first.date.localeCompare(second.date));
}

function buildHistoryStart(range: ExchangeHistoryRange) {
  const days =
    range === "30d"
      ? 30
      : range === "90d"
        ? 90
        : range === "1y"
          ? 365
          : 365 * 5;
  const start = new Date();

  start.setDate(start.getDate() - days);

  return start.toISOString().slice(0, 10);
}

async function fetchEcbCsv(params: Record<string, string>, bustCache = false) {
  const searchParams = new URLSearchParams({
    format: "csvdata",
    detail: "dataonly",
    ...params
  });

  if (bustCache) {
    searchParams.set("_guidonBust", String(Date.now()));
  }

  const response = await fetch(`${ECB_DATA_URL}?${searchParams.toString()}`, {
    next: {
      revalidate: 60 * 60
    },
    headers: {
      Accept: "text/csv,application/json;q=0.9,*/*;q=0.8"
    }
  });

  if (!response.ok) {
    throw new Error(`ECB exchange-rate request failed with ${response.status}.`);
  }

  return response.text();
}

export async function fetchLatestExchangeRate(forceRefresh = false) {
  const now = Date.now();

  if (!forceRefresh && rateCache && rateCache.expiresAt > now) {
    return rateCache.value;
  }

  const csv = await fetchEcbCsv({ lastNObservations: "1" }, forceRefresh);
  const latestPoint = parseCsvPoints(csv).at(-1);

  if (!latestPoint) {
    throw new Error("Latest ECB exchange rate was unavailable.");
  }

  const snapshot: ExchangeRateSnapshot = {
    base: "EUR",
    quote: "INR",
    eurToInr: latestPoint.eurToInr,
    inrToEur: roundRate(1 / latestPoint.eurToInr, 6),
    asOf: latestPoint.date,
    fetchedAt: new Date().toISOString(),
    sourceName: ECB_SOURCE_NAME,
    sourceUrl: ECB_SOURCE_URL
  };

  rateCache = {
    value: snapshot,
    expiresAt: now + RATE_CACHE_MS
  };

  return snapshot;
}

export async function fetchExchangeRateHistory(
  range: ExchangeHistoryRange,
  forceRefresh = false
) {
  const cached = historyCache.get(range);
  const now = Date.now();

  if (!forceRefresh && cached && cached.expiresAt > now) {
    return cached.value;
  }

  const csv = await fetchEcbCsv(
    {
      startPeriod: buildHistoryStart(range)
    },
    forceRefresh
  );
  const points = parseCsvPoints(csv);

  historyCache.set(range, {
    value: points,
    expiresAt: now + HISTORY_CACHE_MS
  });

  return points;
}
