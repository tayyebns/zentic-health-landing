This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Signup form

The signup form appears at the bottom of the home page (`#sign-up`) and at the
top of `/contact`. Both render the same component, `SignupForm`, tagged with a
`source` so you can tell where a person signed up from.

| Piece | Location |
| --- | --- |
| Form UI | `src/components/marketing/SignupForm.tsx` |
| Shared validation / field options | `src/lib/signup.ts` |
| API endpoint | `src/app/api/signup/route.ts` (`POST /api/signup`) |
| Database schema | `supabase/schema.sql` |

### Storage: Supabase (free tier)

Submissions are stored in a Supabase Postgres table. The free plan gives 500 MB
of database storage — a signup row is well under 1 KB, so that is hundreds of
thousands of signups, and the dashboard gives you a table view and CSV export
without any extra work.

One-time setup:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste in `supabase/schema.sql`, and run it.
3. Go to **Settings → API** and copy the project URL and the `service_role` key.
4. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY`.
5. Add those same two variables to the Vercel project's Environment Variables
   before deploying.

Signups are visible in Supabase under **Table Editor → signups**.

### Notes

- The `service_role` key is only ever read inside the API route, so it never
  reaches the browser. Row Level Security is enabled on the table with no
  policies, meaning the public anon key cannot read or write signups at all.
- Email is the unique key, and the API upserts, so someone submitting twice
  updates their existing row instead of creating a duplicate.
- The route validates and normalises every field server-side, rejects unknown
  dropdown values, rate-limits by IP, and drops bot submissions via a honeypot
  field.
- **Without** Supabase credentials, `npm run dev` writes submissions to
  `.data/signups.json` (gitignored) so the form is testable locally. In
  production a missing config returns an error rather than silently losing a
  signup.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
