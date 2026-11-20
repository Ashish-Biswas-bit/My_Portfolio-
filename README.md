# Ashish Biswas — Full Stack Web & Desktop Software Developer

A responsive portfolio built with Next.js, React, and Tailwind CSS, focused on
full stack web development and Python desktop software.

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

5. To seed verified profile defaults, add your Supabase service-role key to
   `.env.local` as `SUPABASE_SERVICE_ROLE_KEY` and run:

```bash
node --env-file=.env.local scripts/seed.mjs
```

Cloudinary remains responsible for image uploads. Set
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and
`NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` in `.env.local`.

Add your public contact details in **Admin > Settings**. The contact form opens a
pre-filled email draft in the visitor's email app; it does not send messages to
a server.

Keep `SUPABASE_SERVICE_ROLE_KEY` private and never prefix it with
`NEXT_PUBLIC_`; it bypasses row-level security.

## Portfolio technology

- **Next.js** — App Router framework
- **React** — UI components
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Type safety

## Features

- Responsive sticky navigation
- Lightweight architecture and stack overview
- Skills and services grouped by verified technology
- Project filters with working demo/source links
- Accessible contact form that opens a pre-filled email draft
- Reduced-motion support and keyboard-visible focus styles
