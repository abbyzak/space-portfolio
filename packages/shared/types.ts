export interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  duration: number; // in minutes
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  slotId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company?: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'other';
  image: string;
  level: number; // 1-100
  createdAt: string;
  updatedAt: string;
}