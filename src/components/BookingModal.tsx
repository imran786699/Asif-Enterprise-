import React, { useState, useEffect } from 'react';
import { SERVICES, BUSINESS_INFO } from '../data/servicesData';
import { BookingRequest, DurationType } from '../types';
import { calculateEstimate, formatINR } from '../utils/pricing';
import {
  validateBookingForm,
  generateBookingReference,
  generateWhatsAppBookingUrl,
  saveBooking
} from '../utils/booking';
import { X, CheckCircle2, Phone, MessageSquare, Calendar, MapPin, Users, Clock, ShieldCheck, Hammer } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
  initialData?: {
    serviceId?: string;
    workersCount?: number;
    durationType?: DurationType;
    daysCount?: number;
    includeTools?: boolean;
    isUrgent?: boolean;
    estimatedPrice?: number;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingSuccess,
  initialData
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [serviceId, setServiceId] = useState(initialData?.serviceId || SERVICES[0].id);
  const [workersCount, setWorkersCount] = useState(initialData?.workersCount || 2);
  const [durationType, setDurationType] = useState<DurationType>(initialData?.durationType || 'full_day');
  const [daysCount, setDaysCount] = useState(initialData?.daysCount || 1);
  const [workDate, setWorkDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('08:30 AM - Morning Shift');
  const [includeTools, setIncludeTools] = useState(initialData?.includeTools ?? true);
  const [isUrgent, setIsUrgent] = useState(initialData?.isUrgent ?? false);
  const [specialNotes, setSpecialNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

  // Sync initialData if it changes
  useEffect(() => {
    if (initialData?.serviceId) setServiceId(initialData.serviceId);
    if (initialData?.workersCount) setWorkersCount(initialData.workersCount);
    if (initialData?.durationType) setDurationType(initialData.durationType);
    if (initialData?.daysCount) setDaysCount(initialData.daysCount);
    if (initialData?.includeTools !== undefined) setIncludeTools(initialData.includeTools);
    if (initialData?.isUrgent !== undefined) setIsUrgent(initialData.isUrgent);
  }, [initialData]);

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSubmittedBooking(null);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  const calculatedQuote = calculateEstimate({
    baseDailyPrice: currentService.startingPrice,
    workersCount,
    durationType,
    daysCount: durationType === 'custom_days' ? daysCount : 1,
    includeTools,
    isUrgent
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBookingForm({
      customerName,
      phone,
      siteLocation,
      workDate,
      workersCount
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newBooking: BookingRequest = {
      id: generateBookingReference(),
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      phone: phone.trim(),
      siteLocation: siteLocation.trim(),
      serviceId,
      serviceName: currentService.name,
      workersCount,
      durationType,
      daysCount: durationType === 'custom_days' ? daysCount : 1,
      workDate,
      timeSlot,
      includeTools,
      isUrgent,
      specialNotes: specialNotes.trim(),
      estimatedPrice: calculatedQuote.totalEstimatedPrice,
      status: 'Confirmed'
    };

    saveBooking(newBooking);
    setSubmittedBooking(newBooking);
    onBookingSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-amber-400" />
            <h2 id="booking-modal-title" className="text-lg font-bold text-white">
              {submittedBooking ? 'Booking Confirmed' : 'Book Labours & Carpenters'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submittedBooking ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Workforce Request Registered!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{submittedBooking.customerName}</strong>. Your booking reference is{' '}
                <span className="text-amber-400 font-mono font-bold text-base">#{submittedBooking.id}</span>.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Service:</span>
                <span className="font-semibold text-white">{submittedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Team Size:</span>
                <span className="font-semibold text-white">{submittedBooking.workersCount} Workers</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="font-semibold text-white">{submittedBooking.workDate} ({submittedBooking.timeSlot})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white">{submittedBooking.siteLocation}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Estimated Total:</span>
                <span className="text-base font-extrabold text-amber-400">
                  {formatINR(submittedBooking.estimatedPrice)}
                </span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppBookingUrl(submittedBooking)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Send Booking to Asif via WhatsApp</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Directly: {BUSINESS_INFO.displayPhone}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
            {/* Service & Workers Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-service" className="block text-xs font-semibold text-slate-300 mb-1">
                  Required Service *
                </label>
                <select
                  id="modal-service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({formatINR(s.startingPrice)}/d)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-workers" className="block text-xs font-semibold text-slate-300 mb-1">
                  Number of Workers *
                </label>
                <input
                  id="modal-workers"
                  type="number"
                  min="1"
                  max="50"
                  value={workersCount}
                  onChange={(e) => setWorkersCount(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                {errors.workersCount && <p className="text-[11px] text-rose-400 mt-1">{errors.workersCount}</p>}
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer-name" className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  placeholder="e.g. Tariq Ahmad"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors({ ...errors, customerName: '' });
                  }}
                  className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none ${
                    errors.customerName ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.customerName && <p className="text-[11px] text-rose-400 mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label htmlFor="customer-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  placeholder="e.g. 6006413495"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none ${
                    errors.phone ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Site Address */}
            <div>
              <label htmlFor="site-location" className="block text-xs font-semibold text-slate-300 mb-1">
                Work Location / Site Address *
              </label>
              <input
                id="site-location"
                type="text"
                placeholder="e.g. House #14, Sector 2, Sanat Nagar, Srinagar"
                value={siteLocation}
                onChange={(e) => {
                  setSiteLocation(e.target.value);
                  if (errors.siteLocation) setErrors({ ...errors, siteLocation: '' });
                }}
                className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none ${
                  errors.siteLocation ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                }`}
              />
              {errors.siteLocation && <p className="text-[11px] text-rose-400 mt-1">{errors.siteLocation}</p>}
            </div>

            {/* Date and Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="work-date" className="block text-xs font-semibold text-slate-300 mb-1">
                  Preferred Work Date *
                </label>
                <input
                  id="work-date"
                  type="date"
                  value={workDate}
                  onChange={(e) => {
                    setWorkDate(e.target.value);
                    if (errors.workDate) setErrors({ ...errors, workDate: '' });
                  }}
                  className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-xs text-white focus:outline-none ${
                    errors.workDate ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.workDate && <p className="text-[11px] text-rose-400 mt-1">{errors.workDate}</p>}
              </div>

              <div>
                <label htmlFor="time-slot" className="block text-xs font-semibold text-slate-300 mb-1">
                  Time Slot / Timing
                </label>
                <select
                  id="time-slot"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="08:30 AM - Morning Shift">08:30 AM - Standard Morning</option>
                  <option value="10:00 AM - Mid Morning">10:00 AM - Mid Morning</option>
                  <option value="01:30 PM - Afternoon Slot">01:30 PM - Afternoon Slot</option>
                  <option value="Immediate Express (within 2h)">Immediate Express (within 2 Hours)</option>
                  <option value="Night Shift (08:00 PM)">Night Shift (08:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Duration Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Shift Duration</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDurationType('half_day')}
                  className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                    durationType === 'half_day'
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-700'
                  }`}
                >
                  Half Day (4h)
                </button>
                <button
                  type="button"
                  onClick={() => setDurationType('full_day')}
                  className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                    durationType === 'full_day'
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-700'
                  }`}
                >
                  Full Day (8h)
                </button>
                <button
                  type="button"
                  onClick={() => setDurationType('custom_days')}
                  className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                    durationType === 'custom_days'
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-700'
                  }`}
                >
                  Multi-Day
                </button>
              </div>

              {durationType === 'custom_days' && (
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xs text-slate-300">Total Days:</span>
                  <input
                    type="number"
                    min="2"
                    max="60"
                    value={daysCount}
                    onChange={(e) => setDaysCount(parseInt(e.target.value, 10) || 2)}
                    className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                  />
                </div>
              )}
            </div>

            {/* Addons */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTools}
                  onChange={(e) => setIncludeTools(e.target.checked)}
                  className="rounded accent-amber-400"
                />
                <span>Include Power/Site Tools (+₹150/worker)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded accent-amber-400"
                />
                <span className="text-amber-400 font-medium">Urgent Express Dispatch (+15%)</span>
              </label>
            </div>

            {/* Special Instructions */}
            <div>
              <label htmlFor="special-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                Special Instructions / Work Scope (Optional)
              </label>
              <textarea
                id="special-notes"
                rows={2}
                placeholder="e.g. Bring 2 hammers and cutting saw. 3rd floor without lift."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Estimated Total Bar */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400">Estimated Total</p>
                <p className="text-lg font-bold text-amber-400">
                  {formatINR(calculatedQuote.totalEstimatedPrice)}
                </p>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <p>Aadhaar Verified Staff</p>
                <p className="text-emerald-400 font-semibold">2h Replacement Guarantee</p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              Confirm Booking Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
