
-- Remove old upload policy that requires authentication (if present)
drop policy if exists "Authenticated Users Can Upload ContentSync" on storage.objects;

-- Allow public (unauthenticated) uploads to content_sync_files bucket
create policy "Public Upload ContentSync"
on storage.objects for insert
with check (bucket_id = 'content_sync_files');
