import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Clock, CheckCircle2, ArrowRight, Zap, Users } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { generateDirectWhatsAppUrl } from '../utils/booking';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToCalculator }) => {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Subtle background industrial pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Kicker without pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Verified On-Demand Workforce Contractor</span>
              <span className="text-slate-500">/</span>
              <a
                href={BUSINESS_INFO.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-white underline inline-flex items-center gap-1"
                title="View Asif Enterprise on Google Maps"
              >
                <span>Hub: Kulgam, J&K (Aharbal Road) ↗</span>
              </a>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Professional <span className="text-amber-400">Labours & Carpenters</span> For Any Type Of Work.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Whether you need sturdy construction helpers, house shifting crews, demolition hands, or master carpenters for custom wardrobes and modular kitchens—<strong className="text-white font-semibold">Asif Enterprise</strong> provides background-verified, punctual workers on-demand.
            </p>

            {/* Emergency hotline callout banner with Proprietor Asif Photo */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/80 border border-amber-500/30 flex items-center gap-3.5 shadow-md">
              <div className="relative shrink-0">
                <img
                  src={BUSINESS_INFO.proprietorDp}
                  alt="Asif - Proprietor & Master Contractor"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== BUSINESS_INFO.proprietorFallbackDp) {
                      target.src = BUSINESS_INFO.proprietorFallbackDp;
                    }
                  }}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-slate-950" title="Active Hotline">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div className="text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <span>Need emergency workers on site right now?</span>
                </div>
                <p className="text-slate-300 mt-0.5">
                  Call proprietor Asif directly at{' '}
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-amber-400 font-bold underline hover:text-amber-300">
                    {BUSINESS_INFO.displayPhone}
                  </a>{' '}
                  — express dispatch in 60 to 120 mins.
                </p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Book Workforce Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {BUSINESS_INFO.displayPhone}</span>
              </a>

              <a
                href={generateDirectWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 pt-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Aadhaar Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2-Hour Replacement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent Daily Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modern Power Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Site Supervision</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily & Contract Billing</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Card / Quick Rate Preview */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 sm:p-7 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <h3 className="text-base font-bold text-white">Standard Daily Rates</h3>
                  <p className="text-xs text-amber-400 font-semibold">Starting from ₹900 / Day (8-Hr Shift)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                    Active Roster
                  </span>
                </div>
              </div>

              <div className="divide-y divide-slate-700/60 my-4 text-sm">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">General Construction Helper</p>
                    <p className="text-xs text-slate-400">Civil work, concrete, earthwork, cleaning</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-400 text-base">₹900</p>
                    <p className="text-[10px] text-slate-400">/ day / worker</p>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Loading & Shifting Crew</p>
                    <p className="text-xs text-slate-400">Heavy luggage, furniture, truck unload</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-400 text-base">₹950</p>
                    <p className="text-[10px] text-slate-400">/ day / worker</p>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Master Carpenter (Artisan)</p>
                    <p className="text-xs text-slate-400">Wardrobes, plywood, bed frames, repairs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-400 text-base">₹1,200</p>
                    <p className="text-[10px] text-slate-400">/ day / artisan</p>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Modular Kitchen Specialist</p>
                    <p className="text-xs text-slate-400">Hettich/Blum hardware, carcass fitment</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-400 text-base">₹1,350</p>
                    <p className="text-[10px] text-slate-400">/ day / specialist</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300 font-medium">Hiring 5+ or 10+ workers?</p>
                  <p className="text-[11px] text-amber-400 font-semibold">Bulk corporate discounts available</p>
                </div>
                <button
                  onClick={onScrollToCalculator}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-600 transition-colors"
                >
                  Calculate Now
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700 text-center">
                <p className="text-xs text-slate-400">
                  Talk directly with Asif Enterprise:{' '}
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white font-bold underline">
                    {BUSINESS_INFO.displayPhone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Statistics Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">500+</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Verified Workers in Network</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">1,200+</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Projects & Shifts Completed</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">99.4%</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">On-Time Arrival Rate</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">2 Hours</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Replacement Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};
