import React from 'react';
import {
  ShieldCheck,
  FileCheck,
  UserCheck,
  Award,
  RefreshCw,
  HeartPulse,
  CheckCircle,
  HardHat,
  Lock
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

export const VerifiedProfessionalsSection: React.FC = () => {
  const trustPillars = [
    {
      icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Background-Checked',
      subtitle: 'Police & Aadhaar Cleared',
      description: '100% biometric ID verification, permanent home address validation, and clean police records prior to roster admission.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: 'Site Safety & Insured',
      subtitle: 'Zero Client Liability',
      description: 'Equipped with certified PPE gear and safety protocols. All workforce operations covered with strict liability protection.'
    },
    {
      icon: <FileCheck className="w-5 h-5 text-sky-400" />,
      title: 'Licensed Enterprise',
      subtitle: 'Government Compliant',
      description: 'Official enterprise registration with transparent billing, legal labor compliance, and formal GST/work order documentation.'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      title: 'Trade Tested & Skilled',
      subtitle: 'Hands-on Evaluated',
      description: 'Tested on actual timber joinery, laser level alignment, masonry mixing, and fragile furniture handling.'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-emerald-400" />,
      title: '2-Hour Replacement',
      subtitle: 'Immediate Site Swap',
      description: 'If any worker fails to meet your expected work speed or trade standards, an alternate verified worker arrives within 120 minutes.'
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      title: 'Disciplined & Punctual',
      subtitle: 'Daily Morning Muster',
      description: 'Strict non-intoxicant policy, polite communication, and strict 08:30 AM site arrival discipline.'
    }
  ];

  return (
    <section id="verified-standards" className="py-14 bg-slate-950 text-white border-b border-slate-800/80 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Kicker & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-900 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Workforce Protocol</span>
              <span className="text-slate-700">/</span>
              <span>100% Aadhaar & Background Cleared</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Licensed, Insured & Verified Professionals You Can Trust
            </h2>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">
              Never let unverified strangers onto your premises. Every labourer and master carpenter deployed by Asif Enterprise is strictly vetted before dispatch.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-2xl font-black text-amber-400 block">500+</span>
              <span className="text-[11px] uppercase tracking-wider">Vetted Craftsmen</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-left sm:text-right">
              <span className="text-2xl font-black text-emerald-400 block">100%</span>
              <span className="text-[11px] uppercase tracking-wider">Police Verified</span>
            </div>
          </div>
        </div>

        {/* 6 Core Verification Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-slate-700 transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {pillar.subtitle}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Verified by Asif Enterprise</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Safety Guarantee Bar */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Zero-Risk Hiring:</strong> Need worker ID copies for your site security gate? We supply verified Aadhaar cards prior to work start.
            </span>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="text-amber-400 font-bold hover:underline shrink-0"
          >
            Call Helpline: {BUSINESS_INFO.displayPhone} ↗
          </a>
        </div>
      </div>
    </section>
  );
};
