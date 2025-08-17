import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type {
  Company,
  Service,
  Project,
  TeamMember,
  BookingSlot,
  Booking,
  Skill,
} from '@company-portfolio/shared';

const DB_PATH = path.join(process.cwd(), 'data');

interface Database {
  company: Company;
  services: Service[];
  projects: Project[];
  team: TeamMember[];
  bookingSlots: BookingSlot[];
  bookings: Booking[];
  skills: Skill[];
}

class JsonDatabase {
  private dbPath: string;

  constructor() {
    this.dbPath = DB_PATH;
    this.ensureDbExists();
  }

  private async ensureDbExists() {
    await fs.ensureDir(this.dbPath);
    
    const files = [
      'company.json',
      'services.json',
      'projects.json',
      'team.json',
      'bookingSlots.json',
      'bookings.json',
      'skills.json',
    ];

    for (const file of files) {
      const filePath = path.join(this.dbPath, file);
      if (!(await fs.pathExists(filePath))) {
        const defaultData = file === 'company.json' ? {} : [];
        await fs.writeJson(filePath, defaultData, { spaces: 2 });
      }
    }
  }

  private async readFile<T>(filename: string): Promise<T> {
    const filePath = path.join(this.dbPath, filename);
    return await fs.readJson(filePath);
  }

  private async writeFile<T>(filename: string, data: T): Promise<void> {
    const filePath = path.join(this.dbPath, filename);
    await fs.writeJson(filePath, data, { spaces: 2 });
  }

  // Company methods
  async getCompany(): Promise<Company | null> {
    try {
      const company = await this.readFile<Company>('company.json');
      return Object.keys(company).length > 0 ? company : null;
    } catch {
      return null;
    }
  }

  async updateCompany(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const existing = await this.getCompany();
    const now = new Date().toISOString();
    
    const updatedCompany: Company = {
      ...company,
      id: existing?.id || uuidv4(),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    await this.writeFile('company.json', updatedCompany);
    return updatedCompany;
  }

  // Generic CRUD methods
  async getAll<T>(collection: keyof Omit<Database, 'company'>): Promise<T[]> {
    return await this.readFile<T[]>(`${collection}.json`);
  }

  async getById<T extends { id: string }>(collection: keyof Omit<Database, 'company'>, id: string): Promise<T | null> {
    const items = await this.getAll<T>(collection);
    return items.find(item => item.id === id) || null;
  }

  async create<T extends { id: string; createdAt: string; updatedAt: string }>(
    collection: keyof Omit<Database, 'company'>,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<T> {
    const items = await this.getAll<T>(collection);
    const now = new Date().toISOString();
    
    const newItem = {
      ...data,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    } as T;

    items.push(newItem);
    await this.writeFile(`${collection}.json`, items);
    return newItem;
  }

  async update<T extends { id: string; createdAt: string; updatedAt: string }>(
    collection: keyof Omit<Database, 'company'>,
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<T | null> {
    const items = await this.getAll<T>(collection);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;

    const updatedItem = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    items[index] = updatedItem;
    await this.writeFile(`${collection}.json`, items);
    return updatedItem;
  }

  async delete<T extends { id: string }>(collection: keyof Omit<Database, 'company'>, id: string): Promise<boolean> {
    const items = await this.getAll<T>(collection);
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;

    await this.writeFile(`${collection}.json`, filteredItems);
    return true;
  }

  // Booking-specific methods
  async getAvailableSlots(date?: string): Promise<BookingSlot[]> {
    const slots = await this.getAll<BookingSlot>('bookingSlots');
    let availableSlots = slots.filter(slot => slot.available);
    
    if (date) {
      availableSlots = availableSlots.filter(slot => slot.date === date);
    }
    
    return availableSlots;
  }

  async bookSlot(slotId: string, bookingData: Omit<Booking, 'id' | 'slotId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Booking | null> {
    const slot = await this.getById<BookingSlot>('bookingSlots', slotId);
    
    if (!slot || !slot.available) return null;

    // Mark slot as unavailable
    await this.update<BookingSlot>('bookingSlots', slotId, { available: false });

    // Create booking
    const booking = await this.create<Booking>('bookings', {
      ...bookingData,
      slotId,
      status: 'pending',
    });

    return booking;
  }
}

export const db = new JsonDatabase();