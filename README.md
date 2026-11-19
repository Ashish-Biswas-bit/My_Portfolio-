# Ashish Biswas — Futuristic 3D Portfolio

A modern, futuristic developer portfolio built with Next.js, Three.js, Framer Motion, and Tailwind CSS.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase setup

1. Create a Supabase project and enable the Email provider under Authentication.
2. Run [`scripts/supabase-schema.sql`](scripts/supabase-schema.sql) in the Supabase SQL Editor.
3. Create an admin user under Authentication > Users.
4. Add the project URL and publishable key to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
```

5. Seed the sample content:

```bash
node --env-file=.env.local scripts/seed.mjs
```

Cloudinary remains responsible for image uploads. Set
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and
`NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` in `.env.local`.

## Tech Stack

- **Next.js 14** — React framework
- **Three.js** + React Three Fiber — 3D animations
- **Framer Motion** — Page transitions and scroll animations
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Type safety

## Features

- 3D animated background with floating shapes
- Floating particles animation
- Smooth page transitions
- Scroll-based animations
- Modern futuristic dark UI
- Glassmorphism design
- Custom cursor
- Scroll progress bar
- Project filtering
- Responsive mobile design
- Loading screen animation
