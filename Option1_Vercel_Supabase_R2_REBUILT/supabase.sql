create extension if not exists "pgcrypto";

create table if not exists public.licenses (
  id           uuid primary key default gen_random_uuid(),
  license_key  text unique not null,
  plan         text not null default 'standard',
  max_devices  int  not null default 3,
  status       text not null default 'active',
  created_at   timestamptz not null default now()
);

create table if not exists public.license_activations (
  id           uuid primary key default gen_random_uuid(),
  license_id   uuid not null references public.licenses(id) on delete cascade,
  device_hash  text not null,
  os           text not null,
  hostname     text,
  created_at   timestamptz not null default now(),
  unique (license_id, device_hash)
);