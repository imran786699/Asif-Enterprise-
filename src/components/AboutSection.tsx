import React from 'react';
import { BUSINESS_INFO } from '../data/servicesData';
import { ShieldCheck, HardHat, Award, Users, CheckCircle, MapPin, Phone, MessageSquare } from 'lucide-react';
import { generateDirectWhatsAppUrl } from '../utils/booking';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <HardHat className="w-4 h-4" />
              <span>About Asif Enterprise</span>
              <span className="text-slate-600">/</span>
              <span>Workforce Contractors</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Delivering Professional Workforce Solutions & Master Craftsmanship Across North India
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded and managed by proprietor <strong className="text-white">Asif</strong>, <strong className="text-white">Asif Enterprise</strong> was established to bridge the gap between unorganized daily labour and homeowners, builders, and commercial enterprises seeking reliable, skilled, and honest personnel.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Headquartered on <strong className="text-white">Aharbal-Kulgam Road, Kulgam, Jammu & Kashmir</strong>, our enterprise operates a vetted roster of over 500 certified civil helpers, loading squads, and seasoned master carpenters. We handle projects of any scale—from a single master carpenter fixing domestic doors and wardrobes to 50-worker industrial squads on civil sites.
            </p>

            {/* Core Enterprise Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Aadhaar & Police Verified</span>
                </div>
                <p className="text-xs text-slate-400">
                  Every worker is documented with verified government ID and background clearance before site deployment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm mb-1">
                  <Award className="w-4 h-4" />
                  <span>2-Hour Replacement</span>
                </div>
                <p className="text-xs text-slate-400">
                  If any worker does not meet required skill levels, we replace them within 120 minutes with zero surcharge.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Transparent Daily Rates</span>
                </div>
                <p className="text-xs text-slate-400">
                  Fixed wages starting from ₹900/day. No middleman cuts, no site bargaining stress.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm mb-1">
                  <Users className="w-4 h-4" />
                  <span>Turnkey Commercial Teams</span>
                </div>
                <p className="text-xs text-slate-400">
                  Full site supervision, safety equipment, and consolidated weekly billing for businesses.
                </p>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Proprietor Asif: {BUSINESS_INFO.displayPhone}</span>
              </a>

              <a
                href={generateDirectWhatsAppUrl('Hello Asif Enterprise, I would like to inquire about your company services and workforce contracts.')}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Business</span>
              </a>
            </div>
          </div>

          {/* Right Corporate Profile Card with Proprietor DP */}
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
            {/* Proprietor DP Headshot & Badge */}
            <div className="flex items-center gap-4 pb-5 border-b border-slate-800">
              <div className="relative">
                <img
                  src={BUSINESS_INFO.proprietorDp}
                  alt="Asif - Proprietor of Asif Enterprise"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== BUSINESS_INFO.proprietorFallbackDp) {
                      target.src = BUSINESS_INFO.proprietorFallbackDp;
                    }
                  }}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-amber-400 shadow-lg shadow-amber-400/20"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950" title="Active & Verified">
                  <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Licensed Contractor</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-0.5">Asif</h3>
                <p className="text-xs text-slate-300 font-medium">
                  Proprietor & Master Contractor
                </p>
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  “Direct accountability & verified skills on every job.”
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 border-b border-slate-900">
                <span className="text-slate-400">Enterprise Name:</span>
                <span className="font-bold text-white">Asif Enterprise</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-900">
                <span className="text-slate-400">Managing Proprietor:</span>
                <span className="font-bold text-white">Asif</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-900">
                <span className="text-slate-400">Direct Contact:</span>
                <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold text-amber-400 hover:underline">
                  {BUSINESS_INFO.displayPhone}
                </a>
              </div>
              <div className="flex justify-between items-start py-2 border-b border-slate-900">
                <span className="text-slate-400">Operational Hub:</span>
                <span className="font-medium text-white text-right max-w-xs">{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-900">
                <span className="text-slate-400">Starting Wage:</span>
                <span className="font-bold text-emerald-400">From ₹900 / Worker / Day</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-900">
                <span className="text-slate-400">Working Hours:</span>
                <span className="font-medium text-white">{BUSINESS_INFO.workingHours}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Coverage Radius:</span>
                <span className="font-medium text-white">Kashmir Valley & North India</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <p className="text-white font-semibold">Need directions to our workshop?</p>
                <a
                  href={BUSINESS_INFO.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 underline hover:text-amber-300 font-medium"
                >
                  View on Google Maps (maps.app.goo.gl/WGY28pR6AzmgD96o7) ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
