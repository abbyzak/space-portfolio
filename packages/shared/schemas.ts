import { z } from 'zod';

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Company name is required'),
  description: z.string().min(1, 'Description is required'),
  logo: z.string().url('Invalid logo URL'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  website: z.string().url('Invalid website URL'),
  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  features: z.array(z.string()),
  price: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL'),
  link: z.string().url('Invalid link URL'),
  technologies: z.array(z.string()),
  category: z.string().min(1, 'Category is required'),
  featured: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  bio: z.string().min(1, 'Bio is required'),
  image: z.string().url('Invalid image URL'),
  email: z.string().email('Invalid email'),
  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  skills: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BookingSlotSchema = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string(),
  duration: z.number().min(15).max(480),
  available: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BookingSchema = z.object({
  id: z.string(),
  slotId: z.string(),
  clientName: z.string().min(1, 'Name is required'),
  clientEmail: z.string().email('Invalid email'),
  clientPhone: z.string().min(1, 'Phone is required'),
  company: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['frontend', 'backend', 'fullstack', 'other']),
  image: z.string().min(1, 'Image is required'),
  level: z.number().min(1).max(100),
  createdAt: z.string(),
  updatedAt: z.string(),
});