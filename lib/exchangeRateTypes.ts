export type ExchangeHistoryRange = "30d" | "90d" | "1y" | "5y";

export type ExchangeRatePoint = {
  date: string;
  eurToInr: number;
};

export type ExchangeRateSnapshot = {
  base: "EUR";
  quote: "INR";
  eurToInr: number;
  inrToEur: number;
  asOf: string;
  fetchedAt: string;
  sourceName: string;
  sourceUrl: string;
};

export type ExchangeAlertDirection = "above" | "below";
export type ExchangeAlertStatus = "active" | "triggered" | "cancelled";

export type ExchangeAlert = {
  id: string;
  ownerEmail: string;
  ownerName: string | null;
  targetRate: number;
  currentRateAtCreation: number;
  direction: ExchangeAlertDirection;
  status: ExchangeAlertStatus;
  channels: {
    email: boolean;
    browser: boolean;
    inApp: true;
  };
  createdAt: string;
  updatedAt: string;
  triggeredAt: string | null;
  triggerRate: number | null;
  emailSentAt: string | null;
  browserNotifiedAt: string | null;
};
