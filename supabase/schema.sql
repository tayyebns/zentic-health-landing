-- Zentic Health — signup table.
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists public.signups (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  first_name    text        not null check (char_length(first_name) between 1 and 80),
  last_name     text        not null check (char_length(last_name)  between 1 and 80),
  -- Always stored lowercased by the API, so a plain unique constraint is enough
  -- to keep one row per person and to serve as the upsert conflict target.
  email         text        not null unique check (char_length(email) between 3 and 254),
  interest      text,
  early_tester  boolean,
  marketing_consent boolean not null default false,
  source        text        not null default 'home'
);

create index if not exists signups_created_at_idx on public.signups (created_at desc);

-- Row Level Security on with no policies: the anon/public key cannot read or
-- write this table at all. Inserts happen server-side with the service role
-- key, which bypasses RLS. Nothing in the browser ever touches Supabase.
alter table public.signups enable row level security;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists signups_set_updated_at on public.signups;
create trigger signups_set_updated_at
  before update on public.signups
  for each row execute function public.set_updated_at();
