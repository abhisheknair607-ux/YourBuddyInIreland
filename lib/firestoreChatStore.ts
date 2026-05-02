import { createHash, createSign, randomUUID } from "crypto";

import type { TutorMessage, TutorMessageSource } from "@/lib/mockChat";
import type { ReplyLanguage } from "@/lib/replyLanguage";

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  nullValue?: null;
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

type FirestoreListResult = {
  documents?: FirestoreDocument[];
  nextPageToken?: string;
};

type FirestoreCredentials = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

export type ChatOwner = {
  key: string;
  email: string;
  name: string | null;
};

export type ChatConversationSummary = {
  id: string;
  title: string;
  preview: string;
  ownerEmail: string;
  ownerName: string | null;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  conversationSummary?: string;
  lastTopic?: string;
  lastIntent?: string;
  riskFlags?: string[];
  confidenceScore?: number | null;
};

export type StoredChatMessage = TutorMessage & {
  language?: ReplyLanguage;
  detectedIntent?: string;
};

const FIRESTORE_SCOPE = "https://www.googleapis.com/auth/datastore";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const MAX_TITLE_LENGTH = 52;
const MAX_PREVIEW_LENGTH = 110;

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

export function isChatHistoryConfigured() {
  return Boolean(getFirestoreCredentials());
}

export function createChatOwner(email: string, name?: string | null): ChatOwner {
  const normalizedEmail = email.trim().toLowerCase();

  return {
    key: createHash("sha256").update(normalizedEmail).digest("hex"),
    email: normalizedEmail,
    name: name?.trim() || null
  };
}

export function createConversationTitle(message: string) {
  const title = message.replace(/\s+/g, " ").trim();

  if (!title) {
    return "New chat";
  }

  return title.length > MAX_TITLE_LENGTH
    ? `${title.slice(0, MAX_TITLE_LENGTH - 1).trim()}...`
    : title;
}

function createPreview(content: string) {
  const preview = content.replace(/\s+/g, " ").trim();

  if (!preview) {
    return "";
  }

  return preview.length > MAX_PREVIEW_LENGTH
    ? `${preview.slice(0, MAX_PREVIEW_LENGTH - 1).trim()}...`
    : preview;
}

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
    throw new Error("Firestore chat history is not configured.");
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

function timestampField(value: string) {
  return { timestampValue: value };
}

function integerField(value: number) {
  return { integerValue: String(value) };
}

function doubleField(value: number) {
  return { doubleValue: value };
}

function nullField() {
  return { nullValue: null };
}

function booleanField(value: boolean) {
  return { booleanValue: value };
}

function stringArrayField(values: string[] = []) {
  return {
    arrayValue: {
      values: values.map((value) => stringField(value))
    }
  };
}

function getDocumentId(document: FirestoreDocument) {
  return document.name.split("/").pop() ?? "";
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

function getBoolean(fields: Record<string, FirestoreValue> | undefined, key: string) {
  return fields?.[key]?.booleanValue === true;
}

function getInteger(fields: Record<string, FirestoreValue> | undefined, key: string) {
  return Number(fields?.[key]?.integerValue ?? 0);
}

function getNumber(fields: Record<string, FirestoreValue> | undefined, key: string) {
  const field = fields?.[key];

  if (field?.nullValue === null) {
    return null;
  }

  if (typeof field?.doubleValue === "number") {
    return field.doubleValue;
  }

  if (typeof field?.integerValue === "string") {
    return Number(field.integerValue);
  }

  return null;
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

function conversationFromDocument(
  document: FirestoreDocument
): ChatConversationSummary | null {
  const fields = document.fields;

  if (!fields || getBoolean(fields, "deleted")) {
    return null;
  }

  return {
    id: getDocumentId(document),
    title: getString(fields, "title") || "New chat",
    preview: getString(fields, "preview"),
    ownerEmail: getString(fields, "ownerEmail"),
    ownerName: getOptionalString(fields, "ownerName"),
    createdAt: getTimestamp(fields, "createdAt"),
    updatedAt: getTimestamp(fields, "updatedAt"),
    messageCount: getInteger(fields, "messageCount"),
    conversationSummary: getString(fields, "conversationSummary"),
    lastTopic: getString(fields, "lastTopic"),
    lastIntent: getString(fields, "lastIntent"),
    riskFlags: getStringArray(fields, "riskFlags"),
    confidenceScore: getNumber(fields, "confidenceScore")
  };
}

function messageFromDocument(document: FirestoreDocument): StoredChatMessage | null {
  const fields = document.fields;
  const role = getString(fields, "role");
  const content = getString(fields, "content");

  if ((role !== "user" && role !== "assistant") || !content) {
    return null;
  }

  return {
    id: getDocumentId(document),
    role,
    content,
    createdAt: getTimestamp(fields, "createdAt"),
    source: getOptionalString(fields, "source") as TutorMessageSource | undefined,
    documents: getStringArray(fields, "documents"),
    language: getOptionalString(fields, "language") as ReplyLanguage | undefined,
    detectedIntent: getOptionalString(fields, "detectedIntent") ?? undefined
  };
}

function assertConversationOwner(
  document: FirestoreDocument,
  owner: ChatOwner
) {
  const ownerKey = getString(document.fields, "ownerKey");

  if (ownerKey !== owner.key || getBoolean(document.fields, "deleted")) {
    throw new Error("Conversation not found.");
  }
}

function buildConversationFields(
  owner: ChatOwner,
  values: {
    title: string;
    preview?: string;
    createdAt: string;
    updatedAt: string;
    messageCount?: number;
    deleted?: boolean;
    conversationSummary?: string;
    lastTopic?: string;
    lastIntent?: string;
    riskFlags?: string[];
    confidenceScore?: number | null;
  }
) {
  return {
    ownerKey: stringField(owner.key),
    ownerEmail: stringField(owner.email),
    ownerName: stringField(owner.name ?? ""),
    title: stringField(values.title),
    preview: stringField(values.preview ?? ""),
    createdAt: timestampField(values.createdAt),
    updatedAt: timestampField(values.updatedAt),
    messageCount: integerField(values.messageCount ?? 0),
    deleted: booleanField(values.deleted ?? false),
    conversationSummary: stringField(values.conversationSummary ?? ""),
    lastTopic: stringField(values.lastTopic ?? ""),
    lastIntent: stringField(values.lastIntent ?? ""),
    riskFlags: stringArrayField(values.riskFlags ?? []),
    confidenceScore:
      values.confidenceScore === null || values.confidenceScore === undefined
        ? nullField()
        : doubleField(values.confidenceScore)
  };
}

function buildMessageFields(message: StoredChatMessage) {
  return {
    role: stringField(message.role),
    content: stringField(message.content),
    createdAt: timestampField(message.createdAt),
    source: stringField(message.source ?? ""),
    language: stringField(message.language ?? ""),
    documents: stringArrayField(message.documents ?? []),
    detectedIntent: stringField(message.detectedIntent ?? "")
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
    throw new Error("Invalid conversation id.");
  }
}

export async function listChatConversations(owner: ChatOwner, limit = 30) {
  const results = await firestoreFetch<FirestoreRunQueryResult[]>(":runQuery", {
    method: "POST",
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "conversations" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "ownerKey" },
            op: "EQUAL",
            value: stringField(owner.key)
          }
        },
        limit
      }
    })
  });

  return results
    .map((result) =>
      result.document ? conversationFromDocument(result.document) : null
    )
    .filter((conversation): conversation is ChatConversationSummary =>
      Boolean(conversation)
    )
    .sort(
      (first, second) =>
        new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime()
    )
    .slice(0, limit);
}

export async function createChatConversation(owner: ChatOwner, firstMessage: string) {
  const now = new Date().toISOString();
  const conversation: ChatConversationSummary = {
    id: randomUUID(),
    title: createConversationTitle(firstMessage),
    preview: createPreview(firstMessage),
    ownerEmail: owner.email,
    ownerName: owner.name,
    createdAt: now,
    updatedAt: now,
    messageCount: 0,
    conversationSummary: "",
    lastTopic: "",
    lastIntent: "",
    riskFlags: [],
    confidenceScore: null
  };

  await patchDocument(
    `/conversations/${conversation.id}`,
    buildConversationFields(owner, conversation)
  );

  return conversation;
}

export async function getChatConversation(owner: ChatOwner, conversationId: string) {
  assertSafeId(conversationId);

  const document = await firestoreFetch<FirestoreDocument>(
    `/conversations/${conversationId}`
  );

  assertConversationOwner(document, owner);

  const conversation = conversationFromDocument(document);

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  return conversation;
}

export async function listChatMessages(
  owner: ChatOwner,
  conversationId: string,
  limit = 100
) {
  await getChatConversation(owner, conversationId);

  const messages: StoredChatMessage[] = [];
  let pageToken = "";

  do {
    const params = new URLSearchParams({
      orderBy: "createdAt",
      pageSize: String(Math.min(limit, 100))
    });

    if (pageToken) {
      params.set("pageToken", pageToken);
    }

    const result = await firestoreFetch<FirestoreListResult>(
      `/conversations/${conversationId}/messages?${params.toString()}`
    );

    messages.push(
      ...(result.documents ?? [])
        .map(messageFromDocument)
        .filter((message): message is StoredChatMessage => Boolean(message))
    );
    pageToken = result.nextPageToken ?? "";
  } while (pageToken && messages.length < limit);

  return messages
    .sort(
      (first, second) =>
        new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime()
    )
    .slice(0, limit);
}

export async function getRecentChatMessages(
  owner: ChatOwner,
  conversationId: string,
  limit = 20
) {
  const messages = await listChatMessages(owner, conversationId, 200);

  return messages.slice(-limit);
}

export async function saveChatMessage(
  owner: ChatOwner,
  conversationId: string,
  message: StoredChatMessage
) {
  await getChatConversation(owner, conversationId);
  await patchDocument(
    `/conversations/${conversationId}/messages/${message.id}`,
    buildMessageFields(message)
  );
}

export async function updateChatConversation(
  owner: ChatOwner,
  conversation: ChatConversationSummary,
  updates: {
    preview?: string;
    updatedAt?: string;
    messageCount?: number;
    conversationSummary?: string;
    lastTopic?: string;
    lastIntent?: string;
    riskFlags?: string[];
    confidenceScore?: number | null;
  }
) {
  const nextConversation: ChatConversationSummary = {
    ...conversation,
    preview:
      updates.preview !== undefined
        ? createPreview(updates.preview)
        : conversation.preview,
    updatedAt: updates.updatedAt ?? conversation.updatedAt,
    messageCount: updates.messageCount ?? conversation.messageCount,
    conversationSummary:
      updates.conversationSummary !== undefined
        ? updates.conversationSummary
        : conversation.conversationSummary,
    lastTopic:
      updates.lastTopic !== undefined ? updates.lastTopic : conversation.lastTopic,
    lastIntent:
      updates.lastIntent !== undefined ? updates.lastIntent : conversation.lastIntent,
    riskFlags:
      updates.riskFlags !== undefined ? updates.riskFlags : conversation.riskFlags,
    confidenceScore:
      updates.confidenceScore !== undefined
        ? updates.confidenceScore
        : conversation.confidenceScore
  };

  await patchDocument(
    `/conversations/${conversation.id}`,
    buildConversationFields(owner, nextConversation)
  );

  return nextConversation;
}

export async function deleteChatConversation(
  owner: ChatOwner,
  conversationId: string
) {
  const conversation = await getChatConversation(owner, conversationId);
  const messages = await listChatMessages(owner, conversationId, 500);

  await Promise.all(
    messages.map((message) =>
      firestoreFetch<void>(
        `/conversations/${conversationId}/messages/${message.id}`,
        {
          method: "DELETE"
        }
      )
    )
  );

  await patchDocument(
    `/conversations/${conversationId}`,
    buildConversationFields(owner, {
      ...conversation,
      updatedAt: new Date().toISOString(),
      deleted: true
    })
  );
}
