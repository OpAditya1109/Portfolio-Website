export const PROJECTS = [
  {
    emoji: "🔐",
    name: "Secura Pay",
    stack: "React.js · Node.js · Solana · MongoDB",
    desc: "UPI-like decentralised payment system using Solana smart contracts. Wallet-based login, secure transactions, live crypto prices via CoinGecko API.",
    tags: ["Blockchain", "Solana", "MERN"],
  },
  {
    emoji: "🔮",
    name: "AstroBhavana",
    stack: "MERN Stack · Cashfree Payments · Socket.io",
    desc: "Full-stack astrology consultation platform with live chat, call & video. Cashfree payment gateway, real-time notifications and WhatsApp reminders.",
    tags: ["Full-Stack", "Payments", "Real-time"],
  },
  {
    emoji: "🍽",
    name: "Queue Management System",
    stack: "React.js · Node.js · Express · MongoDB",
    desc: "Multi-restaurant queue platform with real-time customer tracking. Restaurant dashboard for queue stats, profile management & SMS alerts.",
    tags: ["Real-time", "MERN", "Dashboard"],
  },
  {
    emoji: "☁️",
    name: "CloudDrive",
    stack: "MERN Stack · AWS S3 · JWT · Multer",
    desc: "Cloud-based storage platform for file uploads with user auth. AWS S3 for secure file handling, chunked uploads & access permissions.",
    tags: ["AWS", "Cloud", "Storage"],
  },
  {
    emoji: "🤖",
    name: "Chat with AI",
    stack: "MERN Stack · Socket.io · Gemini API",
    desc: "Real-time chatbot with Google Gemini integration. Typing indicators, emoji support, and multi-user chat via WebSockets.",
    tags: ["AI", "WebSockets", "Gemini"],
  },
  {
    emoji: "🥔",
    name: "LAY'S Website Clone",
    stack: "HTML · CSS · JavaScript · GSAP",
    desc: "Pixel-perfect LAY'S brand site replica with smooth GSAP scroll animations. Ranked top 100 of 1000+ teams in national hackathon.",
    tags: ["GSAP", "Hackathon", "Animation"],
  },
];

export const SKILLS_DATA = [
  {
    cat: "Frontend",
    color: "#818cf8",
    items: [["React.js", 95], ["Next.js", 88], ["TypeScript", 82], ["Tailwind CSS", 90]] as [string, number][],
  },
  {
    cat: "Backend",
    color: "#34d399",
    items: [["Node.js", 90], ["Express.js", 88], ["MongoDB", 85], ["REST APIs", 92]] as [string, number][],
  },
  {
    cat: "Cloud & DevOps",
    color: "#f59e0b",
    items: [["AWS (EC2/S3)", 80], ["Docker", 72], ["Git", 90], ["Lambda", 70]] as [string, number][],
  },
  {
    cat: "Other",
    color: "#f472b6",
    items: [["Solana/Web3", 75], ["Socket.io", 85], ["Shopify/Liquid", 80], ["WordPress", 72]] as [string, number][],
  },
];

export const EXPERIENCE = [
  {
    emoji: "🛍",
    name: "Shopify Developer — Hempbuti",
    stack: "Shopify · Liquid · Tailwind CSS · JavaScript",
    desc: "Developed and customised a Shopify store for a skincare brand. Configured collections, product pages, responsive layouts. Optimised SEO and storefront speed.",
    tags: ["Shopify", "Freelance", "Aug 2024"],
  },
  {
    emoji: "🛒",
    name: "Shopify Developer — Wellbi",
    stack: "Shopify · Liquid · JavaScript · Bluedart API",
    desc: "Implemented a custom preorder system without paid apps. WhatsApp notifications for confirmations, real-time order tracking via Bluedart API.",
    tags: ["Shopify", "Freelance", "May 2024"],
  },
  {
    emoji: "💻",
    name: "WordPress Developer — Unitglo",
    stack: "WordPress · Tailwind CSS · JavaScript",
    desc: "Improved UI, animations, and performance of store.robokidz.co.in. Built responsive pages, optimised speed and SEO structure.",
    tags: ["WordPress", "Company", "Oct–Dec 2025"],
  },
  {
    emoji: "☁️",
    name: "Data Engineering Intern — AWS Forage",
    stack: "AWS Glue · S3 · Redshift · Lambda · IAM",
    desc: "Built data pipelines using AWS cloud services. Configured IAM roles, automated ETL workflows for structured data.",
    tags: ["AWS", "Virtual", "Jan 2025"],
  },
];
