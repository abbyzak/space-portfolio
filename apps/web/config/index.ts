import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "TechCorp Solutions | Leading Technology Company",
  description: "We are a cutting-edge technology company specializing in web development, mobile applications, and digital transformation solutions.",
  keywords: [
    "technology company",
    "web development",
    "mobile development",
    "digital transformation",
    "software solutions",
    "react",
    "nextjs",
    "nodejs",
    "cloud solutions",
    "ui/ux design",
    "consulting",
    "enterprise solutions",
  ] as Array<string>,
  authors: {
    name: "TechCorp Solutions",
    url: "https://techcorp.com",
  },
} as const;