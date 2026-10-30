import { DurationType, PricingCalculation } from '../types';

export interface EstimateInput {
  baseDailyPrice: number;
  workersCount: number;
  durationType: DurationType;
  daysCount?: number;
  includeTools?: boolean;
  isUrgent?: boolean;
}

export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  return '₹' + rounded.toLocaleString('en-IN');
}

export function calculateEstimate(input: EstimateInput): PricingCalculation {
  const workers = Math.max(1, Math.min(100, Math.round(input.workersCount || 1)));
  const days = Math.max(1, Math.round(input.daysCount || 1));
  const baseRate = Math.max(0, input.baseDailyPrice);

  let durationMultiplier = 1;
  let effectiveDays = 1;

  if (input.durationType === 'half_day') {
    durationMultiplier = 0.65;
    effectiveDays = 1;
  } else if (input.durationType === 'custom_days') {
    durationMultiplier = 1.0;
    effectiveDays = days;
  } else {
    // full_day
    durationMultiplier = 1.0;
    effectiveDays = 1;
  }

  const rawPerWorkerSubtotal = baseRate * durationMultiplier * effectiveDays;
  const rawTotal = rawPerWorkerSubtotal * workers;

  // Bulk discount rules:
  // 5 - 9 workers: 5% discount
  // 10+ workers: 10% discount
  let discountPercentage = 0;
  if (workers >= 10) {
    discountPercentage = 10;
  } else if (workers >= 5) {
    discountPercentage = 5;
  }

  const discountAmount = Math.round((rawTotal * discountPercentage) / 100);
  const discountedSubtotal = rawTotal - discountAmount;

  // Tools fee: ₹150 flat per worker for general tools supply
  const toolsFee = input.includeTools ? workers * 150 * effectiveDays : 0;

  // Urgent fee: 15% surcharge for rapid <2hr dispatch
  const urgentFee = input.isUrgent ? Math.round(discountedSubtotal * 0.15) : 0;

  const totalEstimatedPrice = Math.round(discountedSubtotal + toolsFee + urgentFee);
  const pricePerWorkerFinal = Math.round(totalEstimatedPrice / workers);

  return {
    basePerWorkerPerDay: baseRate,
    workersCount: workers,
    daysCount: effectiveDays,
    durationType: input.durationType,
    subtotal: Math.round(rawTotal),
    discountPercentage,
    discountAmount,
    urgentFee,
    toolsFee,
    totalEstimatedPrice,
    pricePerWorkerFinal
  };
}
