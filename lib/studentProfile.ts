export type StudentProfile = {
  originCountry: string;
  destinationCountry: string;
  currentLocation: string;
  targetUniversity: string;
  targetCity: string;
  courseInterest: string;
  studyLevel: string;
  intake: string;
  budgetRange: string;
  visaStage: string;
  accommodationStage: string;
  languagePreference: string;
  supportStyle: string;
  notes: string;
};

export type StoredStudentProfile = StudentProfile & {
  ownerEmail: string;
  ownerName: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StudentProfileCompletion = {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
};

export const studentProfileCompletionFields: Array<{
  key: keyof StudentProfile;
  label: string;
}> = [
  { key: "originCountry", label: "Origin country" },
  { key: "currentLocation", label: "Current location" },
  { key: "targetUniversity", label: "Target university" },
  { key: "targetCity", label: "Target city" },
  { key: "courseInterest", label: "Course interest" },
  { key: "studyLevel", label: "Study level" },
  { key: "intake", label: "Preferred intake" },
  { key: "budgetRange", label: "Budget range" },
  { key: "visaStage", label: "Visa stage" },
  { key: "accommodationStage", label: "Accommodation stage" },
  { key: "languagePreference", label: "Language preference" },
  { key: "supportStyle", label: "Support style" }
];

export const studentProfileOptions = {
  studyLevels: [
    "Bachelor's",
    "Master's",
    "PhD",
    "Diploma / Certificate",
    "Not sure yet"
  ],
  intakes: [
    "Autumn / September intake",
    "Spring / January intake",
    "Next available intake",
    "Still deciding"
  ],
  budgetRanges: [
    "Very budget-sensitive",
    "Up to EUR 15,000 tuition",
    "EUR 15,000 to EUR 25,000 tuition",
    "EUR 25,000+ tuition budget",
    "Need education loan support",
    "Not sure yet"
  ],
  visaStages: [
    "Just exploring",
    "Shortlisting universities",
    "Preparing applications",
    "Offer received",
    "Collecting visa documents",
    "Visa filed",
    "Visa approved",
    "Already in Ireland"
  ],
  accommodationStages: [
    "Not started yet",
    "Researching options",
    "Comparing areas and rent",
    "Shortlisted a few places",
    "Need viewing / buddy help",
    "Accommodation confirmed"
  ],
  languagePreferences: [
    "English",
    "Hinglish",
    "Hindi",
    "Multilingual"
  ],
  supportStyles: [
    "Simple step-by-step guidance",
    "Quick summary first",
    "Detailed comparison with options",
    "Budget-focused recommendations"
  ]
} as const;

export function createEmptyStudentProfile(): StudentProfile {
  return {
    originCountry: "",
    destinationCountry: "Ireland",
    currentLocation: "",
    targetUniversity: "",
    targetCity: "",
    courseInterest: "",
    studyLevel: "",
    intake: "",
    budgetRange: "",
    visaStage: "",
    accommodationStage: "",
    languagePreference: "",
    supportStyle: "",
    notes: ""
  };
}

function cleanValue(value: unknown, maxLength = 160) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function normalizeStudentProfileInput(
  input: Partial<StudentProfile> | null | undefined
): StudentProfile {
  return {
    originCountry: cleanValue(input?.originCountry),
    destinationCountry: cleanValue(input?.destinationCountry) || "Ireland",
    currentLocation: cleanValue(input?.currentLocation),
    targetUniversity: cleanValue(input?.targetUniversity),
    targetCity: cleanValue(input?.targetCity),
    courseInterest: cleanValue(input?.courseInterest),
    studyLevel: cleanValue(input?.studyLevel),
    intake: cleanValue(input?.intake),
    budgetRange: cleanValue(input?.budgetRange),
    visaStage: cleanValue(input?.visaStage),
    accommodationStage: cleanValue(input?.accommodationStage),
    languagePreference: cleanValue(input?.languagePreference),
    supportStyle: cleanValue(input?.supportStyle),
    notes: cleanValue(input?.notes, 800)
  };
}

export function getStudentProfileMemoryPatch(
  currentProfile: StudentProfile | null | undefined,
  inferredProfile: Partial<StudentProfile> | null | undefined
) {
  const current = normalizeStudentProfileInput(currentProfile);
  const inferred = normalizeStudentProfileInput(inferredProfile);
  const patch: Partial<StudentProfile> = {};

  (Object.keys(current) as Array<keyof StudentProfile>).forEach((key) => {
    const currentValue = current[key].trim();
    const inferredValue = inferred[key].trim();

    if (!inferredValue) {
      return;
    }

    if (!currentValue) {
      patch[key] = inferredValue;
    }
  });

  return patch;
}

export function calculateStudentProfileCompletion(
  profile: StudentProfile
): StudentProfileCompletion {
  const completedFields = studentProfileCompletionFields.filter(
    ({ key }) => Boolean(profile[key].trim())
  );

  return {
    percentage: Math.round(
      (completedFields.length / studentProfileCompletionFields.length) * 100
    ),
    completedFields: completedFields.length,
    totalFields: studentProfileCompletionFields.length,
    missingFields: studentProfileCompletionFields
      .filter(({ key }) => !profile[key].trim())
      .map(({ label }) => label)
  };
}

export function formatStudentProfileForPrompt(
  profile: StudentProfile | null | undefined
) {
  if (!profile) {
    return "";
  }

  const lines = [
    profile.originCountry ? `- Origin country: ${profile.originCountry}` : "",
    profile.destinationCountry
      ? `- Destination country: ${profile.destinationCountry}`
      : "",
    profile.currentLocation
      ? `- Current location: ${profile.currentLocation}`
      : "",
    profile.targetUniversity
      ? `- Target university: ${profile.targetUniversity}`
      : "",
    profile.targetCity ? `- Target city: ${profile.targetCity}` : "",
    profile.courseInterest
      ? `- Course interest: ${profile.courseInterest}`
      : "",
    profile.studyLevel ? `- Study level: ${profile.studyLevel}` : "",
    profile.intake ? `- Preferred intake: ${profile.intake}` : "",
    profile.budgetRange ? `- Budget range: ${profile.budgetRange}` : "",
    profile.visaStage ? `- Visa stage: ${profile.visaStage}` : "",
    profile.accommodationStage
      ? `- Accommodation stage: ${profile.accommodationStage}`
      : "",
    profile.languagePreference
      ? `- Preferred language: ${profile.languagePreference}`
      : "",
    profile.supportStyle ? `- Support style: ${profile.supportStyle}` : "",
    profile.notes ? `- Extra planning notes: ${profile.notes}` : ""
  ].filter(Boolean);

  if (!lines.length) {
    return "";
  }

  return `
Known student profile:
${lines.join("\n")}

Use this profile only when it helps personalize the answer or understand vague follow-ups.
Do not mention hidden profile context unless the student explicitly asks about it.
  `.trim();
}
