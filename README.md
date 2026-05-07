# Maria Francia N. Abdula — Portfolio

A personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Features
- Dark editorial design with teal accent palette
- Animated hero section with floating cards
- Timeline-based leadership section
- Mobile-first responsive layout
- Smooth scroll & intersection observer animations

## Deploying to Vercel

### Option 1 — Vercel CLI (recommended)
```bash
npm install -g vercel
vercel --prod
```

### Option 2 — Vercel Dashboard (drag & drop)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"** → **"Import"**
3. If uploading a folder: click **"Deploy"** and drag this entire folder in
4. Or push to a GitHub repo first and connect it

### Option 3 — GitHub + Vercel (best for updates)
1. Create a new GitHub repository
2. Upload all files: `index.html`, `style.css`, `script.js`, `vercel.json`, and the `public/` folder
3. Connect the repo to Vercel at vercel.com → Import Git Repository
4. Click **Deploy** — it's live!

## Adding Your Photo
The photo `public/maria-photo.png` is already included. Make sure it stays in the `public/` folder.

## Project Structure
```
portfolio/
├── index.html       ← Main page
├── style.css        ← All styles
├── script.js        ← Interactions
├── vercel.json      ← Vercel config
├── README.md        ← This file
└── public/
    └── maria-photo.png
```
