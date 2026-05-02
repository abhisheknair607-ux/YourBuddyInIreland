import { randomUUID } from "crypto";
import { createHash, createSign } from "crypto";

import {
  type ExchangeAlert,
  type ExchangeAlertDirection
} from "@/lib/exchangeRateTypes";

type FirestoreValue = {
  stringValue?: string;
  booleanValue?: boolean;
  timestampValue?: string;
  arrayValue?: {
    values?: FirestoreValue[];
  };
};

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

type FirestoreRunQueryResult = {
  document?: FirestoreDocument;
};

type FirestoreCredentials = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

export type ExchangeAlertOwner = {
  key: string;
  email: string;
  name: string | null;
};

const FIRESTORE_SCOPE = "https://www.googleapis.com/auth/datastore";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

function parseServiceAccountJson() {
  const raw =
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as {
      project_id?: string;
      client_email?: string;
      private_key?: string;
    };
  } catch (error) {
    console.warn("Unable to parse Firestore service account JSON.", error);
    return null;
  }
}

function getFirestoreCredentials(): FirestoreCredentials | null {
  const serviceAccount = parseServiceAccountJson();
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.FIRESTORE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    serviceAccount?.project_id;
  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.FIRESTORE_CLIENT_EMAIL ||
    serviceAccount?.client_email;
  const privateKey = (
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.FIRESTORE_PRIVATE_KEY ||
    serviceAccount?.private_key ||
    ""
  ).replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return { projectId, clientEmail, privateKey };
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(credentials: FirestoreCredentials) {
  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && cachedToken.expiresAt - 60 > now) {
    return cachedToken.accessToken;
  }

  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: credentials.clientEmail,
      scope: FIRESTORE_SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now
    })
  );
  const unsignedToken = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = base64Url(signer.sign(credentials.privateKey));
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  if (!response.ok) {
    throw new Error(`Firestore auth failed with ${response.status}.`);
  }

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!data.access_token) {
    throw new Error("Firestore auth did not return an access token.");
  }

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600)
  };

  return data.access_token;
}

async function firestoreFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const credentials = getFirestoreCredentials();

  if (!credentials) {
    throw new Error("Firestore exchange alerts are not configured.");
  }

  const accessToken = await getAccessToken(credentials);
  const root = `https://firestore.googleapis.com/v1/projects/${credentials.projectId}/databases/(default)/documents`;
  const response = await fetch(`${root}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Firestore request failed with ${response.status}: ${text || response.statusText}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function stringField(value: string) {
  return { stringValue: value };
}

function booleanField(value: boolean) {
  return { booleanValue: value };
}

function timestampField(value: string) {
  return { timestampValue: value };
}

function stringArrayField(values: string[]) {
  return {
    arrayValue: {
      values: values.map((value) => stringField(value))
    }
  };
}

function getString(fields: Record<string, FirestoreValue> | undefined, key: string) {
  return fields?.[key]?.stringValue ?? "";
}

function getOptionalString(
  fields: Record<string, FirestoreValue> | undefined,
  key: string
) {
  return fields?.[key]?.stringValue || null;
}

function getTimestamp(
  fields: Record<string, FirestoreValue> | undefined,
  key: string
) {
  return fields?.[key]?.timestampValue ?? new Date().toISOString();
}

function getStringArray(
  fields: Record<string, FirestoreValue> | undefined,
  key: string
) {
  return (
    fields?.[key]?.arrayValue?.values
      ?.map((value) => value.stringValue)
      .filter((value): value is string => Boolean(value)) ?? []
  );
}

function getDocumentId(document: FirestoreDocument) {
  return document.name.split("/").pop() ?? "";
}

function createOwnerKey(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function parseRate(value: string) {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function alertFromDocument(document: FirestoreDocument): ExchangeAlert | null {
  const fields = document.fields;

  if (!fields) {
    return null;
  }

  const channels = getStringArray(fields, "channels");

  return {
    id: getDocumentId(document),
    ownerEmail: getString(fields, "ownerEmail"),
    ownerName: getOptionalString(fields, "ownerName"),
    targetRate: parseRate(getString(fields, "targetRate")),
    currentRateAtCreation: parseRate(getString(fields, "currentRateAtCreation")),
    direction: (getString(fields, "direction") || "above") as ExchangeAlertDirection,
    status: (getString(fields, "status") || "active") as ExchangeAlert["status"],
    channels: {
      email: channels.includes("email"),
      browser: channels.includes("browser"),
      inApp: true
    },
    createdAt: getTimestamp(fields, "createdAt"),
    updatedAt: getTimestamp(fields, "updatedAt"),
    triggeredAt: getOptionalString(fields, "triggeredAt"),
    triggerRate: parseRate(getString(fields, "triggerRate")) || null,
    emailSentAt: getOptionalString(fields, "emailSentAt"),
    browserNotifiedAt: getOptionalString(fields, "browserNotifiedAt")
  };
}

function buildAlertFields(alert: ExchangeAlert, owner: ExchangeAlertOwner) {
  const channels = ["in-app"];

  if (alert.channels.email) {
    channels.push("email");
  }

  if (alert.channels.browser) {
    channels.push("browser");
  }

  return {
    ownerKey: stringField(owner.key),
    ownerEmail: stringField(owner.email),
    ownerName: stringField(owner.name ?? ""),
    targetRate: stringField(String(alert.targetRate)),
    currentRateAtCreation: stringField(String(alert.currentRateAtCreation)),
    direction: stringField(alert.direction),
    status: stringField(alert.status),
    channels: stringArrayField(channels),
    createdAt: timestampField(alert.createdAt),
    updatedAt: timestampField(alert.updatedAt),
    triggeredAt: stringField(alert.triggeredAt ?? ""),
    triggerRate: stringField(
      alert.triggerRate !== null ? String(alert.triggerRate) : ""
    ),
    emailSentAt: stringField(alert.emailSentAt ?? ""),
    browserNotifiedAt: stringField(alert.browserNotifiedAt ?? "")
  };
}

async function patchDocument(path: string, fields: Record<string, FirestoreValue>) {
  const params = new URLSearchParams();

  Object.keys(fields).forEach((fieldPath) => {
    params.append("updateMask.fieldPaths", fieldPath);
  });

  await firestoreFetch<FirestoreDocument>(`${path}?${params.toString()}`, {
    method: "PATCH",
    body: JSON.stringify({ fields })
  });
}

function assertSafeId(id: string) {
  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(id)) {
    throw new Error("Invalid alert id.");
  }
}

export function isExchangeAlertsConfigured() {
  return Boolean(getFirestoreCredentials());
}

export function createExchangeAlertOwner(email: string, name?: string | null) {
  const normalizedEmail = email.trim().toLowerCase();

  return {
    key: createOwnerKey(normalizedEmail),
    email: normalizedEmail,
    name: name?.trim() || null
  } satisfies ExchangeAlertOwner;
}

export async function listExchangeAlerts(owner: ExchangeAlertOwner) {
  const results = await firestoreFetch<FirestoreRunQueryResult[]>(":runQuery", {
    method: "POST",
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "exchangeAlerts" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "ownerKey" },
            op: "EQUAL",
            value: stringField(owner.key)
          }
        },
        limit: 100
      }
    })
  });

  return results
    .map((result) => (result.document ? alertFromDocument(result.document) : null))
    .filter((alert): alert is ExchangeAlert => Boolean(alert))
    .filter((alert) => alert.status !== "cancelled")
    .sort(
      (first, second) =>
        new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime()
    );
}

export async function listActiveExchangeAlerts(limit = 150) {
  const results = await firestoreFetch<FirestoreRunQueryResult[]>(":runQuery", {
    method: "POST",
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "exchangeAlerts" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "status" },
            op: "EQUAL",
            value: stringField("active")
          }
        },
        limit
      }
    })
  });

  return results
    .map((result) => (result.document ? alertFromDocument(result.document) : null))
    .filter((alert): alert is ExchangeAlert => Boolean(alert));
}

export async function createExchangeAlert(
  owner: ExchangeAlertOwner,
  input: {
    targetRate: number;
    currentRateAtCreation: number;
    direction: ExchangeAlertDirection;
    channels: ExchangeAlert["channels"];
  }
) {
  const now = new Date().toISOString();
  const alert: ExchangeAlert = {
    id: randomUUID(),
    ownerEmail: owner.email,
    ownerName: owner.name,
    targetRate: input.targetRate,
    currentRateAtCreation: input.currentRateAtCreation,
    direction: input.direction,
    status: "active",
    channels: input.channels,
    createdAt: now,
    updatedAt: now,
    triggeredAt: null,
    triggerRate: null,
    emailSentAt: null,
    browserNotifiedAt: null
  };

  await patchDocument(
    `/exchangeAlerts/${alert.id}`,
    buildAlertFields(alert, owner)
  );

  return alert;
}

async function getExchangeAlertById(id: string) {
  assertSafeId(id);
  const document = await firestoreFetch<FirestoreDocument>(`/exchangeAlerts/${id}`);
  const alert = alertFromDocument(document);

  if (!alert) {
    throw new Error("Alert not found.");
  }

  return alert;
}

export async function cancelExchangeAlert(owner: ExchangeAlertOwner, id: string) {
  const alert = await getExchangeAlertById(id);

  if (createOwnerKey(alert.ownerEmail) !== owner.key) {
    throw new Error("Alert not found.");
  }

  const nextAlert: ExchangeAlert = {
    ...alert,
    status: "cancelled",
    updatedAt: new Date().toISOString()
  };

  await patchDocument(`/exchangeAlerts/${id}`, buildAlertFields(nextAlert, owner));
}

export async function markExchangeAlertBrowserNotified(
  owner: ExchangeAlertOwner,
  id: string
) {
  const alert = await getExchangeAlertById(id);

  if (createOwnerKey(alert.ownerEmail) !== owner.key) {
    throw new Error("Alert not found.");
  }

  const nextAlert: ExchangeAlert = {
    ...alert,
    browserNotifiedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await patchDocument(`/exchangeAlerts/${id}`, buildAlertFields(nextAlert, owner));
}

export async function markExchangeAlertTriggered(
  alert: ExchangeAlert,
  values: {
    triggeredAt: string;
    triggerRate: number;
    emailSentAt?: string | null;
  }
) {
  const owner = createExchangeAlertOwner(alert.ownerEmail, alert.ownerName);
  const nextAlert: ExchangeAlert = {
    ...alert,
    status: "triggered",
    triggerRate: values.triggerRate,
    triggeredAt: values.triggeredAt,
    emailSentAt: values.emailSentAt ?? alert.emailSentAt,
    updatedAt: values.triggeredAt
  };

  await patchDocument(
    `/exchangeAlerts/${alert.id}`,
    buildAlertFields(nextAlert, owner)
  );

  return nextAlert;
}
