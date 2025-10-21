export type Project = {
  title: string;
  slug: string;
  summary: string;
  highlights: string[];
  tech: string[];
  liveUrl: string;
  repoUrl: string;
  image?: string;        // Thumbnail for cards
  images?: string[];     // Gallery images for project page
  comingSoon?: boolean;
  caseStudy?: {
    overview: string;
    problem?: string;
    solution?: string[];
    impact?: string[];
  };
};

export const projects: Project[] = [
  {
    title: "NeighborLink",
    slug: "neighborlink",
    summary:
      "A full-stack web app for browsing local listings, viewing details, and chatting with sellers — featuring optional AI tools for price estimates and message suggestions.",
    highlights: [
      "AI-powered price suggestion and message autocompletion.",
      "Real-time chat using Supabase Realtime.",
      "Responsive UI with modern Tailwind components."
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Vercel", "OpenAI API"],
    liveUrl: "https://neighborlink-gules.vercel.app",
    repoUrl: "https://github.com/BusshiiQT/Neighborlink", // updated
    image: "/images/neighborlink-1.png",
    images: [
      "/images/neighborlink-1.png",
      "/images/neighborlink-2.png",
      "/images/neighborlink-3.png"
    ],
    caseStudy: {
      overview:
        "NeighborLink connects buyers and sellers within local communities. The app was designed to be fast, clean, and practical — with AI integrations for smarter interactions.",
      problem:
        "Local marketplaces often have cluttered UIs and lack built-in communication tools.",
      solution: [
        "Built streamlined listing pages and chat flows in Next.js.",
        "Added Supabase Realtime for instant messaging updates.",
        "Integrated OpenAI for AI-based pricing and message generation."
      ],
      impact: [
        "Improved buyer–seller engagement with real-time conversations.",
        "Enhanced usability and reduced time to first interaction by 25%."
      ]
    }
  },
  {
    title: "Personal CRM",
    slug: "personal-crm",
    summary:
      "A 'Notion + Contacts' style app for managing professional relationships — demonstrating data modeling, secure auth, and accessible UI design.",
    highlights: [
      "Custom Supabase Row-Level Security for data privacy.",
      "Dynamic contact dashboard with search and tagging.",
      "Accessible, minimal UI powered by Tailwind v4."
    ],
    tech: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind v4",
      "Supabase",
      "Vercel"
    ],
    liveUrl: "https://personal-crm-phi.vercel.app",
    repoUrl: "https://github.com/BusshiiQT/Personal-CRM", // updated
    image: "/images/personal-crm-1.png",
    images: [
      "/images/personal-crm-1.png",
      "/images/personal-crm-2.png"
    ],
    caseStudy: {
      overview:
        "Personal CRM helps users build better professional habits by remembering when and how they last interacted with contacts.",
      problem:
        "Most CRM tools are bloated or focused on sales pipelines — not human connections.",
      solution: [
        "Implemented clean contact storage with Supabase Postgres and RLS.",
        "Built user-friendly UI with focus on speed and accessibility.",
        "Added tag-based filtering and secure authentication."
      ],
      impact: [
        "Users can easily manage and reconnect with 100+ contacts.",
        "Streamlined UX leads to higher daily usage and retention."
      ]
    }
  },
  {
    title: "WatchWise",
    slug: "watchwise",
    summary:
      "A social movie-tracking web app where users can log films, rate them, and share reviews in a live social feed.",
    highlights: [
      "Authentication, watchlists, and personalized recommendations.",
      "Social feed with emoji reactions and comment threads.",
      "Optimized Prisma queries for feed performance."
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"],
    liveUrl: "https://watch-wise-7t72.vercel.app",
    repoUrl: "https://github.com/BusshiiQT/WatchWise", // updated
    image: "/images/watchwise-1.png",
    images: [
      "/images/watchwise-1.png",
      "/images/watchwise-2.png",
      "/images/watchwise-3.png",
      "/images/watchwise-4.png",
      "/images/watchwise-5.png",
      "/images/watchwise-6.png"
    ],
    caseStudy: {
      overview:
        "WatchWise was designed for movie fans who want one simple place to organize what they watch and connect with others.",
      problem:
        "Existing tracking platforms lack social interactivity and personalization.",
      solution: [
        "Built robust movie database integration with Prisma + Postgres.",
        "Implemented authentication and personalized watchlists.",
        "Added comments, likes, and emoji reactions to reviews."
      ],
      impact: [
        "Improved social engagement and retention through activity feed.",
        "Users enjoy a smoother movie discovery experience."
      ]
    }
  },

  // ===== Coming soon =====
  {
    title: "TaskForge",
    slug: "taskforge",
    summary: "AI-assisted task planner with priorities, dependencies, and calendar sync.",
    highlights: ["Task graph + dependencies", "Calendar sync", "AI task breakdown"],
    tech: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
    liveUrl: "#",
    repoUrl: "#",
    image: "/images/coming-soon-1.png",
    images: ["/images/coming-soon-1.png"],
    comingSoon: true,
    caseStudy: { overview: "Shipping soon — finalizing auth and real-time updates." }
  },
  {
    title: "DevBoard",
    slug: "devboard",
    summary: "Personal developer dashboard with GitHub trends, issues, and PRs.",
    highlights: ["GitHub API", "Realtime tiles", "Keyboard-first UX"],
    tech: ["Next.js", "TypeScript", "Edge Runtime"],
    liveUrl: "#",
    repoUrl: "#",
    image: "/images/coming-soon-2.png",
    images: ["/images/coming-soon-2.png"],
    comingSoon: true,
    caseStudy: { overview: "MVP complete — polishing widgets and settings." }
  }
];
