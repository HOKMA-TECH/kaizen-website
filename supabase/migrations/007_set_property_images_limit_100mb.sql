-- Increase property images bucket file size limit to 100MB per file

update storage.buckets
set file_size_limit = 104857600
where id = 'property-images';
