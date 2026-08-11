"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import {
  INTEREST_OPTIONS,
  LIMITS,
  validateSignup,
  type SignupErrors,
  type SignupPayload,
  type SignupSource,
} from "@/lib/signup";

const INPUT_CLASS =
  "w-full min-h-[44px] rounded-ds-md border border-ds-border bg-ds-bg px-3.5 py-3 font-ds text-ds-body text-ds-ink transition-colors duration-150 placeholder:text-ds-ink-tertiary hover:border-ds-accent/60 focus:border-ds-accent focus:bg-ds-surface";

const INPUT_ERROR_CLASS = "border-ds-alert bg-ds-alert-tint/40 hover:border-ds-alert";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-ds text-ds-body font-semibold text-ds-ink"
    >
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 font-ds text-ds-caption font-medium text-ds-alert">
      {message}
    </p>
  );
}

export default function SignupForm({ source }: { source: SignupSource }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState<SignupPayload["interest"]>("");
  const [earlyTester, setEarlyTester] = useState<SignupPayload["earlyTester"]>("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot

  const [errors, setErrors] = useState<SignupErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const id = (field: string) => `${uid}-${field}`;

  // Clear a field's error as soon as the person starts correcting it, rather
  // than leaving stale red text under a now-valid input until the next submit.
  const clearError = (field: keyof SignupErrors) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setFormError("");

    const payload: SignupPayload = {
      firstName,
      lastName,
      email,
      interest,
      earlyTester,
      marketingConsent,
      source,
      company,
    };

    const nextErrors = validateSignup(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data?.errors) setErrors(data.errors as SignupErrors);
        setFormError(
          data?.error ?? "We couldn't save your details. Please check the form and try again.",
        );
        setStatus("idle");
        return;
      }

      setStatus("done");
    } catch {
      setFormError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-ds-xl border border-ds-border bg-ds-surface p-8 shadow-ds-card md:p-10"
      >
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-ds-success-tint text-ds-success">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-ds text-ds-h2 text-ds-ink">You&apos;re on the list</h3>
        <p className="mt-3 max-w-md font-ds text-ds-body-lg text-ds-ink-secondary">
          Thanks, {firstName.trim() || "and welcome"}. We&apos;ve saved your details and
          we&apos;ll be in touch as Zentic opens up to more people.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-ds-xl border border-ds-border bg-ds-surface p-6 shadow-ds-card md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={id("firstName")}>First name</FieldLabel>
          <input
            id={id("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={LIMITS.name}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearError("firstName");
            }}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? id("firstName-error") : undefined}
            className={`${INPUT_CLASS} ${errors.firstName ? INPUT_ERROR_CLASS : ""}`}
          />
          <FieldError id={id("firstName-error")} message={errors.firstName} />
        </div>

        <div>
          <FieldLabel htmlFor={id("lastName")}>Last name</FieldLabel>
          <input
            id={id("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={LIMITS.name}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              clearError("lastName");
            }}
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? id("lastName-error") : undefined}
            className={`${INPUT_CLASS} ${errors.lastName ? INPUT_ERROR_CLASS : ""}`}
          />
          <FieldError id={id("lastName-error")} message={errors.lastName} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={id("email")}>Email address</FieldLabel>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? id("email-error") : undefined}
            className={`${INPUT_CLASS} ${errors.email ? INPUT_ERROR_CLASS : ""}`}
          />
          <FieldError id={id("email-error")} message={errors.email} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={id("interest")}>
            Why are you interested in Zentic?{" "}
            <span className="font-normal text-ds-ink-tertiary">(optional)</span>
          </FieldLabel>
          <div className="relative">
            <select
              id={id("interest")}
              name="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value as SignupPayload["interest"])}
              className={`${INPUT_CLASS} appearance-none pr-11 ${
                interest === "" ? "text-ds-ink-tertiary" : ""
              }`}
            >
              <option value="">Select a reason</option>
              {INTEREST_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-ds-ink">
                  {option}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ds-ink-secondary"
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="mb-1.5 font-ds text-ds-body font-semibold text-ds-ink">
            Interested in being an early tester?
          </legend>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((value) => (
              <label
                key={value}
                className={`inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-ds-md border px-5 py-3 font-ds text-ds-body font-semibold transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-zentic-purple-dark sm:min-w-[104px] sm:flex-none ${
                  earlyTester === value
                    ? "border-ds-primary bg-ds-primary text-white"
                    : "border-ds-border bg-ds-bg text-ds-ink-secondary hover:border-ds-accent/60 hover:text-ds-ink"
                }`}
              >
                <input
                  type="radio"
                  name={id("earlyTester")}
                  value={value}
                  checked={earlyTester === value}
                  onChange={() => setEarlyTester(value)}
                  className="sr-only"
                />
                {value === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label
            htmlFor={id("marketingConsent")}
            className="flex cursor-pointer items-start gap-3 rounded-ds-md py-1"
          >
            <input
              id={id("marketingConsent")}
              name="marketingConsent"
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 cursor-pointer rounded border-ds-border accent-[#272665]"
            />
            <span className="font-ds text-ds-body text-ds-ink-secondary">
              Send me occasional product and marketing updates from Zentic Health.
              You can unsubscribe at any time.
            </span>
          </label>
        </div>
      </div>

      {/* Honeypot — hidden from sighted users and assistive tech alike. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input
          id={id("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-6 rounded-ds-md border border-ds-alert/30 bg-ds-alert-tint px-4 py-3 font-ds text-ds-body text-ds-alert"
        >
          {formError}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 border-t border-ds-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-ds-md bg-ds-primary px-7 py-3 font-ds text-ds-body font-semibold text-white transition-transform duration-150 hover:opacity-95 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Signing up…" : "Sign up"}
          {status !== "submitting" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
        <p className="font-ds text-ds-caption text-ds-ink-secondary sm:max-w-xs sm:text-right">
          We only use your details to contact you about Zentic. Read our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ds-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
