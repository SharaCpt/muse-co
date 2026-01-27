# MUSE & CO

Elite Lifestyle Staffing & Concierge - Cape Town, South Africa

## 🌟 About

A luxury website showcasing elite lifestyle models and event staffing services. Built with Next.js 14, featuring a dark, sophisticated design with gold accents.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
museco/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio gallery
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── AgeGate.tsx        # 18+ age verification
│   ├── Navigation.tsx     # Mobile-first navigation
│   ├── Footer.tsx         # Site footer
│   └── WhatsAppButton.tsx # Floating WhatsApp button
├── public/                # Static assets
└── supabase/              # Backend (to be configured)
```

## 🎨 Design System

### Colors
- **Deep Black:** #0A0A0A
- **Charcoal:** #1C1C1C
- **Champagne Gold:** #D4AF37
- **Midnight Navy:** #0F1B2B
- **Off White:** #F5F5F0

### Typography
- **Headers:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Supabase (to be configured)
- **Forms:** React Hook Form
- **Deployment:** Vercel

## 📱 Features

- ✅ 18+ Age gate with localStorage
- ✅ Mobile-first responsive design
- ✅ Floating WhatsApp button
- ✅ Smooth page transitions
- ✅ Portfolio grid (9 "Coming Soon" placeholders)
- ✅ Contact form
- ✅ Dark luxury aesthetic
- ✅ SEO optimized

## 🔐 Admin Dashboard (Coming Soon)

The admin panel will allow Shara to:
- Edit homepage content
- Manage model portfolios
- Update services and about sections
- Modify contact information

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically
4. Point domain (museco.co.za) to Vercel via Cloudflare DNS

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📞 Contact

- **WhatsApp:** +27 60 776 9793
- **Email:** sharafindit@gmail.com
- **Domain:** museco.co.za

## 📄 License

Private project - All rights reserved © 2026 MUSE & CO

---

Built with ❤️ for elite lifestyle experiences in Cape Town
