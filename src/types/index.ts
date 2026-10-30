export type ServiceCategory = 'labour' | 'carpentry' | 'turnkey';

export interface SkillBadge {
  label: string;
  type: 'safety' | 'experience' | 'credential' | 'specialty';
  highlight?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  headline: string;
  description: string;
  startingPrice: number;
  priceUnit: string;
  features: string[];
  recommendedTeam: string;
  toolsIncluded: string[];
  skillBadges: SkillBadge[];
  popular?: boolean;
}

export type DurationType = 'half_day' | 'full_day' | 'custom_days';

export interface PricingCalculation {
  basePerWorkerPerDay: number;
  workersCount: number;
  daysCount: number;
  durationType: DurationType;
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  urgentFee: number;
  toolsFee: number;
  totalEstimatedPrice: number;
  pricePerWorkerFinal: number;
}

export interface BookingRequest {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  siteLocation: string;
  serviceId: string;
  serviceName: string;
  workersCount: number;
  durationType: DurationType;
  daysCount: number;
  workDate: string;
  timeSlot: string;
  includeTools: boolean;
  isUrgent: boolean;
  specialNotes?: string;
  estimatedPrice: number;
  status: 'Confirmed' | 'Assigned' | 'In Progress' | 'Completed';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  workersDeployed: number;
  duration: string;
  description: string;
  highlights: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  rating: number;
  review: string;
  serviceUsed: string;
  date: string;
}
