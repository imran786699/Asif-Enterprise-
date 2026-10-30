import React from 'react';
import { BUSINESS_INFO } from '../data/servicesData';
import { HardHat, Phone, MessageSquare, MapPin, Clock, ShieldCheck, Mail } from 'lucide-react';
import { generateDirectWhatsAppUrl } from '../utils/booking';
import { ClickToCopyPhone } from './ClickToCopyPhone';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenMyBookings }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <HardHat className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">ASIF ENTERPRISE</h3>
                <p className="text-xs text-slate-400">Online Labours & Carpenters</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for professional on-demand labour and master carpentry services. Providing vetted civil helpers, shifting crews, furniture craftsmen, and commercial workforce.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Aadhaar & Background Verified Personnel</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Working Hours: {BUSINESS_INFO.workingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{BUSINESS_INFO.address}</p>
                  <a
                    href={BUSINESS_INFO.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 font-semibold underline hover:text-amber-300 text-[11px] inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Open in Google Maps (maps.app.goo.gl/WGY28pR6AzmgD96o7) ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Direct Contact & Hotline
            </h4>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
                <img
                  src={BUSINESS_INFO.proprietorDp}
                  alt="Proprietor Asif"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src !== BUSINESS_INFO.proprietorFallbackDp) {
                      target.src = BUSINESS_INFO.proprietorFallbackDp;
                    }
                  }}
                  className="w-11 h-11 rounded-xl object-cover border border-amber-400/80 shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-400 uppercase tracking-wide font-semibold mb-1">
                    Proprietor Contact & Helpline:
                  </p>
                  <ClickToCopyPhone variant="card" />
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={generateDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <button
                  onClick={onOpenBooking}
                  className="flex-1 py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all"
                >
                  Book Online
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Immediate 60-120 minute dispatch for urgent tasks, plumbing/repair assists, or emergency warehouse unloading.
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors">
                  Labour & Shifting Rates
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-amber-400 transition-colors">
                  Master Carpentry Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calculator')} className="hover:text-amber-400 transition-colors">
                  Online Wage & Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('why-us')} className="hover:text-amber-400 transition-colors">
                  Verification & Guarantees
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-amber-400 transition-colors">
                  Completed Projects
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faqs')} className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={onOpenMyBookings} className="text-amber-400 font-semibold hover:underline">
                  View My Bookings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Asif Enterprise. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <span>Phone:</span>
              <ClickToCopyPhone variant="compact" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Online Workforce Provider</span>
            <span>·</span>
            <span>Aadhaar Verified Crews</span>
            <span>·</span>
            <span>Satisfaction Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
