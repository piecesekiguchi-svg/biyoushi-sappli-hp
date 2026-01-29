export interface StylePoint {
  id: string;
  title: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  url: string;
}

export interface SalonStyle {
  id: string;
  name: string;
  imageUrl?: string;
  externalUrl?: string;
  description: string;
  points: StylePoint[];
  lessons?: Lesson[];
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  styles: SalonStyle[];
  imageUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  link?: string;
}

export type ViewLevel = 'CATEGORY_LIST' | 'STYLE_LIST' | 'STYLE_DETAIL' | 'MY_PAGE';

export enum GeminiModel {
  FLASH = 'gemini-3-flash-preview',
}