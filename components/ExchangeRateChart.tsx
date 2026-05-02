"use client";

import {
  useMemo,
  useState,
  type PointerEvent as ReactPointerEvent
} from "react";

import { type ExchangeRatePoint } from "@/lib/exchangeRateTypes";

const CHART_WIDTH = 360;
const CHART_HEIGHT = 220;
const PADDING_X = 18;
const PADDING_Y = 18;
const GRID_LINE_COUNT = 5;

type ChartPoint = ExchangeRatePoint & {
  x: number;
  y: number;
};

type ExchangeRateChartProps = {
  points: ExchangeRatePoint[];
  targetRate: number | null;
};

function formatRate(value: number, decimals = 4) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function buildChartModel(points: ExchangeRatePoint[], targetRate: number | null) {
  const values = points.map((point) => point.eurToInr);
  const boundedValues =
    targetRate === null ? values : [...values, targetRate];
  const minValue = Math.min(...boundedValues);
  const maxValue = Math.max(...boundedValues);
  const valueRange = maxValue - minValue || 1;
  const innerWidth = CHART_WIDTH - PADDING_X * 2;
  const innerHeight = CHART_HEIGHT - PADDING_Y * 2;

  const toX = (index: number) =>
    PADDING_X +
    (points.length === 1
      ? innerWidth / 2
      : (index / (points.length - 1)) * innerWidth);
  const toY = (value: number) =>
    CHART_HEIGHT - PADDING_Y - ((value - minValue) / valueRange) * innerHeight;

  const chartPoints: ChartPoint[] = points.map((point, index) => ({
    ...point,
    x: toX(index),
    y: toY(point.eurToInr)
  }));
  const path = chartPoints
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
    )
    .join(" ");
  const baseLineY = CHART_HEIGHT - PADDING_Y;
  const areaPath = `${path} L ${chartPoints[chartPoints.length - 1]?.x.toFixed(
    2
  )} ${baseLineY.toFixed(2)} L ${chartPoints[0]?.x.toFixed(
    2
  )} ${baseLineY.toFixed(2)} Z`;
  const horizontalGridLines = Array.from(
    { length: GRID_LINE_COUNT },
    (_, index) => {
      const ratio = index / (GRID_LINE_COUNT - 1);

      return {
        y: PADDING_Y + innerHeight * ratio
      };
    }
  );
  const verticalGridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    x: PADDING_X + innerWidth * ratio
  }));

  return {
    chartPoints,
    path,
    areaPath,
    horizontalGridLines,
    verticalGridLines,
    earliestPoint: chartPoints[0],
    latestPoint: chartPoints[chartPoints.length - 1],
    low: Math.min(...values),
    high: Math.max(...values),
    targetLineY: targetRate === null ? null : toY(targetRate)
  };
}

export function ExchangeRateChart({
  points,
  targetRate
}: ExchangeRateChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartModel = useMemo(
    () => (points.length ? buildChartModel(points, targetRate) : null),
    [points, targetRate]
  );
  const activePoint =
    activeIndex === null || !chartModel
      ? null
      : chartModel.chartPoints[activeIndex] ?? null;

  if (!points.length || !chartModel) {
    return (
      <div className="flex h-[15rem] items-center justify-center rounded-[1.55rem] border border-slate-200/80 bg-slate-50/70 text-sm text-slate-500">
        No chart data is available yet.
      </div>
    );
  }

  const handlePointerMove = (event: ReactPointerEvent<SVGRectElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    if (!bounds.width || chartModel.chartPoints.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const relativeX = Math.min(
      Math.max(event.clientX - bounds.left, 0),
      bounds.width
    );
    const ratio = relativeX / bounds.width;
    const nextIndex = Math.round(ratio * (chartModel.chartPoints.length - 1));

    setActiveIndex(nextIndex);
  };

  const tooltipLeftPercent = activePoint
    ? Math.min(Math.max((activePoint.x / CHART_WIDTH) * 100, 16), 84)
    : null;
  const tooltipTopPercent = activePoint
    ? Math.max((activePoint.y / CHART_HEIGHT) * 100 - 5, 10)
    : null;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">EUR / INR trend</p>
            <p className="mt-1 text-xs text-slate-500">
              Hover or tap the line to inspect the rate at any point.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              Low {formatRate(chartModel.low, 2)}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              High {formatRate(chartModel.high, 2)}
            </span>
            {activePoint ? (
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sky-700">
                {formatDate(activePoint.date)} | {formatRate(activePoint.eurToInr, 4)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          {activePoint && tooltipLeftPercent !== null && tooltipTopPercent !== null ? (
            <div
              className="pointer-events-none absolute z-10 rounded-[1rem] border border-slate-200/90 bg-white/95 px-3 py-2 text-xs font-medium text-slate-700 shadow-[0_14px_32px_rgba(15,23,42,0.14)] backdrop-blur"
              style={{
                left: `${tooltipLeftPercent}%`,
                top: `${tooltipTopPercent}%`,
                transform: "translate(-50%, -115%)"
              }}
            >
              <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                {formatDate(activePoint.date)}
              </p>
              <p className="mt-1 whitespace-nowrap text-sm font-semibold text-slate-950">
                1 EUR = {formatRate(activePoint.eurToInr, 4)} INR
              </p>
            </div>
          ) : null}

          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="h-[15rem] w-full"
          >
            <defs>
              <linearGradient id="guidonForexLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="guidonForexArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {chartModel.verticalGridLines.map((line) => (
              <path
                key={`v-${line.x}`}
                d={`M${line.x} ${PADDING_Y} V${CHART_HEIGHT - PADDING_Y}`}
                stroke="rgba(148,163,184,0.12)"
                strokeWidth="1"
              />
            ))}

            {chartModel.horizontalGridLines.map((line) => (
              <path
                key={`h-${line.y}`}
                d={`M${PADDING_X} ${line.y} H${CHART_WIDTH - PADDING_X}`}
                stroke="rgba(148,163,184,0.16)"
                strokeWidth="1"
              />
            ))}

            {chartModel.targetLineY !== null ? (
              <path
                d={`M${PADDING_X} ${chartModel.targetLineY} H${CHART_WIDTH - PADDING_X}`}
                stroke="#0f172a"
                strokeDasharray="6 6"
                strokeWidth="1.75"
                opacity="0.72"
              />
            ) : null}

            <path d={chartModel.areaPath} fill="url(#guidonForexArea)" />
            <path
              d={chartModel.path}
              fill="none"
              stroke="url(#guidonForexLine)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {activePoint ? (
              <>
                <path
                  d={`M${activePoint.x} ${PADDING_Y} V${CHART_HEIGHT - PADDING_Y}`}
                  stroke="rgba(15,23,42,0.24)"
                  strokeDasharray="4 5"
                  strokeWidth="1.25"
                />
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="7"
                  fill="white"
                  stroke="#0ea5e9"
                  strokeWidth="2.5"
                />
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="3.5"
                  fill="#2563eb"
                />
              </>
            ) : null}

            <circle
              cx={chartModel.latestPoint.x}
              cy={chartModel.latestPoint.y}
              r="5"
              fill="#2563eb"
            />

            <rect
              x="0"
              y="0"
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              fill="transparent"
              onPointerDown={handlePointerMove}
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setActiveIndex(null)}
            />
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-500">
          <span>{formatDate(chartModel.earliestPoint.date)}</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600">
            Latest {formatRate(chartModel.latestPoint.eurToInr, 4)}
          </span>
          <span>{formatDate(chartModel.latestPoint.date)}</span>
        </div>
      </div>
    </div>
  );
}
