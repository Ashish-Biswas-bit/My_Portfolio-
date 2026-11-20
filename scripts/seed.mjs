/**
 * Seed verified portfolio profile defaults.
 * Run with: node --env-file=.env.local scripts/seed.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before seeding."
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const content = [
  {
    collection_name: "siteContent",
    document_id: "hero",
    data: {
      name: "Ashish Biswas",
      roles: ["Full Stack Web & Desktop Software Developer"],
      description:
        "I build thoughtful web applications and practical desktop software using a focused, modern technology stack.",
      cvUrl: "",
      avatarUrl: "",
      stats: [],
    },
  },
  {
    collection_name: "siteContent",
    document_id: "about",
    data: {
      description:
        "Ashish Biswas is a Full Stack Web & Desktop Software Developer pursuing a B.Sc. in Computer Science and Engineering at North Western University, Khulna.",
      bio: [
        "I focus on building end-to-end web applications and desktop software.",
        "My verified technology stack spans frontend development, backend and databases, Python desktop software, and GitHub/VS Code workflows.",
      ],
      avatarUrl: "",
      stats: [],
    },
  },
  {
    collection_name: "siteContent",
    document_id: "settings",
    data: {
      email: "",
      phone: "",
      whatsapp: "",
      github: "",
      linkedin: "",
      footerText:
        "Full Stack Web & Desktop Software Developer building useful software with a thoughtful approach.",
    },
  },
];

for (const item of content) {
  const { error } = await supabase
    .from("portfolio_content")
    .upsert(item, { onConflict: "collection_name,document_id" });
  if (error) throw error;
}

console.log("Verified profile defaults saved. Add public contact links in admin settings.");
