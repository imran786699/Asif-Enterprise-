import { BookingRequest } from '../types';

export const BUSINESS_PHONE = '916006413495';
export const DISPLAY_PHONE = '+91 60064 13495';

export interface BookingValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateBookingForm(data: {
  customerName: string;
  phone: string;
  siteLocation: string;
  workDate: string;
  workersCount: number;
}): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name (minimum 2 characters)';
  }

  // Clean phone string to digits
  const cleanedPhone = (data.phone || '').replace(/[^0-9]/g, '');
  // Valid Indian mobile numbers are 10 digits or 12 digits (with 91 country code)
  if (!cleanedPhone || cleanedPhone.length < 10) {
    errors.phone = 'Please enter a valid 10-digit contact mobile number';
  }

  if (!data.siteLocation || data.siteLocation.trim().length < 3) {
    errors.siteLocation = 'Please provide work address / site location';
  }

  if (!data.workDate) {
    errors.workDate = 'Please select a preferred date for the work';
  }

  if (!data.workersCount || data.workersCount < 1) {
    errors.workersCount = 'Worker count must be at least 1';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function generateBookingReference(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `ASIF-${randomDigits}`;
}

export function generateWhatsAppBookingUrl(booking: {
  id: string;
  customerName: string;
  phone: string;
  serviceName: string;
  workersCount: number;
  durationType: string;
  daysCount?: number;
  workDate: string;
  timeSlot: string;
  siteLocation: string;
  estimatedPrice: number;
  isUrgent?: boolean;
  specialNotes?: string;
}): string {
  const durationLabel =
    booking.durationType === 'half_day'
      ? 'Half Day (4 Hours)'
      : booking.durationType === 'custom_days'
      ? `${booking.daysCount || 1} Days`
      : 'Full Day (8 Hours)';

  const urgencyText = booking.isUrgent ? '⚠️ URGENT DISPATCH REQUESTED (Within 2 Hours)' : 'Standard Scheduled Booking';

  const message = [
    `*NEW BOOKING REQUEST - ASIF ENTERPRISE*`,
    `Ref ID: #${booking.id}`,
    ``,
    `*Client Details:*`,
    `• Name: ${booking.customerName}`,
    `• Contact: ${booking.phone}`,
    `• Site Address: ${booking.siteLocation}`,
    ``,
    `*Work Requirements:*`,
    `• Service: ${booking.serviceName}`,
    `• Workers Required: ${booking.workersCount}`,
    `• Shift Duration: ${durationLabel}`,
    `• Date: ${booking.workDate}`,
    `• Time Slot: ${booking.timeSlot}`,
    `• Urgency: ${urgencyText}`,
    booking.specialNotes ? `• Notes: ${booking.specialNotes}` : '',
    ``,
    `*Estimated Total:* ₹${booking.estimatedPrice.toLocaleString('en-IN')}`,
    ``,
    `Please confirm worker availability and arrival time.`
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
}

export function generateDirectWhatsAppUrl(customText?: string): string {
  const defaultText =
    'Hello Asif Enterprise, I would like to inquire about booking labours / carpenters for my work.';
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(customText || defaultText)}`;
}

const STORAGE_KEY = 'asif_enterprise_bookings_v1';

export function getStoredBookings(): BookingRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getInitialDemoBookings();
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : getInitialDemoBookings();
  } catch {
    return getInitialDemoBookings();
  }
}

export function saveBooking(booking: BookingRequest): void {
  try {
    const existing = getStoredBookings();
    const updated = [booking, ...existing.filter((b) => b.id !== booking.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save booking to localStorage:', err);
  }
}

function getInitialDemoBookings(): BookingRequest[] {
  return [
    {
      id: 'ASIF-4821',
      createdAt: '2026-10-28T09:30:00.000Z',
      customerName: 'Showkat Ahmad',
      phone: '+91 94190 12345',
      siteLocation: 'Sanat Nagar, Near Bypass',
      serviceId: 'modular-kitchen',
      serviceName: 'Modular Kitchen Installation & Fitment',
      workersCount: 2,
      durationType: 'full_day',
      daysCount: 2,
      workDate: '2026-10-30',
      timeSlot: '09:00 AM - Morning',
      includeTools: true,
      isUrgent: false,
      specialNotes: 'Plywood carcass already delivered on site',
      estimatedPrice: 5400,
      status: 'Assigned'
    }
  ];
}
