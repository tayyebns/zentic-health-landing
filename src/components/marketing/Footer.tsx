import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import CopyableEmail from "./CopyableEmail";

export default function Footer() {
  return (
    <footer className="border-t border-ds-border bg-ds-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <Link href="/" aria-label="Zentic Health">
          <Wordmark size="sm" />
        </Link>

        <div className="flex flex-col gap-1 md:items-end">
          <CopyableEmail
            email="zentichealth@gmail.com"
            className="font-ds text-ds-body font-medium text-ds-ink-secondary hover:text-ds-primary"
          />
          <p className="font-ds text-ds-caption text-ds-ink-secondary">
            Built with GDPR and UK DPA 2018 principles at its core.{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ds-primary">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-ds-border px-5 py-4 md:px-10">
        <p className="font-ds text-ds-caption text-ds-ink-secondary">
          © {new Date().getFullYear()} Zentic Health.{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-ds-primary">
            Get in touch
          </Link>
        </p>
      </div>
    </footer>
  );
}
