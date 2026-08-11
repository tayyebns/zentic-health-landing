import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminLogin from "@/components/admin/AdminLogin";
import SignupsTable from "@/components/admin/SignupsTable";
import LogoutButton from "@/components/admin/LogoutButton";
import { ADMIN_COOKIE, isAdminConfigured, verifySessionToken } from "@/lib/admin-auth";
import { isSupabaseConfigured, listSignups, type SignupRecord } from "@/lib/signups-store";

// Never cached, never prerendered: this reads a session cookie and live data.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin: Zentic Health",
  // Keep the panel out of search results and link previews.
  robots: { index: false, follow: false, nocache: true },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ds-bg font-ds text-ds-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">{children}</div>
    </div>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-ds-xl border border-ds-warning/30 bg-ds-warning-tint px-6 py-5">
      <p className="font-ds text-ds-title text-ds-ink">{title}</p>
      <div className="mt-2 font-ds text-ds-body text-ds-ink-secondary">{children}</div>
    </div>
  );
}

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <Shell>
        <h1 className="font-ds text-ds-h1 text-ds-ink">Zentic Health admin</h1>
        <div className="mt-6">
          <Notice title="Admin panel not configured">
            <p>
              Set the <code className="font-mono text-ds-ink">ADMIN_PASSWORD</code>{" "}
              environment variable in Vercel and redeploy to enable this page.
            </p>
          </Notice>
        </div>
      </Shell>
    );
  }

  const authenticated = verifySessionToken(cookies().get(ADMIN_COOKIE)?.value);
  if (!authenticated) return <AdminLogin />;

  let rows: SignupRecord[] = [];
  let loadError = "";
  try {
    rows = await listSignups();
  } catch (error) {
    console.error("[admin] Failed to load signups:", error);
    loadError =
      "Could not load signups from the database. Check the Supabase environment variables in Vercel.";
  }

  return (
    <Shell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-ds text-ds-h1 text-ds-ink">Signups</h1>
          <p className="mt-2 font-ds text-ds-body text-ds-ink-secondary">
            Everyone who has signed up through the Zentic Health website.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8">
        {loadError ? (
          <Notice title="Could not load signups">
            <p>{loadError}</p>
          </Notice>
        ) : (
          <>
            {!isSupabaseConfigured() && (
              <div className="mb-6">
                <Notice title="Showing local development data">
                  <p>
                    Supabase is not configured in this environment, so these rows come
                    from the local <code className="font-mono">.data/signups.json</code>{" "}
                    file rather than the live database.
                  </p>
                </Notice>
              </div>
            )}
            <SignupsTable rows={rows} />
          </>
        )}
      </div>

      <p className="mt-10 font-ds text-ds-caption text-ds-ink-secondary">
        This page contains personal information. Do not share the password or leave
        this page open on a shared computer. You will be signed out automatically
        after 12 hours.
      </p>
    </Shell>
  );
}
