import { db } from './db';
import type { Service, Project, TeamMember, BookingSlot, Skill } from '@company-portfolio/shared';

export async function seedDatabase() {
  // Seed company data
  await db.updateCompany({
    name: "TechCorp Solutions",
    description: "We are a cutting-edge technology company specializing in web development, mobile applications, and digital transformation solutions. Our team of expert developers and designers work together to create innovative solutions that drive business growth.",
    logo: "/logo.png",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94000",
    website: "https://techcorp.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/techcorp",
      twitter: "https://twitter.com/techcorp",
      github: "https://github.com/techcorp",
      instagram: "https://instagram.com/techcorp",
    },
  });

  // Seed services
  const services: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies like React, Next.js, and Node.js",
      icon: "🌐",
      features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "Modern Frameworks"],
      price: "Starting at $5,000",
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: "📱",
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
      price: "Starting at $8,000",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions",
      icon: "☁️",
      features: ["AWS/Azure/GCP", "DevOps", "CI/CD Pipelines", "Monitoring"],
      price: "Starting at $3,000",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces and experiences",
      icon: "🎨",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      price: "Starting at $2,500",
    },
  ];

  for (const service of services) {
    await db.create<Service>('services', service);
  }

  // Seed projects
  const projects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform built with Next.js, featuring real-time inventory management, payment processing, and advanced analytics.",
      image: "/projects/project-1.png",
      link: "https://example-ecommerce.com",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      category: "Web Development",
      featured: true,
    },
    {
      title: "Healthcare Mobile App",
      description: "A comprehensive healthcare mobile application that connects patients with healthcare providers, featuring appointment booking and telemedicine capabilities.",
      image: "/projects/project-2.png",
      link: "https://example-healthcare.com",
      technologies: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      category: "Mobile Development",
      featured: true,
    },
    {
      title: "Financial Dashboard",
      description: "A sophisticated financial dashboard for investment management with real-time data visualization and portfolio tracking.",
      image: "/projects/project-3.png",
      link: "https://example-finance.com",
      technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
      category: "Web Development",
      featured: false,
    },
  ];

  for (const project of projects) {
    await db.create<Project>('projects', project);
  }

  // Seed team members
  const teamMembers: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      bio: "Visionary leader with 15+ years of experience in technology and business development. Passionate about creating innovative solutions that make a difference.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "sarah@techcorp.com",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
      },
      skills: ["Leadership", "Strategy", "Business Development", "Product Management"],
    },
    {
      name: "Michael Chen",
      position: "CTO",
      bio: "Full-stack developer and technology architect with expertise in scalable web applications and cloud infrastructure.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "michael@techcorp.com",
      socialLinks: {
        linkedin: "https://linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen",
      },
      skills: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
    },
    {
      name: "Emily Rodriguez",
      position: "Lead Designer",
      bio: "Creative designer specializing in user experience and interface design. Believes in the power of design to solve complex problems.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "emily@techcorp.com",
      socialLinks: {
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        twitter: "https://twitter.com/emilyrodriguez",
      },
      skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping"],
    },
  ];

  for (const member of teamMembers) {
    await db.create<TeamMember>('team', member);
  }

  // Seed booking slots
  const bookingSlots: Omit<BookingSlot, 'id' | 'createdAt' | 'updatedAt'>[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Add slots for each day (9 AM to 5 PM, 1-hour slots)
    for (let hour = 9; hour < 17; hour++) {
      bookingSlots.push({
        date: dateString,
        time: `${hour.toString().padStart(2, '0')}:00`,
        duration: 60,
        available: true,
      });
    }
  }

  for (const slot of bookingSlots) {
    await db.create<BookingSlot>('bookingSlots', slot);
  }

  // Seed skills
  const skills: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>[] = [
    { name: "React", category: "frontend", image: "react.png", level: 95 },
    { name: "Next.js", category: "frontend", image: "next.png", level: 90 },
    { name: "TypeScript", category: "frontend", image: "ts.png", level: 88 },
    { name: "Tailwind CSS", category: "frontend", image: "tailwind.png", level: 92 },
    { name: "Node.js", category: "backend", image: "node.png", level: 85 },
    { name: "PostgreSQL", category: "backend", image: "postgresql.png", level: 80 },
    { name: "MongoDB", category: "backend", image: "mongodb.png", level: 82 },
    { name: "Docker", category: "fullstack", image: "docker.png", level: 75 },
    { name: "AWS", category: "other", image: "aws.png", level: 78 },
  ];

  for (const skill of skills) {
    await db.create<Skill>('skills', skill);
  }

  console.log('Database seeded successfully!');
}