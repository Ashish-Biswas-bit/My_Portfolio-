# Ashish Biswas — Full Stack Web & Desktop Software Developer

A responsive developer portfolio built with Next.js, React, TypeScript, and
Tailwind CSS. Its visual system uses Ice White, Deep Teal, and Soft Peach.

## Getting started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start the production server after building
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Supabase setup

1. Create a Supabase project and enable the Email provider under
   **Authentication → Providers**.
2. Run [`scripts/supabase-schema.sql`](scripts/supabase-schema.sql) in the
   Supabase SQL Editor. This creates the `public.portfolio_content` table,
   access policies, and realtime publication membership.
3. Add the project URL and publishable (anon) key to `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
   ```

4. Create an admin user under **Authentication → Users**. Sign in to the
   portfolio admin at [http://localhost:3000/admin](http://localhost:3000/admin)
   with that user.
5. Restart the Next.js server after changing environment variables.

The optional seed script inserts default Hero, About, and Settings documents.
Run it only after configuring the environment variables and applying the schema:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

```bash
node --env-file=.env.local scripts/seed.mjs
```

Keep `SUPABASE_SERVICE_ROLE_KEY` private and never prefix it with
`NEXT_PUBLIC_`; it bypasses row-level security.

## Admin panel and content

The responsive admin workspace is available at `/admin` after Supabase
authentication. It includes editors for Hero, About, Skills, Services,
Projects, Experience, Testimonials, Education, and site settings.

Currently, these admin-managed documents are read by the public portfolio:

- **Hero:** name, roles, description, CV URL, and stats. The Hero profile photo
  setting is used by the navbar; the photo is not displayed in the Hero section.
- **Projects:** project details, ordering, external links, and uploaded media.
- **Settings:** contact email and social links used by the Contact section and
  Footer.

The public About, Skills, Services, Experience, Education, and Why Hire Me
sections are currently defined in their frontend components. Their corresponding
admin editors are present, but saved edits do not yet update those public
sections. Testimonials can be managed in admin, but a public testimonials
section is not currently included on the homepage.

## Cloudinary media uploads

1. Create an **unsigned** Cloudinary upload preset. Restrict its allowed formats
   and file size in Cloudinary.
2. Add the Cloudinary cloud name and upload preset to `.env.local`:

   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-unsigned-preset
   ```

3. Restart the Next.js server. In **Admin → Projects**, upload an image or video
   and save the project. Its Cloudinary URL is stored in Supabase and displayed
   on the portfolio.

## Portfolio features

- Responsive floating navigation with a concentric radial menu
- Live Hero content and project data from Supabase
- Bento-style About section and responsive portfolio sections
- Project filters, image/video media, and external demo/source links
- Contact links from admin settings and a pre-filled email draft flow
- Keyboard-visible focus styles and reduced-motion support
