export const DASHBOARD_STARTER_PROMPT_KEY =
  "guidon_dashboard_starter_prompt";

export const DEFAULT_STARTER_PROMPT =
  "Help me plan my Ireland study journey step by step. Start with the most important first actions.";

export const HOME_STARTER_PROMPTS = [
  {
    label: "Visa steps",
    prompt:
      "What are the first visa steps I should take for studying in Ireland?"
  },
  {
    label: "Universities",
    prompt:
      "Help me shortlist universities in Ireland based on budget, city, and career fit."
  },
  {
    label: "Courses",
    prompt:
      "How should I compare courses in Ireland and choose the right one for my background?"
  },
  {
    label: "Accommodation",
    prompt:
      "What should I check first when choosing student accommodation in Ireland?"
  },
  {
    label: "Education loans",
    prompt:
      "Help me plan education loans and living costs for studying in Ireland."
  },
  {
    label: "Multilingual",
    prompt:
      "Explain my Ireland study plan step by step in the language I use, and switch naturally if I mix English with an Indian language."
  }
] as const;
