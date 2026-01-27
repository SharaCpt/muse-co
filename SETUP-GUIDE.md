# 🚀 SETUP GUIDE - MUSE & CO Website

## ✅ What's Been Built

Your luxury website is complete with:
- ✅ Age gate (18+ disclaimer)
- ✅ Stunning homepage with hero section
- ✅ About page (Shara's story + 13 years experience)
- ✅ Services page (Event Staffing, Nightlife, Concierge)
- ✅ Portfolio page (9 "Coming Soon" placeholders)
- ✅ Contact page with form + direct WhatsApp
- ✅ Floating WhatsApp button (site-wide)
- ✅ Mobile-first responsive design
- ✅ Dark luxury aesthetic (black + champagne gold)
- ✅ Privacy Policy & Terms of Service

---

## 📋 NEXT STEPS (Follow in Order)

### Step 1: Install Node.js (If Not Already Done)

**You may need to restart VS Code for Node.js to work.**

1. Close VS Code completely
2. Reopen VS Code
3. Open terminal in VS Code
4. Test if Node.js is installed:

```powershell
node --version
```

If you see a version number (e.g., v20.11.0), you're good! If not, download from: https://nodejs.org

---

### Step 2: Install Dependencies

Once Node.js is working, run this command in the terminal:

```powershell
npm install
```

This will install all required packages (React, Next.js, Tailwind, Framer Motion, etc.)

**This may take 2-3 minutes.**

---

### Step 3: Run the Website Locally

After installation completes, start the development server:

```powershell
npm run dev
```

You should see:
```
Local:        http://localhost:3000
```

Open your browser and go to: **http://localhost:3000**

---

### Step 4: Test on Your Phone

1. Find your computer's local IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Make sure your phone is on the same Wi-Fi network

3. On your iPhone, open Safari and go to:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```
   (Replace YOUR-IP-ADDRESS with the actual number)

---

## 🔧 OPTIONAL: Set Up Git for Backups

### Install Git:
Download from: https://git-scm.com/download/win

### After installing Git, restart VS Code and run:

```powershell
git init
git add .
git commit -m "Initial commit - MUSE & CO website"
```

### To back up to GitHub:
1. Create a GitHub account (if you don't have one)
2. Create a new repository called "museco"
3. Run these commands (replace YOUR-USERNAME):

```powershell
git remote add origin https://github.com/YOUR-USERNAME/museco.git
git push -u origin main
```

---

## 🌐 DEPLOYMENT TO LIVE WEBSITE

### Option 1: Vercel (Easiest - Free)

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your `museco` repository
5. Click "Deploy"
6. Done! You'll get a live URL (e.g., museco.vercel.app)

### Option 2: Connect Your Domain (museco.co.za)

After deploying to Vercel:

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add domain: `museco.co.za`
3. Vercel will give you DNS records
4. Log into GoDaddy
5. Update nameservers to Cloudflare
6. In Cloudflare, add the DNS records from Vercel
7. Wait 24-48 hours for DNS propagation

---

## 🎨 HOW TO EDIT CONTENT

### Edit Text:
Open the relevant file in VS Code:
- Homepage: `app/page.tsx`
- About: `app/about/page.tsx`
- Services: `app/services/page.tsx`
- Contact: `app/contact/page.tsx`

### Change Images:
Replace the Unsplash URLs with your own images:
```typescript
src="https://images.unsplash.com/..."
```

### Change Colors:
Edit `tailwind.config.ts` and `app/globals.css`

---

## 📞 CONTACT INFO ALREADY CONFIGURED

- ✅ WhatsApp: +27 60 776 9793
- ✅ Email: sharafindit@gmail.com (hidden, receives form submissions)
- ✅ Instagram: Icon added (link to be updated later)

---

## 🔐 ADMIN DASHBOARD (Phase 2)

After the site is live, we'll build a simple admin panel where Shara can:
- Upload/edit model profiles
- Change homepage images and text
- Update services and about content
- View contact form submissions

This requires:
1. Setting up Supabase (free database)
2. Creating admin login page
3. Building easy-to-use edit forms

**We can tackle this after the site is deployed!**

---

## ⚠️ TROUBLESHOOTING

### "Command not found" errors?
- Restart VS Code after installing Node.js or Git

### Website not loading?
- Make sure `npm run dev` is running in the terminal
- Check for error messages in the terminal

### Need help?
- Send me screenshots of any errors
- I'll guide you through each step!

---

## 🎯 CURRENT STATUS

✅ **Phase 1 Complete:** Full website built (all pages, components, styling)  
⏳ **Phase 2 Pending:** Install dependencies & test locally  
⏳ **Phase 3 Pending:** Deploy to Vercel  
⏳ **Phase 4 Pending:** Connect domain  
⏳ **Phase 5 Pending:** Admin dashboard  

---

**You're doing great! Once Node.js is working, we're just 2 commands away from seeing your site live locally! 🚀**
