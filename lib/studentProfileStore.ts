import { createHash, createSign } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

import { APP_SLUG } from "@/lib/branding";
import {
  createEmptyStudentProfile,
  normalizeStudentProfileInput,
  type StoredStudentProfile,
  type StudentProfile
} from "@/lib/studentProfile";

const DATA_DIR = path.join(process.cwd(), "data");
const TMP_DATA_DIR = path.join(os.tmpdir(), APP_SLUG);
const PROFILE_STORE_FILE = process.env.NETLIFY
  ? path.join(TMP_DATA_DIR, "student-profiles.json")
  : path.join(DATA_DIR, "student-profiles.json");
const FIRESTORE_SCOPE = "https://www.googleapis.com/auth/datastore";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

type StudentProfileOwner = {
  key: string;
  email: string;
  name: string | null;
};

type FirestoreValue = {
  stringValue?: string;
  timestampValue?: string;
};

type FirestoreDocument = {
  fields?: Record<string, FirestoreValue>;
};

type FirestoreCredentials = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function ensureStoreFile() {
  await fs.mkdir(path.dirname(PROFILE_STORE_FILE), { recursive: true });

  try {
    await fs.access(PROFILE_STORE_FILE);
  } catch {
    await fs.writeFile(PROFILE_STORE_FILE, "[]", "utf8");
  }
}

async function readProfilesFromFile() {
  await ensureStoreFile();

  try {
    const raw = await fs.readFile(PROFILE_STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredStudentProfile[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeProfilesToFile(profiles: StoredStudentProfile[]) {
  await ensureStoreFile();
  await fs.writeFile(
    PROFILE_STORE_FILE,
    JSON.stringify(profiles, null, 2),
    "utf8"
  );
}

function createDefaultStoredProfile(owner: StudentProfileOwner) {
  const now = new Date().toISOString();

  return {
    ownerEmail: owner.email,
    ownerName: owner.name,
    createdAt: now,
    updatedAt: now,
    ...createEmptyStudentProfile()
  } satisfies StoredStudentProfile;
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

async function firestoreRequest(pathname: string, init: RequestInit = {}) {
  const credentials = getFirestoreCredentials();

  if (!credentials) {
    throw new Error("Firestore student profile storage is not configured.");
  }

  const accessToken = await getAccessToken(credentials);
  const root = `https://firestore.googleapis.com/v1/projects/${credentials.projectId}/databases/(default)/documents`;

  return fetch(`${root}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    }
  });
}

function stringField(value: string) {
  return { stringValue: value };
}

function timestampField(value: string) {
  return { timestampValue: value };
}

function getString(fields: Record<string, FirestoreValue> | undefined, key: string) {
  return fields?.[key]?.stringValue ?? "";
}

function getTimestamp(
  fields: Record<string, FirestoreValue> | undefined,
  key: string
) {
  return fields?.[key]?.timestampValue ?? new Date().toISOString();
}

function buildProfileFields(profile: StoredStudentProfile, owner: StudentProfileOwner) {
  return {
    ownerKey: stringField(owner.key),
    ownerEmail: stringField(owner.email),
    ownerName: stringField(owner.name ?? ""),
    originCountry: stringField(profile.originCountry),
    destinationCountry: stringField(profile.destinationCountry),
    currentLocation: stringField(profile.currentLocation),
    targetUniversity: stringField(profile.targetUniversity),
    targetCity: stringField(profile.targetCity),
    courseInterest: stringField(profile.courseInterest),
    studyLevel: stringField(profile.studyLevel),
    intake: stringField(profile.intake),
    budgetRange: stringField(profile.budgetRange),
    visaStage: stringField(profile.visaStage),
    accommodationStage: stringField(profile.accommodationStage),
    languagePreference: stringField(profile.languagePreference),
    supportStyle: stringField(profile.supportStyle),
    notes: stringField(profile.notes),
    createdAt: timestampField(profile.createdAt),
    updatedAt: timestampField(profile.updatedAt)
  };
}

function profileFromDocument(
  owner: StudentProfileOwner,
  document: FirestoreDocument | null
) {
  if (!document?.fields) {
    return null;
  }

  const normalizedProfile = normalizeStudentProfileInput({
    originCountry: getString(document.fields, "originCountry"),
    destinationCountry: getString(document.fields, "destinationCountry"),
    currentLocation: getString(document.fields, "currentLocation"),
    targetUniversity: getString(document.fields, "targetUniversity"),
    targetCity: getString(document.fields, "targetCity"),
    courseInterest: getString(document.fields, "courseInterest"),
    studyLevel: getString(document.fields, "studyLevel"),
    intake: getString(document.fields, "intake"),
    budgetRange: getString(document.fields, "budgetRange"),
    visaStage: getString(document.fields, "visaStage"),
    accommodationStage: getString(document.fields, "accommodationStage"),
    languagePreference: getString(document.fields, "languagePreference"),
    supportStyle: getString(document.fields, "supportStyle"),
    notes: getString(document.fields, "notes")
  });

  return {
    ...createDefaultStoredProfile(owner),
    ...normalizedProfile,
    ownerEmail: owner.email,
    ownerName: owner.name ?? (getString(document.fields, "ownerName") || null),
    createdAt: getTimestamp(document.fields, "createdAt"),
    updatedAt: getTimestamp(document.fields, "updatedAt")
  } satisfies StoredStudentProfile;
}

async function getProfileFromFirestore(owner: StudentProfileOwner) {
  const response = await firestoreRequest(`/users/${owner.key}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const text = await response.text();

    throw new Error(
      `Firestore profile read failed with ${response.status}: ${text || response.statusText}`
    );
  }

  const document = (await response.json()) as FirestoreDocument;

  return profileFromDocument(owner, document);
}

async function saveProfileToFirestore(
  owner: StudentProfileOwner,
  profile: StoredStudentProfile
) {
  const fields = buildProfileFields(profile, owner);
  const params = new URLSearchParams();

  Object.keys(fields).forEach((fieldPath) => {
    params.append("updateMask.fieldPaths", fieldPath);
  });

  const response = await firestoreRequest(`/users/${owner.key}?${params.toString()}`, {
    method: "PATCH",
    body: JSON.stringify({ fields })
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(
      `Firestore profile save failed with ${response.status}: ${text || response.statusText}`
    );
  }

  const document = (await response.json()) as FirestoreDocument;

  return profileFromDocument(owner, document) ?? profile;
}

async function getProfileFromFile(owner: StudentProfileOwner) {
  const profiles = await readProfilesFromFile();
  const profile =
    profiles.find((entry) => entry.ownerEmail === owner.email) ?? null;

  if (!profile) {
    return null;
  }

  return {
    ...createDefaultStoredProfile(owner),
    ...profile,
    ownerEmail: owner.email,
    ownerName: owner.name ?? profile.ownerName
  } satisfies StoredStudentProfile;
}

async function saveProfileToFile(
  owner: StudentProfileOwner,
  profile: StoredStudentProfile
) {
  const profiles = await readProfilesFromFile();
  const existingIndex = profiles.findIndex(
    (entry) => entry.ownerEmail === owner.email
  );

  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.unshift(profile);
  }

  await writeProfilesToFile(profiles);

  return profile;
}

export function createStudentProfileOwner(
  email: string,
  name?: string | null
): StudentProfileOwner {
  const normalizedEmail = email.trim().toLowerCase();

  return {
    key: createHash("sha256").update(normalizedEmail).digest("hex"),
    email: normalizedEmail,
    name: name?.trim() || null
  };
}

export async function getStudentProfile(owner: StudentProfileOwner) {
  const defaultProfile = createDefaultStoredProfile(owner);

  if (getFirestoreCredentials()) {
    try {
      const firestoreProfile = await getProfileFromFirestore(owner);

      if (firestoreProfile) {
        return firestoreProfile;
      }

      const legacyProfile = await getProfileFromFile(owner);

      if (legacyProfile) {
        return await saveProfileToFirestore(owner, legacyProfile);
      }

      return defaultProfile;
    } catch (error) {
      console.error("Firestore profile load failed, falling back to file:", error);
    }
  }

  const fileProfile = await getProfileFromFile(owner);

  return fileProfile ?? defaultProfile;
}

export async function saveStudentProfile(
  owner: StudentProfileOwner,
  input: Partial<StudentProfile>
) {
  const normalizedInput = normalizeStudentProfileInput(input);

  if (getFirestoreCredentials()) {
    const existingProfile =
      (await getProfileFromFirestore(owner).catch(async (error) => {
        console.error("Firestore profile read before save failed:", error);
        return getProfileFromFile(owner);
      })) ?? createDefaultStoredProfile(owner);
    const now = new Date().toISOString();
    const nextProfile: StoredStudentProfile = {
      ...existingProfile,
      ...normalizedInput,
      ownerEmail: owner.email,
      ownerName: owner.name ?? existingProfile.ownerName,
      createdAt: existingProfile.createdAt,
      updatedAt: now
    };

    return saveProfileToFirestore(owner, nextProfile);
  }

  const existingProfile =
    (await getProfileFromFile(owner)) ?? createDefaultStoredProfile(owner);
  const now = new Date().toISOString();
  const nextProfile: StoredStudentProfile = {
    ...existingProfile,
    ...normalizedInput,
    ownerEmail: owner.email,
    ownerName: owner.name ?? existingProfile.ownerName,
    createdAt: existingProfile.createdAt,
    updatedAt: now
  };

  return saveProfileToFile(owner, nextProfile);
}
