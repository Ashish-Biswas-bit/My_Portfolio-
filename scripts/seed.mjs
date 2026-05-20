/**
 * Seed script — pushes all static portfolio data into Firebase Firestore.
 * Run with:  node scripts/seed.mjs
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKOiNMY1oMX02nFjvEKpZA3_FUt5RKFrM",
  authDomain: "portfolio-7a849.firebaseapp.com",
  projectId: "portfolio-7a849",
  storageBucket: "portfolio-7a849.firebasestorage.app",
  messagingSenderId: "1081590432745",
  appId: "1:1081590432745:web:ef2674170e9784aa238178",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ─── Site Content (single documents) ─── */

const heroData = {
  name: "Ashish Biswas",
  roles: [
    "Full Stack Developer",
    "Desktop App Developer",
    "2D Game Developer",
    "UI/UX Enthusiast",
    "Creative Problem Solver",
  ],
  description:
    "I craft high-performance web applications, robust desktop software, and immersive 2D games — turning complex ideas into elegant, user-centric digital experiences.",
  cvUrl: "#about",
  avatarUrl: "",
  stats: [
    { label: "Projects", value: 10, suffix: "+" },
    { label: "Years Exp.", value: 3, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Happy Clients", value: 5, suffix: "+" },
  ],
};

const aboutData = {
  description:
    "I'm Ashish Biswas, a creative software developer passionate about building modern web applications, powerful desktop software, and engaging 2D games. I focus on performance, design, and innovative user experiences. With expertise spanning full-stack web development, desktop application development, and game development, I bring ideas to life through clean code and creative solutions. Every project I take on is an opportunity to push boundaries and deliver exceptional results.",
  avatarUrl: "",
  stats: [
    { label: "Projects", value: "10+" },
    { label: "Years Exp.", value: "3+" },
    { label: "Tech Stack", value: "5+" },
  ],
};

const settingsData = {
  email: "ashish@example.com",
  phone: "+880 1XXX-XXXXXX",
  whatsapp: "880",
  github: "https://github.com/ashishbiswas",
  linkedin: "https://linkedin.com/in/ashishbiswas",
  footerText:
    "Full Stack Developer crafting modern web applications, desktop software, and games with passion and precision.",
};

/* ─── Collections ─── */

const projects = [
  {
    title: "Wedding Planner System",
    description:
      "A comprehensive wedding planning management system with vendor management, guest RSVP tracking, budget analytics dashboard, and timeline scheduling. Features automated email reminders and printable reports.",
    tech: ["Java", "Swing", "MySQL", "JDBC"],
    category: "Desktop",
    image: "🎊",
    github: "#",
    live: "#",
    highlights: ["Role-based access", "PDF export", "Budget tracking"],
    order: 1,
  },
  {
    title: "Cake Shop E-commerce",
    description:
      "A full-featured e-commerce platform with product catalog, cart/checkout system, Stripe payments, order tracking, admin dashboard, and responsive design.",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Stripe"],
    category: "Web",
    image: "🎂",
    github: "#",
    live: "#",
    highlights: ["Payment integration", "Admin panel", "SEO optimized"],
    order: 2,
  },
  {
    title: "Bangladesh Quiz Game",
    description:
      "An educational quiz application featuring 500+ questions across history, geography, and culture categories with score leaderboards, timed challenges, and difficulty levels.",
    tech: ["Python", "Tkinter", "JSON", "SQLite"],
    category: "Desktop",
    image: "🇧🇩",
    github: "#",
    live: "#",
    highlights: ["500+ questions", "Leaderboard", "Multiple modes"],
    order: 3,
  },
  {
    title: "Game Hub",
    description:
      "A gaming platform featuring 5+ classic and original 2D games including Snake, Tetris, Space Invaders, and custom titles with a unified launcher, high-score system, and sound effects.",
    tech: ["Python", "Pygame", "OOP", "JSON"],
    category: "Game",
    image: "🎮",
    github: "#",
    live: "#",
    highlights: ["5+ games", "High scores", "Sound FX"],
    order: 4,
  },
  {
    title: "Student Hostel Management",
    description:
      "An end-to-end hostel management solution handling room allocation, fee collection with receipts, student attendance, complaint ticketing, and admin reporting.",
    tech: ["Python", "Tkinter", "SQLite", "ReportLab"],
    category: "Desktop",
    image: "🏫",
    github: "#",
    live: "#",
    highlights: ["Receipt generation", "Reporting", "Search & filter"],
    order: 5,
  },
  {
    title: "Portfolio Website",
    description:
      "This very portfolio — a futuristic 3D animated developer website built with Next.js, Three.js particle backgrounds, Framer Motion animations, and glassmorphism UI.",
    tech: ["Next.js", "Three.js", "Framer Motion", "Tailwind CSS"],
    category: "Web",
    image: "🌐",
    github: "#",
    live: "#",
    highlights: ["3D background", "Animations", "Responsive"],
    order: 6,
  },
];

const skills = [
  { name: "HTML", iconName: "SiHtml5", color: "#E34F26", level: 95, category: "Frontend", order: 1 },
  { name: "CSS", iconName: "SiCss", color: "#1572B6", level: 90, category: "Frontend", order: 2 },
  { name: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E", level: 88, category: "Frontend", order: 3 },
  { name: "Next.js", iconName: "SiNextdotjs", color: "#ffffff", level: 85, category: "Framework", order: 4 },
  { name: "Python", iconName: "SiPython", color: "#3776AB", level: 85, category: "Backend", order: 5 },
  { name: "Java", iconName: "FaJava", color: "#ED8B00", level: 80, category: "Backend", order: 6 },
  { name: "MongoDB", iconName: "SiMongodb", color: "#47A248", level: 82, category: "Database", order: 7 },
  { name: "PostgreSQL", iconName: "SiPostgresql", color: "#4169E1", level: 78, category: "Database", order: 8 },
  { name: "Game Dev", iconName: "FaGamepad", color: "#ff00ff", level: 75, category: "Specialty", order: 9 },
  { name: "Desktop Apps", iconName: "FaDesktop", color: "#00f5ff", level: 80, category: "Specialty", order: 10 },
];

const services = [
  {
    iconName: "FiGlobe",
    title: "Web Development",
    description: "Building responsive, performant web applications with modern frameworks like Next.js, React, and Tailwind CSS.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    gradient: "from-cyan-500 to-blue-500",
    order: 1,
  },
  {
    iconName: "FiMonitor",
    title: "Desktop App Development",
    description: "Creating powerful cross-platform desktop applications with intuitive interfaces and robust functionality.",
    tags: ["Java", "Python", "GUI"],
    gradient: "from-purple-500 to-pink-500",
    order: 2,
  },
  {
    iconName: "FaGamepad",
    title: "2D Game Development",
    description: "Designing and developing engaging 2D games with immersive gameplay mechanics and polished visuals.",
    tags: ["Pygame", "Game Design", "2D Graphics"],
    gradient: "from-pink-500 to-red-500",
    order: 3,
  },
  {
    iconName: "FiCpu",
    title: "API Integration",
    description: "Seamlessly integrating third-party APIs and building robust RESTful services for modern applications.",
    tags: ["REST API", "Integration", "Node.js"],
    gradient: "from-green-500 to-emerald-500",
    order: 4,
  },
  {
    iconName: "FiDatabase",
    title: "Database Architecture",
    description: "Designing efficient database schemas and implementing data solutions with MongoDB and PostgreSQL.",
    tags: ["MongoDB", "PostgreSQL", "Schema Design"],
    gradient: "from-orange-500 to-yellow-500",
    order: 5,
  },
];

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2024 - Present",
    description: "Building modern web applications with Next.js, React, and Tailwind CSS. Developing e-commerce platforms and dynamic web solutions.",
    skills: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    color: "#00f5ff",
    order: 1,
  },
  {
    role: "Desktop App Developer",
    company: "Self-employed",
    period: "2023 - 2024",
    description: "Created desktop applications using Java and Python. Developed management systems for real-world use cases.",
    skills: ["Java", "Python", "Swing", "Tkinter"],
    color: "#7b2ff7",
    order: 2,
  },
  {
    role: "2D Game Developer",
    company: "Personal Projects",
    period: "2023",
    description: "Developed 2D games using Pygame with engaging gameplay mechanics, scoring systems, and polished visual design.",
    skills: ["Python", "Pygame", "Game Design", "OOP"],
    color: "#ff00ff",
    order: 3,
  },
  {
    role: "Learning & Foundation",
    company: "Self-taught",
    period: "2022 - 2023",
    description: "Started the programming journey by learning foundational languages and building small projects to strengthen core concepts.",
    skills: ["HTML", "CSS", "JavaScript", "Python"],
    color: "#00d4ff",
    order: 4,
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Startup Founder",
    text: "Ashish delivered an outstanding e-commerce platform for our cake shop. His attention to detail and modern design sense really set our business apart. Highly recommended!",
    rating: 5,
    avatar: "SM",
    avatarUrl: "",
    color: "#00f5ff",
    order: 1,
  },
  {
    name: "Rahman Hossain",
    role: "Project Manager",
    text: "Working with Ashish on the hostel management system was a great experience. He understood our requirements perfectly and delivered a polished, bug-free application on time.",
    rating: 5,
    avatar: "RH",
    avatarUrl: "",
    color: "#7b2ff7",
    order: 2,
  },
  {
    name: "David Chen",
    role: "Game Studio Lead",
    text: "Ashish has a rare combination of technical skill and creative thinking. The Game Hub he built exceeded our expectations with smooth gameplay and clean architecture.",
    rating: 5,
    avatar: "DC",
    avatarUrl: "",
    color: "#ff00ff",
    order: 3,
  },
  {
    name: "Nadia Akter",
    role: "Education Director",
    text: "The Bangladesh Quiz Game that Ashish created has become a favorite learning tool in our institution. Interactive, educational, and beautifully designed.",
    rating: 5,
    avatar: "NA",
    avatarUrl: "",
    color: "#00d4ff",
    order: 4,
  },
];

const educationItems = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Chittagong",
    year: "2021 – 2025",
    description: "Focused on software engineering, algorithms, data structures, and web development. Actively participated in coding competitions and hackathons.",
    color: "#00f5ff",
    order: 1,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Govt. College, Chittagong",
    year: "2019 – 2021",
    description: "Science group with a strong foundation in mathematics and physics. Developed early interest in programming and logic.",
    color: "#7b2ff7",
    order: 2,
  },
];

const certifications = [
  { title: "Full Stack Web Development", issuer: "Udemy", year: "2023", color: "#ff00ff", order: 1 },
  { title: "Python for Data Science", issuer: "Coursera", year: "2023", color: "#00f5ff", order: 2 },
  { title: "Java Programming Masterclass", issuer: "Udemy", year: "2022", color: "#7b2ff7", order: 3 },
  { title: "React – The Complete Guide", issuer: "Udemy", year: "2023", color: "#00d4ff", order: 4 },
];

/* ─── Seed function ─── */

async function seed() {
  console.log("🌱 Seeding Firebase Firestore...\n");

  // Single documents
  console.log("  → siteContent/hero");
  await setDoc(doc(db, "siteContent", "hero"), heroData);

  console.log("  → siteContent/about");
  await setDoc(doc(db, "siteContent", "about"), aboutData);

  console.log("  → siteContent/settings");
  await setDoc(doc(db, "siteContent", "settings"), settingsData);

  // Collection helpers
  async function seedCollection(name, items) {
    for (const item of items) {
      const ref = await addDoc(collection(db, name), item);
      console.log(`  → ${name}/${ref.id}`);
    }
  }

  await seedCollection("projects", projects);
  await seedCollection("skills", skills);
  await seedCollection("services", services);
  await seedCollection("experience", experiences);
  await seedCollection("testimonials", testimonials);
  await seedCollection("education", educationItems);
  await seedCollection("certifications", certifications);

  console.log("\n✅ Seeding complete! All sample data is now in Firestore.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
