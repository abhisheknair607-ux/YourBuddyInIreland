import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_USERS_FILE = path.join(DATA_DIR, "auth-users.json");

export type SavedAuthUser = {
  id: string;
  provider: string;
  providerAccountId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  privacyAccepted: boolean;
  createdAt: string;
  lastLoginAt: string;
};

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(AUTH_USERS_FILE);
  } catch {
    await fs.writeFile(AUTH_USERS_FILE, "[]", "utf8");
  }
}

async function readUsers() {
  await ensureStoreFile();

  try {
    const raw = await fs.readFile(AUTH_USERS_FILE, "utf8");
    const parsed = JSON.parse(raw) as SavedAuthUser[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeUsers(users: SavedAuthUser[]) {
  await ensureStoreFile();
  await fs.writeFile(AUTH_USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

export async function saveAuthUser(details: {
  provider: string;
  providerAccountId: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  privacyAccepted?: boolean;
}) {
  const users = await readUsers();
  const now = new Date().toISOString();
  const id = `${details.provider}:${details.providerAccountId}`;
  const existingIndex = users.findIndex((user) => user.id === id);

  const nextUser: SavedAuthUser = {
    id,
    provider: details.provider,
    providerAccountId: details.providerAccountId,
    name: details.name ?? null,
    email: details.email ?? null,
    image: details.image ?? null,
    privacyAccepted: details.privacyAccepted ?? false,
    createdAt:
      existingIndex >= 0 ? users[existingIndex].createdAt : now,
    lastLoginAt: now
  };

  if (existingIndex >= 0) {
    users[existingIndex] = {
      ...users[existingIndex],
      ...nextUser
    };
  } else {
    users.unshift(nextUser);
  }

  await writeUsers(users);

  return nextUser;
}

export async function listSavedAuthUsers() {
  return readUsers();
}
