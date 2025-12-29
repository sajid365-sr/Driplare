
-- Create a table for Content Sync Settings
create table if not exists public.content_sync_settings (
  id uuid primary key default gen_random_uuid(),
  website_url text,
  content_snippets text,
  content_file_url text,
  updated_at timestamptz not null default now()
);

-- Make sure only one row exists (singleton pattern)
-- Optional: Add a constraint (if you want at most one global settings row)
-- alter table public.content_sync_settings add constraint single_settings_row check (id = (select min(id) from public.content_sync_settings));

-- Create storage bucket for Content Sync Files (public for simplicity)
insert into storage.buckets (id, name, public) 
values ('content_sync_files', 'content_sync_files', true)
on conflict (id) do nothing;

-- Allow public read access and authenticated upload/update for content_sync_files
create policy "Public Read Access ContentSync"
on storage.objects for select
using (bucket_id = 'content_sync_files');

create policy "Authenticated Users Can Upload ContentSync"
on storage.objects for insert
with check (bucket_id = 'content_sync_files' and auth.role() = 'authenticated');

create policy "Authenticated Users Can Update ContentSync"
on storage.objects for update
using (bucket_id = 'content_sync_files' and auth.role() = 'authenticated');

create policy "Authenticated Users Can Delete ContentSync"
on storage.objects for delete
using (bucket_id = 'content_sync_files' and auth.role() = 'authenticated');
