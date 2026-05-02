"use client";

import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BellRing,
  Banknote,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Loader2,
  Mail,
  RefreshCcw,
  ShieldCheck,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { ExchangeRateChart } from "@/components/ExchangeRateChart";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import { PageTopIdentityHeader } from "@/components/PageTopIdentityHeader";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { getClientRequestHeaders } from "@/lib/clientRequestHeaders";
import type {
  ExchangeAlert,
  ExchangeHistoryRange,
  ExchangeRatePoint,
  ExchangeRateSnapshot
} from "@/lib/exchangeRateTypes";
import { getMockUser } from "@/lib/mockAuth";

type RateResponse = {
  rate?: ExchangeRateSnapshot;
  error?: string;
};

type HistoryResponse = {
  range?: ExchangeHistoryRange;
  points?: ExchangeRatePoint[];
  error?: string;
};

type AlertsResponse = {
  alertsConfigured?: boolean;
  emailEnabled?: boolean;
  currentRate?: ExchangeRateSnapshot | null;
  activeAlerts?: ExchangeAlert[];
  triggeredAlerts?: ExchangeAlert[];
  error?: string;
};

const rangeOptions: { label: string; value: ExchangeHistoryRange }[] = [
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" }
];

function formatRate(value: number, decimals = 4) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function formatAmount(value: number, decimals = 2) {
  if (!Number.isFinite(value)) {
    return "";
  }

  return value.toFixed(decimals).replace(/\.?0+$/, "");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function getNumber(value: string) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : null;
}

function getDirectionSummary(
  targetRate: number,
  currentRate: number
): {
  label: string;
  tone: string;
  icon: typeof ArrowUpRight;
} {
  if (Math.abs(targetRate - currentRate) < 0.0001) {
    return {
      label: "This target is already at the current ECB rate.",
      tone: "text-amber-700",
      icon: AlertCircle
    };
  }

  if (targetRate > currentRate) {
    return {
      label: `Notify me when 1 EUR reaches ${formatRate(targetRate, 2)} INR or above.`,
      tone: "text-emerald-700",
      icon: ArrowUpRight
    };
  }

  return {
    label: `Notify me when 1 EUR falls to ${formatRate(targetRate, 2)} INR or below.`,
    tone: "text-sky-700",
    icon: ArrowDownRight
  };
}

function AlertRow({
  alert,
  onDelete,
  deleting
}: {
  alert: ExchangeAlert;
  onDelete?: (alertId: string) => void;
  deleting?: boolean;
}) {
  const directionText =
    alert.direction === "above" ? "Above target" : "Below target";

  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold text-slate-950">
              Target {formatRate(alert.targetRate, 2)}
            </p>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                alert.status === "triggered"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-sky-50 text-sky-700"
              }`}
            >
              {alert.status === "triggered" ? "Triggered" : directionText}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Created when 1 EUR was {formatRate(alert.currentRateAtCreation, 4)} INR.
          </p>
          {alert.triggerRate !== null && alert.triggeredAt ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Triggered at {formatRate(alert.triggerRate, 4)} on{" "}
              {formatDateTime(alert.triggeredAt)}.
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
            {alert.channels.email ? (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                Email
              </span>
            ) : null}
            {alert.channels.browser ? (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                Browser
              </span>
            ) : null}
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              In-app history
            </span>
          </div>
        </div>

        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(alert.id)}
            disabled={deleting}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Delete alert"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function CurrencyCheckPage() {
  const { data: session, status } = useSession();
  const previewUser = typeof window !== "undefined" ? getMockUser() : null;
  const hasAlertUser = Boolean(session?.user?.email || previewUser?.email);
  const [selectedRange, setSelectedRange] = useState<ExchangeHistoryRange>("90d");
  const [currentRate, setCurrentRate] = useState<ExchangeRateSnapshot | null>(null);
  const [historyPoints, setHistoryPoints] = useState<ExchangeRatePoint[]>([]);
  const [isRateLoading, setIsRateLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [rateError, setRateError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const [activeAlerts, setActiveAlerts] = useState<ExchangeAlert[]>([]);
  const [triggeredAlerts, setTriggeredAlerts] = useState<ExchangeAlert[]>([]);
  const [alertsConfigured, setAlertsConfigured] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [alertsError, setAlertsError] = useState("");
  const [isAlertsLoading, setIsAlertsLoading] = useState(false);
  const [targetRateInput, setTargetRateInput] = useState("");
  const [isSavingAlert, setIsSavingAlert] = useState(false);
  const [deletingAlertId, setDeletingAlertId] = useState("");
  const [alertSuccessMessage, setAlertSuccessMessage] = useState("");
  const [eurAmount, setEurAmount] = useState("1");
  const [inrAmount, setInrAmount] = useState("");
  const [lastEdited, setLastEdited] = useState<"eur" | "inr">("eur");
  const [browserPermission, setBrowserPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");
  const [isRequestingBrowserPermission, setIsRequestingBrowserPermission] =
    useState(false);

  const targetRate = getNumber(targetRateInput);

  const directionSummary = useMemo(() => {
    if (targetRate === null || !currentRate) {
      return null;
    }

    return getDirectionSummary(targetRate, currentRate.eurToInr);
  }, [currentRate, targetRate]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof Notification === "undefined") {
      setBrowserPermission("unsupported");
      return;
    }

    setBrowserPermission(Notification.permission);
  }, []);

  useEffect(() => {
    if (!currentRate) {
      return;
    }

    if (lastEdited === "eur") {
      const value = getNumber(eurAmount);

      if (value === null) {
        setInrAmount("");
        return;
      }

      setInrAmount(formatAmount(value * currentRate.eurToInr));
      return;
    }

    const value = getNumber(inrAmount);

    if (value === null) {
      setEurAmount("");
      return;
    }

    setEurAmount(formatAmount(value / currentRate.eurToInr));
  }, [currentRate, eurAmount, inrAmount, lastEdited]);

  useEffect(() => {
    let isMounted = true;

    async function loadRate() {
      setIsRateLoading(true);
      setRateError("");

      try {
        const response = await fetch("/api/exchange-rate", {
          headers: getClientRequestHeaders()
        });
        const data = (await response.json()) as RateResponse;

        if (!response.ok || !data.rate) {
          throw new Error(data.error || "Live EUR/INR data is unavailable.");
        }

        if (isMounted) {
          setCurrentRate(data.rate);
        }
      } catch (error) {
        if (isMounted) {
          setRateError(
            error instanceof Error
              ? error.message
              : "Live EUR/INR data is unavailable."
          );
        }
      } finally {
        if (isMounted) {
          setIsRateLoading(false);
        }
      }
    }

    void loadRate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadHistory() {
      setIsHistoryLoading(true);
      setHistoryError("");

      try {
        const response = await fetch(
          `/api/exchange-rate/history?range=${selectedRange}`,
          {
            headers: getClientRequestHeaders()
          }
        );
        const data = (await response.json()) as HistoryResponse;

        if (!response.ok || !data.points) {
          throw new Error(data.error || "EUR/INR history is unavailable.");
        }

        if (isMounted) {
          setHistoryPoints(data.points);
        }
      } catch (error) {
        if (isMounted) {
          setHistoryError(
            error instanceof Error
              ? error.message
              : "EUR/INR history is unavailable."
          );
        }
      } finally {
        if (isMounted) {
          setIsHistoryLoading(false);
        }
      }
    }

    void loadHistory();

    return () => {
      isMounted = false;
    };
  }, [selectedRange]);

  async function loadAlerts() {
    if (!hasAlertUser) {
      setIsAlertsLoading(false);
      setActiveAlerts([]);
      setTriggeredAlerts([]);
      setAlertsError("");
      return;
    }

    setIsAlertsLoading(true);
    setAlertsError("");

    try {
      const response = await fetch("/api/exchange-rate-alerts", {
        headers: getClientRequestHeaders()
      });
      const data = (await response.json()) as AlertsResponse;

      if (!response.ok) {
        throw new Error(data.error || "Exchange-rate alerts could not be loaded.");
      }

      setAlertsConfigured(data.alertsConfigured !== false);
      setEmailEnabled(data.emailEnabled === true);
      setActiveAlerts(data.activeAlerts ?? []);
      setTriggeredAlerts(data.triggeredAlerts ?? []);

      if (!currentRate && data.currentRate) {
        setCurrentRate(data.currentRate);
      }
    } catch (error) {
      setAlertsError(
        error instanceof Error
          ? error.message
          : "Exchange-rate alerts could not be loaded."
      );
    } finally {
      setIsAlertsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    void loadAlerts();
  }, [hasAlertUser, status]);

  const handleRefresh = async () => {
    setAlertSuccessMessage("");
    setRateError("");
    setHistoryError("");
    setAlertsError("");

    setIsRateLoading(true);
    setIsHistoryLoading(true);

    try {
      const [rateResponse, historyResponse] = await Promise.all([
        fetch("/api/exchange-rate", { headers: getClientRequestHeaders() }),
        fetch(`/api/exchange-rate/history?range=${selectedRange}`, {
          headers: getClientRequestHeaders()
        })
      ]);

      const rateData = (await rateResponse.json()) as RateResponse;
      const historyData = (await historyResponse.json()) as HistoryResponse;

      if (!rateResponse.ok || !rateData.rate) {
        throw new Error(rateData.error || "Live EUR/INR data is unavailable.");
      }

      if (!historyResponse.ok || !historyData.points) {
        throw new Error(historyData.error || "EUR/INR history is unavailable.");
      }

      setCurrentRate(rateData.rate);
      setHistoryPoints(historyData.points);

      if (hasAlertUser) {
        await loadAlerts();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to refresh forex data.";
      setRateError(message);
    } finally {
      setIsRateLoading(false);
      setIsHistoryLoading(false);
    }
  };

  const requestBrowserPermission = async () => {
    if (typeof Notification === "undefined") {
      setBrowserPermission("unsupported");
      return;
    }

    setIsRequestingBrowserPermission(true);

    try {
      const permission = await Notification.requestPermission();
      setBrowserPermission(permission);
      trackAnalyticsEvent("browser_alert_permission_updated", {
        permission,
        source: "currency_check"
      });
    } finally {
      setIsRequestingBrowserPermission(false);
    }
  };

  const handleCreateAlert = async () => {
    if (!hasAlertUser) {
      setAlertsError("Please sign in before saving exchange-rate alerts.");
      return;
    }

    if (!alertsConfigured) {
      setAlertsError("Exchange-rate alerts are not configured yet.");
      return;
    }

    if (!targetRateInput.trim()) {
      setAlertsError("Enter the EUR/INR target you want to track.");
      return;
    }

    const parsedTargetRate = getNumber(targetRateInput);

    if (parsedTargetRate === null || parsedTargetRate <= 0) {
      setAlertsError("Enter a valid EUR/INR target rate.");
      return;
    }

    setIsSavingAlert(true);
    setAlertsError("");
    setAlertSuccessMessage("");

    try {
      const response = await fetch("/api/exchange-rate-alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getClientRequestHeaders()
        },
        body: JSON.stringify({
          targetRate: parsedTargetRate,
          browserEnabled: browserPermission === "granted"
        })
      });
      const data = (await response.json()) as {
        alert?: ExchangeAlert;
        currentRate?: ExchangeRateSnapshot;
        error?: string;
      };

      if (!response.ok || !data.alert) {
        throw new Error(data.error || "Exchange-rate alert could not be saved.");
      }

      setTargetRateInput("");
      setAlertSuccessMessage("Target alert saved.");

      if (data.currentRate) {
        setCurrentRate(data.currentRate);
      }

      trackAnalyticsEvent("exchange_alert_created", {
        direction:
          currentRate && parsedTargetRate > currentRate.eurToInr ? "above" : "below",
        browser_enabled: browserPermission === "granted",
        email_enabled: emailEnabled,
        selected_range: selectedRange
      });
      await loadAlerts();
    } catch (error) {
      setAlertsError(
        error instanceof Error
          ? error.message
          : "Exchange-rate alert could not be saved."
      );
    } finally {
      setIsSavingAlert(false);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    setDeletingAlertId(alertId);
    setAlertsError("");
    setAlertSuccessMessage("");

    try {
      const response = await fetch(`/api/exchange-rate-alerts/${alertId}`, {
        method: "DELETE",
        headers: getClientRequestHeaders()
      });
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          data?.error || "Exchange-rate alert could not be removed."
        );
      }

      await loadAlerts();
    } catch (error) {
      setAlertsError(
        error instanceof Error
          ? error.message
          : "Exchange-rate alert could not be removed."
      );
    } finally {
      setDeletingAlertId("");
    }
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-slate-50">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

        <PageTransition className="relative z-10 flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden">
        <PageTopIdentityHeader icon={Banknote} label="Currency Check" />

        <main className="page-shell flex-1 min-h-0 pb-4 pt-1 tablet:pb-6">
          <div className="scrollbar-hidden h-full overflow-y-auto overscroll-contain pr-1 tablet:pr-2">
            <div className="grid gap-4 pb-4 pt-2 laptop:grid-cols-[1.1fr_0.9fr] tablet:pb-6">
            <div className="glass-card rounded-[1.9rem] p-5 tablet:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Live ECB rate
                  </p>
                  {isRateLoading ? (
                    <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading EUR / INR...
                    </div>
                  ) : currentRate ? (
                    <>
                      <p className="mt-3 text-[2.4rem] font-semibold leading-none text-slate-950 tablet:text-[3rem]">
                        {formatRate(currentRate.eurToInr, 4)}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        1 EUR = {formatRate(currentRate.eurToInr, 4)} INR
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-rose-600">{rateError}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => void handleRefresh()}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </button>
              </div>

              <div className="mt-6 grid gap-3 tablet:grid-cols-2">
                <div className="rounded-[1.4rem] border border-slate-200/80 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    As of
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">
                    {currentRate ? formatDate(currentRate.asOf) : "--"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    ECB publishes this reference rate on business days.
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-slate-200/80 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Reverse rate
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">
                    {currentRate ? formatRate(currentRate.inrToEur, 6) : "--"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    1 INR = {currentRate ? formatRate(currentRate.inrToEur, 6) : "--"} EUR
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <a
                  href={currentRate?.sourceUrl || "https://data.ecb.europa.eu/help/api/data"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300"
                >
                  {currentRate?.sourceName || "ECB source"}
                  <ExternalLink className="h-4 w-4 text-sky-700" />
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                  <Clock3 className="h-4 w-4 text-slate-400" />
                  Daily planning rate, not a live trading feed
                </span>
              </div>
            </div>

            <div className="glass-card rounded-[1.9rem] p-5 tablet:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                  <Banknote className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-950">Converter</p>
                  <p className="text-sm text-slate-500">
                    Type either amount and keep the other side synced.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    EUR
                  </span>
                  <input
                    value={eurAmount}
                    onChange={(event) => {
                      setLastEdited("eur");
                      setEurAmount(event.target.value);
                    }}
                    inputMode="decimal"
                    placeholder="1"
                    className="h-14 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    INR
                  </span>
                  <input
                    value={inrAmount}
                    onChange={(event) => {
                      setLastEdited("inr");
                      setInrAmount(event.target.value);
                    }}
                    inputMode="decimal"
                    placeholder="95"
                    className="h-14 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                  />
                </label>

                <div className="rounded-[1.3rem] border border-slate-200/80 bg-white px-4 py-3 text-sm leading-6 text-slate-600">
                  Use this to estimate tuition transfers, rent planning, and
                  living-cost budgets in EUR and INR.
                </div>
              </div>
            </div>
          </div>

            <section className="mt-4 grid gap-4 laptop:grid-cols-[1.08fr_0.92fr]">
            <div className="glass-card rounded-[1.9rem] p-5 tablet:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-950">Forex graph</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Compare the recent EUR / INR movement before setting a target.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {rangeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSelectedRange(option.value);
                        trackAnalyticsEvent("forex_range_selected", {
                          range: option.value
                        });
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        selectedRange === option.value
                          ? "bg-slate-950 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                {isHistoryLoading ? (
                  <div className="flex h-[15rem] items-center justify-center rounded-[1.55rem] border border-slate-200/80 bg-white text-sm text-slate-500">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading chart...
                  </div>
                ) : historyError ? (
                  <div className="flex h-[15rem] items-center justify-center rounded-[1.55rem] border border-rose-200 bg-rose-50 px-4 text-center text-sm text-rose-700">
                    {historyError}
                  </div>
                ) : (
                  <ExchangeRateChart points={historyPoints} targetRate={targetRate} />
                )}
              </div>
            </div>

            <div className="glass-card rounded-[1.9rem] p-5 tablet:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                  <BellRing className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-950">Target alerts</p>
                  <p className="text-sm text-slate-500">
                    Save a EUR / INR target and get notified when it is hit.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Target rate
                  </span>
                  <input
                    value={targetRateInput}
                    onChange={(event) => setTargetRateInput(event.target.value)}
                    inputMode="decimal"
                    placeholder="Example: 95.50"
                    className="h-14 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 text-lg font-semibold text-slate-950 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                  />
                </label>

                {directionSummary ? (
                  <div
                    className={`rounded-[1.35rem] border border-slate-200/80 bg-white px-4 py-3 text-sm font-medium ${directionSummary.tone}`}
                  >
                    <div className="flex items-start gap-2">
                      {(() => {
                        const SummaryIcon = directionSummary.icon;

                        return (
                          <SummaryIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        );
                      })()}
                      <span>{directionSummary.label}</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[1.35rem] border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-500">
                    Enter a target above or below the current rate and Guidon
                    will track it for you.
                  </div>
                )}

                <div className="rounded-[1.35rem] border border-slate-200/80 bg-white p-4">
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                      <Mail className="h-3.5 w-3.5 text-sky-700" />
                      {emailEnabled ? "Email alert enabled" : "Email alert unavailable"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                      <Bell className="h-3.5 w-3.5 text-sky-700" />
                      {browserPermission === "granted"
                        ? "Browser alerts enabled"
                        : browserPermission === "denied"
                          ? "Browser alerts blocked"
                          : browserPermission === "unsupported"
                            ? "Browser alerts unsupported"
                            : "Browser alerts available"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-sky-700" />
                      In-app history included
                    </span>
                  </div>

                  {browserPermission === "default" ? (
                    <button
                      type="button"
                      onClick={() => void requestBrowserPermission()}
                      disabled={isRequestingBrowserPermission}
                      className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isRequestingBrowserPermission ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Bell className="h-4 w-4 text-sky-700" />
                      )}
                      Enable browser alerts
                    </button>
                  ) : browserPermission === "granted" ? (
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Browser notifications work while Guidon is open in your browser.
                    </p>
                  ) : browserPermission === "denied" ? (
                    <p className="mt-4 text-sm leading-6 text-amber-700">
                      Browser notifications are blocked in this browser. Email
                      and in-app history will still work.
                    </p>
                  ) : null}
                </div>

                {!hasAlertUser ? (
                  <div className="rounded-[1.35rem] border border-slate-200/80 bg-white p-4">
                    <p className="text-sm leading-6 text-slate-600">
                      Sign in to save target alerts and receive email or browser notifications.
                    </p>
                    <Link
                      href="/login"
                      className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      Sign in to save alerts
                    </Link>
                  </div>
                ) : alertsConfigured ? (
                  <button
                    type="button"
                    onClick={() => void handleCreateAlert()}
                    disabled={isSavingAlert}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSavingAlert ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving alert...
                      </>
                    ) : (
                      <>
                        <BellRing className="h-4 w-4" />
                        Save target alert
                      </>
                    )}
                  </button>
                ) : (
                  <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Alert storage is not configured yet, so this page can still
                    show rates and the chart but cannot save alerts.
                  </div>
                )}

                {alertsError ? (
                  <div className="rounded-[1.35rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {alertsError}
                  </div>
                ) : null}

                {alertSuccessMessage ? (
                  <div className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {alertSuccessMessage}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-4 laptop:grid-cols-2">
            <div className="glass-card rounded-[1.9rem] p-5 tablet:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-950">Active alerts</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Current thresholds waiting for the ECB rate to move.
                  </p>
                </div>
                {isAlertsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                ) : (
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {activeAlerts.length}
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-3">
                {activeAlerts.length ? (
                  activeAlerts.map((alert) => (
                    <AlertRow
                      key={alert.id}
                      alert={alert}
                      onDelete={handleDeleteAlert}
                      deleting={deletingAlertId === alert.id}
                    />
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-white px-4 py-5 text-sm leading-6 text-slate-500">
                    No active forex alerts yet.
                  </div>
                )}
              </div>
            </div>

            <div className="glass-card rounded-[1.9rem] p-5 tablet:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-950">Triggered alerts</p>
                  <p className="mt-1 text-sm text-slate-500">
                    In-app history of rate hits that have already happened.
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {triggeredAlerts.length}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {triggeredAlerts.length ? (
                  triggeredAlerts.map((alert) => (
                    <AlertRow key={alert.id} alert={alert} />
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-white px-4 py-5 text-sm leading-6 text-slate-500">
                    Triggered alerts will appear here after the ECB rate reaches
                    one of your saved targets.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-4 tablet:grid-cols-3">
            <div className="glass-card rounded-[1.75rem] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950">
                What counts as a hit?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If the target is above today&apos;s rate, the alert triggers
                when EUR / INR reaches or exceeds that level. If it is below,
                the alert triggers when the rate falls to or below it.
              </p>
            </div>

            <div className="glass-card rounded-[1.75rem] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950">
                How email works
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                When your target is hit, Guidon emails the signed-in student
                account. Email delivery depends on the configured SMTP account.
              </p>
            </div>

            <div className="glass-card rounded-[1.75rem] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                <BellRing className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950">
                Browser alerts
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Browser notifications show while Guidon is open in your browser
                and notification permission is granted. The triggered alert
                still stays visible in-app even if you miss it.
              </p>
            </div>
            </section>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
