# 🎯 FINAL SETUP - Run These SQL Scripts

## 📍 Your Supabase Project
- **Project URL**: https://lltxovwrdbripueqwezekw.supabase.co
- **Project Ref**: lltxovwrdbripueqwezekw

---

## 🚀 Steps to Complete Setup

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/lltxovwrdbripueqwezekw/sql/new
2. You should see a SQL Editor

### Step 2: Run Scripts in This Order

#### ✅ Script 1: CMS Setup (Creates Tables)
**File**: `supabase/cms-setup.sql`

Copy and paste the ENTIRE contents of `cms-setup.sql` and click **RUN**

This creates:
- `portfolio_images` table
- `homepage_images` table  
- `page_headers` table
- Security policies
- Default starter images

---

#### ✅ Script 2: Storage Buckets
**File**: `supabase/create-storage-buckets.sql`

Copy and paste the ENTIRE contents of `create-storage-buckets.sql` and click **RUN**

This creates:
- `portfolio` bucket (50MB limit)
- `homepage` bucket (50MB limit)
- `headers` bucket (50MB limit)
- Public access policies

---

## ✨ After Running Scripts

### Test Your Admin Dashboard

1. **Go to**: https://museco.co.za/admin
2. **Password**: `sms21115`
3. **Test upload** in each section:
   - Portfolio Manager
   - Homepage Images
   - Page Headers

### Give Access to Shara

**Admin URL**: https://museco.co.za/admin  
**Password**: `sms21115`

She can:
- Upload portfolio model photos
- Change homepage hero & service cards
- Update page header backgrounds
- All from her phone or computer!

---

## 🎉 That's It!

Once those 2 SQL scripts run successfully, your site is 100% complete and ready to hand over!
