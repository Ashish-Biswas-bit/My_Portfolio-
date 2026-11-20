create extension if not exists pgcrypto;

create table if not exists public.portfolio_content (
  id uuid primary key default gen_random_uuid(),
  collection_name text not null,
  document_id text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collection_name, document_id)
);

alter table public.portfolio_content enable row level security;

drop policy if exists "Public can read portfolio content" on public.portfolio_content;
create policy "Public can read portfolio content"
  on public.portfolio_content for select
  using (true);

drop policy if exists "Authenticated admins can insert portfolio content" on public.portfolio_content;
create policy "Authenticated admins can insert portfolio content"
  on public.portfolio_content for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated admins can update portfolio content" on public.portfolio_content;
create policy "Authenticated admins can update portfolio content"
  on public.portfolio_content for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated admins can delete portfolio content" on public.portfolio_content;
create policy "Authenticated admins can delete portfolio content"
  on public.portfolio_content for delete
  to authenticated
  using (true);

alter table public.portfolio_content replica identity full;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'portfolio_content'
  ) then
    alter publication supabase_realtime add table public.portfolio_content;
  end if;
end
$$;
