# 🧶 Mayuri's Crochet — Website

A fully static, free-to-host crochet business website powered by **Next.js**, **Tailwind CSS**, and **Google Sheets** as a CMS.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📋 Personalise the Website

### Step 1 — Edit `lib/config.ts`

```ts
export const BUSINESS_CONFIG = {
  name: "Your Business Name",
  tagline: "Your tagline here",
  whatsappNumber: "919876543210",   // Country code + number, no + or spaces
  instagramHandle: "yourhandle",
  instagramUrl: "https://instagram.com/yourhandle",
  email: "you@example.com",
  sheetsUrl: "YOUR_GOOGLE_SHEETS_URL",  // See below
};
```

---

## 📊 Google Sheets Setup (CMS)

### Step 1 — Create the Sheet

Create a Google Sheet with **exactly this header row**:

| Product Name | Category | Price | Description | Image URL | Available | Featured |
|---|---|---|---|---|---|---|
| Sunflower Bouquet | Flowers | 799 | Handmade crochet bouquet | https://... | Yes | Yes |

- **Available**: `Yes` or `No` — `No` hides the product
- **Featured**: `Yes` or `No` — shows on home page
- **Image URL**: paste any direct image URL (Google Drive, Imgur, your own CDN, etc.)

### Step 2 — Make the Sheet Public

1. Click **Share** → **Change to anyone with the link** → **Viewer**
2. Click **Done**

### Step 3 — Get the JSON URL

Your sheet URL looks like:  
`https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

Your JSON URL is:  
`https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:json&sheet=Products`

Replace `SHEET_ID` with your actual sheet ID (the long string between `/d/` and `/edit`).

### Step 4 — Add the URL

Create a `.env.local` file:

```env
NEXT_PUBLIC_SHEETS_URL=https://docs.google.com/spreadsheets/d/YOUR_ID/gviz/tq?tqx=out:json&sheet=Products
```

> **Note**: If the env variable is not set, the site shows built-in demo products automatically.

---

## 🌐 Deploy to GitHub Pages (Free)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Add Secret

In your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
- Name: `NEXT_PUBLIC_SHEETS_URL`
- Value: your Google Sheets JSON URL

### Step 3 — Enable GitHub Pages

Go to **Settings** → **Pages** → Under **Source**, select **GitHub Actions**

### Step 4 — Deploy!

Every push to `main` automatically rebuilds and deploys the site.  
Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## ☁️ Deploy to Cloudflare Pages (Alternative)

1. Connect your GitHub repo at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Framework preset: **Next.js (Static HTML Export)**
3. Build command: `npm run build`
4. Output directory: `out`
5. Add environment variable: `NEXT_PUBLIC_SHEETS_URL` = your sheets URL

---

## 🖼️ Image Hosting Tips (Free Options)

For product photos, you can use:

- **Google Drive**: Upload → Right-click → Get link → Change to "Anyone" → Use direct link  
  Format: `https://drive.google.com/uc?id=FILE_ID`
- **Imgur**: Upload image → Copy direct link (ends in `.jpg`)
- **Cloudinary Free Tier**: 25GB free storage, great for optimization
- **GitHub** itself: Upload images to your repo's `/public/images/` folder, use `/images/photo.jpg`

---

## 🛠️ Local Development

```bash
npm run dev      # Start development server
npm run build    # Build static site
npm run start    # Preview built site
```

---

## 📁 Project Structure

```
crochet-store/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, Footer, WhatsApp button)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Design tokens & global styles
│   ├── not-found.tsx       # 404 page
│   ├── products/
│   │   └── page.tsx        # All products with filters
│   ├── about/
│   │   └── page.tsx        # About the artist
│   └── contact/
│       └── page.tsx        # Contact & FAQ
├── components/
│   ├── Navbar.tsx           # Responsive navigation
│   ├── Footer.tsx           # Footer with links
│   ├── ProductCard.tsx      # Product card with WhatsApp button
│   ├── ProductGrid.tsx      # Client-side filter/search/sort
│   ├── ProductModal.tsx     # Click-to-expand product detail
│   └── WhatsAppFloat.tsx    # Floating WhatsApp CTA
├── lib/
│   ├── config.ts            # ⭐ Business settings (edit this!)
│   ├── products.ts          # Google Sheets fetch + demo data
│   └── types.ts             # TypeScript interfaces
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages auto-deploy
└── .env.example             # Environment variable template
```

---

## 🔄 Day-to-day: Adding Products

1. Open your Google Sheet
2. Add a new row with product details
3. Set **Available** = `Yes`
4. Paste an image URL
5. **Done!** — the website auto-updates within 5 minutes (or on next deployment)

No code changes needed. Ever.

---

## 📱 Features

- ✅ Mobile-first responsive design
- ✅ Google Sheets CMS — no code for updates
- ✅ WhatsApp ordering with pre-filled messages
- ✅ Product search, filter by category, sort by price
- ✅ Product detail modal
- ✅ Static export — works on GitHub Pages / Cloudflare Pages free tier
- ✅ SEO-friendly with meta tags
- ✅ Floating WhatsApp button on all pages
- ✅ Custom order request flow
- ✅ Demo products when Sheets is not configured

---

*Made with 🧡 for handmade businesses*
