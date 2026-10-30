import React, { useState } from 'react';
import { SERVICES, BUSINESS_INFO } from '../data/servicesData';
import { DurationType, BookingRequest } from '../types';
import { calculateEstimate, formatINR } from '../utils/pricing';
import {
  validateBookingForm,
  generateBookingReference,
  generateWhatsAppBookingUrl,
  saveBooking,
  generateDirectWhatsAppUrl
} from '../utils/booking';
import {
  CalendarCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  HardHat,
  Send
} from 'lucide-react';
import { ClickToCopyPhone } from './ClickToCopyPhone';

interface ContactBookingSectionProps {
  onBookingCreated: () => void;
}

export const ContactBookingSection: React.FC<ContactBookingSectionProps> = ({ onBookingCreated }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [workersCount, setWorkersCount] = useState(2);
  const [durationType, setDurationType] = useState<DurationType>('full_day');
  const [daysCount, setDaysCount] = useState(1);
  const [workDate, setWorkDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('08:30 AM - Morning Shift');
  const [includeTools, setIncludeTools] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);

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
    onBookingCreated();
  };

  const resetForm = () => {
    setSubmittedBooking(null);
    setCustomerName('');
    setPhone('');
    setSiteLocation('');
    setSpecialNotes('');
    setErrors({});
  };

  return (
    <section id="book-online" className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <CalendarCheck className="w-4 h-4" />
            <span>Formal Requisition & Work Order</span>
            <span className="text-slate-600">/</span>
            <span>Direct Contractor Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Book Labours & Master Carpenters Online
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Submit your work order directly through our official website. All bookings receive prompt phone or WhatsApp confirmation from proprietor Asif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Enterprise Contact & Dispatch Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-900">
                <img
                  src={BUSINESS_INFO.proprietorDp}
                  alt="Asif"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== BUSINESS_INFO.proprietorFallbackDp) {
                      target.src = BUSINESS_INFO.proprietorFallbackDp;
                    }
                  }}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-400/60 shadow-md"
                />
                <div>
                  <h3 className="text-base font-bold text-white">Enterprise Helpdesk & Dispatch</h3>
                  <p className="text-xs text-amber-400 font-medium">
                    Asif (Proprietor & Principal Contractor)
                  </p>
                </div>
              </div>

              {/* Direct Hotlines */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide font-semibold block">
                      Direct Hotline & Telephone
                    </span>
                  </div>
                  <ClickToCopyPhone variant="card" />
                </div>

                <a
                  href={generateDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex items-center gap-3 transition-colors block"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide font-semibold block">WhatsApp Business Chat</span>
                    <span className="text-sm font-bold text-emerald-400">Chat with Asif Enterprise ↗</span>
                  </div>
                </a>
              </div>

              {/* Location & Operating Details */}
              <div className="pt-2 border-t border-slate-800/80 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Registered Workshop & Hub:</p>
                    <p className="text-slate-400">{BUSINESS_INFO.address}</p>
                    <a
                      href={BUSINESS_INFO.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 underline hover:text-amber-300 inline-block mt-0.5"
                    >
                      View on Google Maps ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Working Hours:</strong> {BUSINESS_INFO.workingHours}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Guarantee:</strong> 2-Hour Free Replacement & Transparent Billing</span>
                </div>
              </div>
            </div>

            {/* Turnkey Notice */}
            <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <HardHat className="w-4 h-4" />
                <span>Commercial Contractors & Builders</span>
              </div>
              <p>
                Need 10 to 50+ workers with an on-site supervisor for an ongoing construction or warehouse project? Call us directly at <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white font-bold underline">{BUSINESS_INFO.displayPhone}</a> for tailored tender contracts.
              </p>
            </div>
          </div>

          {/* Right Column: In-Page Booking Form */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
            {submittedBooking ? (
              /* Success Confirmation Card inside the page */
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Work Order Registered</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Thank You, {submittedBooking.customerName}!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
                    Your workforce request reference is <strong className="text-amber-400 font-mono text-base">#{submittedBooking.id}</strong>. We have logged your request.
                  </p>
                </div>

                {/* Summary Table */}
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-left text-xs sm:text-sm space-y-2.5 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Service:</span>
                    <span className="font-semibold text-white">{submittedBooking.serviceName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Personnel Deployed:</span>
                    <span className="font-semibold text-white">{submittedBooking.workersCount} Workers</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Work Date & Slot:</span>
                    <span className="font-semibold text-white">{submittedBooking.workDate} ({submittedBooking.timeSlot})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Site Address:</span>
                    <span className="font-semibold text-white line-clamp-1">{submittedBooking.siteLocation}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Estimated Total:</span>
                    <span className="text-base font-extrabold text-amber-400">{formatINR(submittedBooking.estimatedPrice)}</span>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="space-y-3 max-w-lg mx-auto pt-2">
                  <a
                    href={generateWhatsAppBookingUrl(submittedBooking)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Order Spec to Asif via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call To Confirm: {BUSINESS_INFO.displayPhone}</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs text-slate-400 hover:text-white transition-colors underline pt-2"
                  >
                    Submit Another Work Order
                  </button>
                </div>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">Work Order Requisition Form</h3>
                  <p className="text-xs text-slate-400">Fill in your requirements for rapid scheduling.</p>
                </div>

                {/* Row 1: Service & Workers Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inpage-service" className="block text-xs font-semibold text-slate-300 mb-1">
                      Required Service / Trade *
                    </label>
                    <select
                      id="inpage-service"
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} (from {formatINR(s.startingPrice)}/d)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inpage-workers" className="block text-xs font-semibold text-slate-300 mb-1">
                      Number of Workers *
                    </label>
                    <input
                      id="inpage-workers"
                      type="number"
                      min="1"
                      max="50"
                      value={workersCount}
                      onChange={(e) => setWorkersCount(parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    {errors.workersCount && <p className="text-[11px] text-rose-400 mt-1">{errors.workersCount}</p>}
                  </div>
                </div>

                {/* Row 2: Customer Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inpage-name" className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="inpage-name"
                      type="text"
                      placeholder="e.g. Tariq Ahmad"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) setErrors({ ...errors, customerName: '' });
                      }}
                      className={`w-full bg-slate-900 border rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none ${
                        errors.customerName ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                      }`}
                    />
                    {errors.customerName && <p className="text-[11px] text-rose-400 mt-1">{errors.customerName}</p>}
                  </div>

                  <div>
                    <label htmlFor="inpage-phone" className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Number (WhatsApp Preferred) *
                    </label>
                    <input
                      id="inpage-phone"
                      type="tel"
                      placeholder="e.g. 6006413495"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full bg-slate-900 border rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none ${
                        errors.phone ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Row 3: Site Location */}
                <div>
                  <label htmlFor="inpage-location" className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Location / Site Address *
                  </label>
                  <input
                    id="inpage-location"
                    type="text"
                    placeholder="e.g. House #22, Main Market, Kulgam / Srinagar Bypass"
                    value={siteLocation}
                    onChange={(e) => {
                      setSiteLocation(e.target.value);
                      if (errors.siteLocation) setErrors({ ...errors, siteLocation: '' });
                    }}
                    className={`w-full bg-slate-900 border rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none ${
                      errors.siteLocation ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                    }`}
                  />
                  {errors.siteLocation && <p className="text-[11px] text-rose-400 mt-1">{errors.siteLocation}</p>}
                </div>

                {/* Row 4: Work Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inpage-date" className="block text-xs font-semibold text-slate-300 mb-1">
                      Work Date *
                    </label>
                    <input
                      id="inpage-date"
                      type="date"
                      value={workDate}
                      onChange={(e) => {
                        setWorkDate(e.target.value);
                        if (errors.workDate) setErrors({ ...errors, workDate: '' });
                      }}
                      className={`w-full bg-slate-900 border rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none ${
                        errors.workDate ? 'border-rose-500' : 'border-slate-700 focus:border-amber-400'
                      }`}
                    />
                    {errors.workDate && <p className="text-[11px] text-rose-400 mt-1">{errors.workDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="inpage-slot" className="block text-xs font-semibold text-slate-300 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      id="inpage-slot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
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
                          : 'bg-slate-900 text-slate-300 border-slate-700'
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
                          : 'bg-slate-900 text-slate-300 border-slate-700'
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
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      Multi-Day
                    </button>
                  </div>

                  {durationType === 'custom_days' && (
                    <div className="mt-2.5 flex items-center gap-3">
                      <span className="text-xs text-slate-300">Days Count:</span>
                      <input
                        type="number"
                        min="2"
                        max="60"
                        value={daysCount}
                        onChange={(e) => setDaysCount(parseInt(e.target.value, 10) || 2)}
                        className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Tools & Urgency Checkboxes */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTools}
                      onChange={(e) => setIncludeTools(e.target.checked)}
                      className="rounded accent-amber-400"
                    />
                    <span>Supply Professional Site Tools (+₹150/worker)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="rounded accent-amber-400"
                    />
                    <span className="text-amber-400 font-semibold">Priority 2-Hour Dispatch (+15%)</span>
                  </label>
                </div>

                {/* Scope Notes */}
                <div>
                  <label htmlFor="inpage-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                    Special Scope Instructions (Optional)
                  </label>
                  <textarea
                    id="inpage-notes"
                    rows={2}
                    placeholder="e.g. Need 4 hammers, cutter, 20 bags of rubble to be carried down 2nd floor."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Live Estimated Rate Strip */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400">Estimated Total Quote:</span>
                    <p className="text-2xl font-extrabold text-amber-400">
                      {formatINR(calculatedQuote.totalEstimatedPrice)}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <p className="text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% ID Verified
                    </p>
                    <p className="text-[11px]">2-Hour Free Replacement Guarantee</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Work Order & Request Workers</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
