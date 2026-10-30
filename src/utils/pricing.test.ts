import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, formatINR } from './pricing';

test('formatINR formats currency in Indian locale', () => {
  assert.equal(formatINR(1200), '₹1,200');
  assert.equal(formatINR(650), '₹650');
  assert.equal(formatINR(15000), '₹15,000');
});

test('calculateEstimate calculates single worker full day accurately with base rate 900', () => {
  const result = calculateEstimate({
    baseDailyPrice: 900,
    workersCount: 1,
    durationType: 'full_day'
  });

  assert.equal(result.subtotal, 900);
  assert.equal(result.discountPercentage, 0);
  assert.equal(result.discountAmount, 0);
  assert.equal(result.totalEstimatedPrice, 900);
  assert.equal(formatINR(result.totalEstimatedPrice), '₹900');
});

test('calculateEstimate applies half day factor (0.65)', () => {
  const result = calculateEstimate({
    baseDailyPrice: 1000,
    workersCount: 2,
    durationType: 'half_day'
  });

  assert.equal(result.subtotal, 1300);
  assert.equal(result.totalEstimatedPrice, 1300);
});

test('calculateEstimate applies bulk discounts for 5+ and 10+ workers', () => {
  // 5 workers: 5% discount
  const res5 = calculateEstimate({
    baseDailyPrice: 1000,
    workersCount: 5,
    durationType: 'full_day'
  });
  assert.equal(res5.subtotal, 5000);
  assert.equal(res5.discountPercentage, 5);
  assert.equal(res5.discountAmount, 250);
  assert.equal(res5.totalEstimatedPrice, 4750);

  // 10 workers: 10% discount
  const res10 = calculateEstimate({
    baseDailyPrice: 1000,
    workersCount: 10,
    durationType: 'full_day'
  });
  assert.equal(res10.subtotal, 10000);
  assert.equal(res10.discountPercentage, 10);
  assert.equal(res10.discountAmount, 1000);
  assert.equal(res10.totalEstimatedPrice, 9000);
});

test('calculateEstimate adds tool fee and urgent fee correctly', () => {
  const result = calculateEstimate({
    baseDailyPrice: 800,
    workersCount: 2,
    durationType: 'full_day',
    includeTools: true,
    isUrgent: true
  });

  // subtotal = 1600
  // discount = 0
  // toolsFee = 2 * 150 * 1 = 300
  // urgentFee = 1600 * 0.15 = 240
  // total = 1600 + 300 + 240 = 2140
  assert.equal(result.subtotal, 1600);
  assert.equal(result.toolsFee, 300);
  assert.equal(result.urgentFee, 240);
  assert.equal(result.totalEstimatedPrice, 2140);
});
