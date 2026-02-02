export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  priceRange?: string;
  duration?: string;
  image: string;
  icon?: string;
  bestSeller?: boolean;
  category: 'regular' | 'special';
  items?: ServiceItem[];
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface CleaningStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}
