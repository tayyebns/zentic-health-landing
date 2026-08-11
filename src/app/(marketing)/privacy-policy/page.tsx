import type { Metadata } from "next";
import Reveal from "@/components/marketing/Reveal";

const TITLE = "Privacy Policy: Zentic Health";
const DESCRIPTION =
  "How Zentic Health handles personal information collected through this website, including the waitlist.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zentic Health" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const EMAIL = "zentichealth@gmail.com";

function MailLink({ bold = false }: { bold?: boolean }) {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className={`text-ds-primary underline underline-offset-2 hover:opacity-80 ${
        bold ? "font-semibold" : ""
      }`}
    >
      {EMAIL}
    </a>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="mt-12 border-t border-ds-border pt-10">
      <h2 className="font-ds text-ds-h2 text-ds-ink">{title}</h2>
      {children}
    </Reveal>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 font-ds text-ds-body-lg text-ds-ink-secondary">{children}</p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 font-ds text-ds-body-lg text-ds-ink-secondary marker:text-ds-accent">
      {items.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-10 md:py-20">
      <Reveal>
        <h1 className="text-[32px] font-bold leading-tight tracking-[-0.02em] text-ds-ink md:text-[40px]">
          Privacy Policy
        </h1>
        <p className="mt-3 font-ds text-ds-body text-ds-ink-secondary">
          Last updated: 11 August 2026
        </p>

        <p className="mt-10 font-ds text-ds-body-lg text-ds-ink-secondary">
          Zentic Health respects your privacy and aims to collect only the personal
          information necessary to operate this website, manage our waitlist, respond
          to enquiries, and communicate with people who have asked to hear from us.
        </p>
        <p className="mt-4 font-ds text-ds-body-lg text-ds-ink-secondary">
          This website does not currently use cookies or analytics tracking.
        </p>
      </Reveal>

      <Section title="Waitlist and early access">
        <P>If you join the Zentic Health waitlist, we may collect:</P>
        <List
          items={[
            "Your first and last name",
            "Your email address",
            "Your reason for being interested in Zentic, if you choose to provide it",
            "Whether you are interested in becoming an early tester",
            "Your marketing or product-update preferences",
            "Which page of the Zentic website you signed up from",
            "The date and time you joined the waitlist",
          ]}
        />
        <P>
          We use this information to manage the Zentic Health waitlist, contact you
          about your place on the waitlist and availability of Zentic, understand
          general interest in the product, and identify people who have expressed an
          interest in early testing.
        </P>
        <P>
          Joining the waitlist does not require you to provide information about your
          health. Please do not provide medical conditions, symptoms, medications,
          diagnoses, medical records, or other health information through the waitlist
          form.
        </P>
        <P>
          Where we separately ask for your consent to receive marketing or broader
          product updates, this is optional. You can join the waitlist without agreeing
          to receive marketing communications, and you can withdraw your consent at any
          time.
        </P>
      </Section>

      <Section title="Contact and enquiries">
        <P>
          If you email us at <MailLink />, we may store the information you provide,
          such as your name, email address, and the content of your message.
        </P>
        <P>
          We use this information only as necessary to manage and respond to your
          enquiry unless you separately agree to another use.
        </P>
      </Section>

      <Section title="How we store and process information">
        <P>
          We may use third-party service providers to securely host and process
          information collected through this website, including infrastructure and
          database providers used to operate the Zentic Health waitlist.
        </P>
        <P>
          These providers process information on our behalf for the purposes described
          in this policy. We do not sell your personal information.
        </P>
        <P>
          We take reasonable technical and organisational measures to protect the
          personal information we hold.
        </P>
      </Section>

      <Section title="How long we keep your information">
        <P>
          We retain personal information only for as long as reasonably necessary for
          the purpose for which it was collected.
        </P>
        <P>
          For waitlist members, this may include the period leading up to the launch and
          early-access stages of Zentic Health. We will delete or anonymise information
          when it is no longer required, subject to any legal obligations requiring us to
          retain it.
        </P>
        <P>
          Information relating to enquiries is retained only for as long as reasonably
          necessary to manage the enquiry.
        </P>
      </Section>

      <Section title="Your rights">
        <P>
          Depending on the circumstances, UK data protection law may give you rights
          concerning your personal information, including the right to:
        </P>
        <List
          items={[
            "Request access to personal information we hold about you",
            "Ask us to correct inaccurate information",
            "Ask us to delete your information",
            "Object to or restrict certain uses of your information",
            "Withdraw consent where our processing is based on your consent",
          ]}
        />
        <P>
          You can also ask to be removed from the Zentic Health waitlist or withdraw
          your marketing consent at any time.
        </P>
        <P>
          To exercise any of these rights, email <MailLink bold />.
        </P>
      </Section>

      <Section title="The Zentic Health product">
        <P>
          This website, including its waitlist, is separate from the Zentic Health
          application itself.
        </P>
        <P>
          The waitlist is not intended for the collection of patient medical information
          or health records.
        </P>
        <P>
          Zentic Health is currently in development. Before the Zentic Health
          application begins processing users&apos; health information, an appropriate
          dedicated privacy notice covering the application and its processing of
          personal and health data will be published in accordance with applicable data
          protection requirements, including the UK GDPR and Data Protection Act 2018.
        </P>
      </Section>

      <Section title="Changes to this policy">
        <P>
          We may update this Privacy Policy as the website and Zentic Health develop.
        </P>
        <P>
          Where a change materially affects how personal information collected through
          the website is used, this policy will be updated accordingly.
        </P>
      </Section>

      <Section title="Contact us">
        <P>
          If you have questions about this Privacy Policy, want to exercise your data
          protection rights, or want your information removed from the Zentic Health
          waitlist, contact <MailLink bold />.
        </P>
      </Section>
    </div>
  );
}
