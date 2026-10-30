import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBookingForm, generateWhatsAppBookingUrl, BUSINESS_PHONE } from './booking';

test('validateBookingForm rejects invalid phone and empty fields', () => {
  const invalid = validateBookingForm({
    customerName: '',
    phone: '123',
    siteLocation: '',
    workDate: '',
    workersCount: 0
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.customerName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.siteLocation);
  assert.ok(invalid.errors.workDate);
  assert.ok(invalid.errors.workersCount);
});

test('validateBookingForm accepts valid booking details', () => {
  const valid = validateBookingForm({
    customerName: 'Aaqib Bhat',
    phone: '+91 60064 13495',
    siteLocation: 'Lal Chowk, Srinagar',
    workDate: '2026-11-02',
    workersCount: 3
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateWhatsAppBookingUrl creates valid WhatsApp link with phone +916006413495', () => {
  const url = generateWhatsAppBookingUrl({
    id: 'ASIF-9912',
    customerName: 'Bilal Reshi',
    phone: '9419123456',
    serviceName: 'General Construction & Site Labour',
    workersCount: 4,
    durationType: 'full_day',
    workDate: '2026-10-31',
    timeSlot: '08:30 AM',
    siteLocation: 'Ganderbal Road',
    estimatedPrice: 2600
  });

  assert.ok(url.startsWith(`https://wa.me/${BUSINESS_PHONE}?text=`));
  assert.ok(url.includes('ASIF-9912'));
  assert.ok(url.includes('Bilal%20Reshi'));
});
