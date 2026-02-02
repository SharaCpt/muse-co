-- Update Portfolio Header Image with higher quality and better dimensions
UPDATE site_images 
SET image_url = 'https://images.unsplash.com/photo-1628336358317-0582bfa7519d?q=100&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
WHERE id = 'header_portfolio';
