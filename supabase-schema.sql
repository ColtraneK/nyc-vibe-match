-- Run this in your Supabase SQL editor

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  answers jsonb not null default '{}',
  matches jsonb not null default '[]',
  created_at timestamptz default now()
);

create table if not exists squads (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  creator_id uuid references users(id),
  created_at timestamptz default now()
);

create table if not exists squad_members (
  id uuid primary key default gen_random_uuid(),
  squad_id uuid references squads(id) on delete cascade,
  user_id uuid references users(id),
  result_id uuid references quiz_results(id),
  joined_at timestamptz default now(),
  unique(squad_id, user_id)
);

-- Disable RLS for MVP (enable and add policies before going to production)
alter table users disable row level security;
alter table quiz_results disable row level security;
alter table squads disable row level security;
alter table squad_members disable row level security;
