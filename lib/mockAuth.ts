export type MockStudentUser = {
  name: string;
  email: string;
  privacyAccepted: boolean;
};

const MOCK_USER_KEY = "mockStudentUser";
const PENDING_EMAIL_KEY = "mockPendingEmail";
const PRIVACY_ACCEPTED_KEY = "mockPrivacyAccepted";
const DEMO_OTP = "123456";

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

async function persistDemoUserRecord(user: MockStudentUser) {
  try {
    await fetch("/api/auth/mock-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
  } catch (error) {
    console.error("Mock auth user save failed:", error);
  }
}

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const createDisplayName = (email: string) => {
  const [localPart] = email.split("@");

  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const persistUser = (user: MockStudentUser) => {
  const storage = getStorage();

  storage?.setItem(MOCK_USER_KEY, JSON.stringify(user));

  return user;
};

export const setPrivacyAccepted = (accepted: boolean) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(PRIVACY_ACCEPTED_KEY, JSON.stringify(accepted));
};

export const hasAcceptedPrivacy = () => {
  const storage = getStorage();
  const storedValue = storage?.getItem(PRIVACY_ACCEPTED_KEY);

  return storedValue ? JSON.parse(storedValue) === true : false;
};

export const getMockUser = () => {
  const storage = getStorage();
  const storedUser = storage?.getItem(MOCK_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as MockStudentUser;
  } catch {
    return null;
  }
};

export async function mockLoginWithGoogle() {
  await delay(650);

  return persistUser({
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    privacyAccepted: hasAcceptedPrivacy()
  });
}

export async function mockLoginWithApple() {
  await delay(650);

  return persistUser({
    name: "Isha Patel",
    email: "isha.patel@icloud.com",
    privacyAccepted: hasAcceptedPrivacy()
  });
}

export async function mockSendOtp(email: string) {
  await delay(450);

  const storage = getStorage();

  storage?.setItem(PENDING_EMAIL_KEY, email);
  console.log(`Mock OTP sent to ${email}. Demo OTP: ${DEMO_OTP}`);

  return { success: true, email };
}

export async function mockVerifyOtp(otp: string) {
  await delay(700);

  if (otp !== DEMO_OTP) {
    return {
      success: false,
      error: "That OTP is not correct. Please try 123456 for the demo."
    };
  }

  const storage = getStorage();
  const email = storage?.getItem(PENDING_EMAIL_KEY) ?? "student@example.com";

  storage?.removeItem(PENDING_EMAIL_KEY);

  const user = persistUser({
    name: createDisplayName(email) || "Student User",
    email,
    privacyAccepted: hasAcceptedPrivacy()
  });

  await persistDemoUserRecord(user);

  return {
    success: true,
    user
  };
}

export function mockLogout() {
  const storage = getStorage();

  storage?.removeItem(MOCK_USER_KEY);
  storage?.removeItem(PENDING_EMAIL_KEY);
}
