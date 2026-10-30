import React from 'react';
import { ShieldCheck, RefreshCw, BadgeIndianRupee, Wrench, Clock, Users, Phone, CheckCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: '100% ID & Background Verified',
      description:
        'Every labourer and carpenter registered in our network undergoes police background clearance and government Aadhaar verification for total family and site safety.'
    },
    {
      icon: RefreshCw,
      title: '2-Hour Free Replacement Guarantee',
      description:
        'If a dispatched worker does not match the skill level needed or fails to perform adequately, we dispatch a replacement worker within 2 hours at no extra charge.'
    },
    {
      icon: BadgeIndianRupee,
      title: 'Transparent Standard Rates',
      description:
        'Say goodbye to exhausting daily bargaining. Clear standard daily wages with zero hidden contractor cuts or inflated site margins.'
    },
    {
      icon: Wrench,
      title: 'Modern Power Tools On Demand',
      description:
        'Our carpenters bring laser levels, routers, circular saws, and finishing planers. Civil labours are equipped with shovels, belts, and safety helmets.'
    },
    {
      icon: Clock,
      title: 'Guaranteed Punctual Arrival',
      description:
        'Morning shifts start sharp at 8:30 AM. For urgent dispatch, our rapid-response team reaches local addresses within 60 to 120 minutes.'
    },
    {
      icon: Users,
      title: 'Turnkey Commercial Crew Supply',
      description:
        'Need 10 to 50 workers for a warehouse, hotel fit-out, or multi-storey construction? We provide dedicated supervisors and consolidated weekly billing.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Trust & Reliability</span>
            <span className="text-slate-600">/</span>
            <span>Why Asif Enterprise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why Contractors & Homeowners Rely On Us
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Hiring unorganized daily wage labour often leads to delays, bargaining fights, and poor workmanship. Asif Enterprise brings professional accountability to workforce staffing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-slate-950 border border-emerald-900/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
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
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950" title="Proprietor Verified">
                <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                100% Satisfaction & Replacement Promise
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                You only pay when satisfied with the day&apos;s output. Call proprietor Asif directly at{' '}
                <a href={`tel:${BUSINESS_INFO.phone}`} className="text-amber-400 font-bold underline">
                  {BUSINESS_INFO.displayPhone}
                </a>
              </p>
            </div>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="shrink-0 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Proprietor Asif</span>
          </a>
        </div>
      </div>
    </section>
  );
};
