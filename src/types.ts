export type PageTab = 'home' | 'services' | 'studio' | 'contact';

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  category: 'performance' | 'creative' | 'technology' | 'strategy';
  description: string;
  deliverables: string[];
  metrics: string;
  recommendedFor: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    stat: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
}
