import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import CopyableEmail from "./CopyableEmail";

export default function Footer() {
  return (
    <footer className="border-t border-zentic-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <Link href="/" aria-label="Zentic Health">
          <Wordmark size="sm" />
        </Link>

        <div className="flex flex-col gap-1 md:items-end">
          <CopyableEmail
            email="zentichealth@gmail.com"
            className="font-sans text-sm font-medium text-zentic-ink-soft hover:text-zentic-purple-dark"
          />
          <p className="font-sans text-xs text-zentic-ink-soft/70">
            Built with GDPR and UK DPA 2018 principles at its core.{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-zentic-purple-dark">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-zentic-line px-6 py-4 md:px-10">
        <p className="font-sans text-xs text-zentic-ink-soft/60">
          © {new Date().getFullYear()} Zentic Health.{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-zentic-purple-dark">
            Get in touch
          </Link>
        </p>
      </div>
    </footer>
  );
}
