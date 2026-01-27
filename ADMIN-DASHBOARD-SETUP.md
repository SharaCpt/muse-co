# Admin Dashboard Setup - FINAL STEPS

## ✅ What's Already Done
- Admin login page created at `/admin`
- Admin dashboard created at `/admin/dashboard`
- Password authentication system (password: `sms21115`)
- Image upload functionality
- Middleware protection for admin routes

## 🔧 What You Need To Do Now

### Step 1: Create Storage Bucket in Supabase

1. Go to https://supabase.com/dashboard
2. Select your project `lltxovwrdbripueqwezekw`
3. Click **Storage** in the left sidebar
4. Click **New Bucket**
5. Name it: `website-images`
6. Make it **Public** (check the box)
7. Click **Create Bucket**

### Step 2: Run SQL Script

1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file: `c:\Users\FAM\Desktop\museco\supabase\admin-setup.sql`
4. Copy ALL the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click **Run** (bottom right)
7. You should see: "Success. No rows returned"

### Step 3: Test Admin Dashboard

1. Open http://localhost:3000/admin
2. Enter password: `sms21115`
3. Click "Access Dashboard"
4. You should see the Image Manager with 7 sections:
   - Homepage Hero
   - VIP Hostess Card
   - Brand Ambassador Card
   - Event Hostess Card
   - Portfolio Preview 1, 2, 3

### Step 4: Test Image Upload from Phone

1. On your phone, open: `http://192.168.3.24:3000/admin`
2. Login with password: `sms21115`
3. Click "Replace Image" on any section
4. Your phone camera will open
5. Take/choose a photo
6. Wait for upload (green checkmark)
7. Refresh the homepage to see the new image

## 🎨 How It Works

- **Shara logs in** → `/admin` (password only, no username)
- **Uploads images** → Saved to Supabase storage bucket `website-images`
- **Database updates** → `site_images` table stores the image URLs
- **Website displays** → Homepage shows the uploaded images (after refresh)

## 🔐 Security

- Password stored in `.env.local` (never committed to code)
- Session cookie expires after 7 days
- RLS policies protect database from public writes
- Only authenticated admin can upload images

## 📱 Mobile-Friendly

- Large touch targets for phone use
- Camera opens directly on mobile
- Instant upload progress indicator
- Simple one-click image replacement

## 🔄 To Change Password Later

1. Open `.env.local`
2. Change `ADMIN_PASSWORD=sms21115` to new password
3. Restart dev server: `npm run dev`

---

## Next Steps After Testing

Once you confirm the admin dashboard works:
1. Push code to GitHub
2. Deploy to Vercel
3. Add environment variables to Vercel (ADMIN_PASSWORD, RESEND_API_KEY, Supabase keys)
4. Configure domain museco.co.za
5. Shara can manage images from anywhere!
