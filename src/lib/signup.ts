// Shared between the client form and the /api/signup route handler so the two
// can never disagree about what a valid submission looks like.

export const INTEREST_OPTIONS = [
  "Track my health over time",
  "Prepare for healthcare appointments",
  "Better understand patterns in my health",
  "Support/care for someone else",
  "Healthcare professional",
  "Other",
] as const;

export type InterestOption = (typeof INTEREST_OPTIONS)[number];

export const SIGNUP_SOURCES = ["home", "contact"] as const;
export type SignupSource = (typeof SIGNUP_SOURCES)[number];

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  interest: InterestOption | "";
  earlyTester: "yes" | "no" | "";
  marketingConsent: boolean;
  source: SignupSource;
  /** Honeypot: real people never fill this in, bots usually do. */
  company?: string;
}

export const LIMITS = {
  name: 80,
  email: 254,
} as const;

// Deliberately permissive: the goal is to catch typos and obvious junk, not to
// out-guess RFC 5322. Deliverability is proven by the follow-up email, not here.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SignupErrors = Partial<Record<"firstName" | "lastName" | "email", string>>;

export function validateSignup(input: Partial<SignupPayload>): SignupErrors {
  const errors: SignupErrors = {};

  const firstName = (input.firstName ?? "").trim();
  const lastName = (input.lastName ?? "").trim();
  const email = (input.email ?? "").trim();

  if (!firstName) errors.firstName = "Please enter your first name.";
  else if (firstName.length > LIMITS.name) errors.firstName = "That name is too long.";

  if (!lastName) errors.lastName = "Please enter your last name.";
  else if (lastName.length > LIMITS.name) errors.lastName = "That name is too long.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email) errors.email = "That email address is too long.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  return errors;
}

/** Narrows arbitrary JSON into the exact shape we are willing to store. */
export function normaliseSignup(input: Partial<SignupPayload>) {
  const interest = INTEREST_OPTIONS.includes(input.interest as InterestOption)
    ? (input.interest as InterestOption)
    : null;

  const earlyTester =
    input.earlyTester === "yes" ? true : input.earlyTester === "no" ? false : null;

  const source = SIGNUP_SOURCES.includes(input.source as SignupSource)
    ? (input.source as SignupSource)
    : "home";

  return {
    first_name: (input.firstName ?? "").trim().slice(0, LIMITS.name),
    last_name: (input.lastName ?? "").trim().slice(0, LIMITS.name),
    email: (input.email ?? "").trim().toLowerCase().slice(0, LIMITS.email),
    interest,
    early_tester: earlyTester,
    marketing_consent: input.marketingConsent === true,
    source,
  };
}
