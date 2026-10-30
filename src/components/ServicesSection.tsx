import React, { useState } from 'react';
import { SERVICES, BUSINESS_INFO } from '../data/servicesData';
import { ServiceCategory } from '../types';
import { Hammer, HardHat, Building, Check, ArrowRight, MessageSquare, Wrench, Users, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { generateDirectWhatsAppUrl } from '../utils/booking';
import { formatINR } from '../utils/pricing';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeTab, setActiveTab] = useState<'all' | ServiceCategory>('all');

  const filteredServices = SERVICES.filter((service) => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  return (
    <section id="services" className="py-20 bg-slate-950 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Our Service Catalog</span>
            <span className="text-slate-600">/</span>
            <span>Labourers & Master Carpenters · Starting From ₹900 / Day</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Skilled Workforce Ready For Any Job Size
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            From single-day residential door repairs to fifty-worker commercial construction crews, Asif Enterprise provides vetted, punctual professionals equipped with modern tools, with daily wages starting from just ₹900.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Functional Buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-slate-900 rounded-xl border border-slate-800 max-w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Services ({SERVICES.length})
          </button>
          <button
            onClick={() => setActiveTab('labour')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'labour'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HardHat className="w-4 h-4" />
            Labour & Shifting ({SERVICES.filter((s) => s.category === 'labour').length})
          </button>
          <button
            onClick={() => setActiveTab('carpentry')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'carpentry'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Hammer className="w-4 h-4" />
            Carpentry & Woodwork ({SERVICES.filter((s) => s.category === 'carpentry').length})
          </button>
          <button
            onClick={() => setActiveTab('turnkey')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'turnkey'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building className="w-4 h-4" />
            Turnkey Contracts ({SERVICES.filter((s) => s.category === 'turnkey').length})
          </button>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            return (
              <div
                key={service.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-500/5 group"
              >
                <div className="p-6">
                  {/* Unboxed Metadata Strip */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-amber-400 uppercase tracking-wider">
                        {service.category === 'labour' ? 'Labour Crew' : service.category === 'carpentry' ? 'Carpentry' : 'Commercial'}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Team: {service.recommendedTeam}</span>
                    </div>
                    {service.popular && (
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-950/70 border border-amber-800 px-2 py-0.5 rounded">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Dynamic Skill & Trust Badges */}
                  <div className="mt-3 pt-3 border-t border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Verified Worker Credentials</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.skillBadges.map((badge, bIdx) => {
                        let badgeStyle = 'bg-slate-950 text-slate-300 border-slate-800';
                        let icon = <Check className="w-3 h-3 text-slate-400 shrink-0" />;

                        if (badge.type === 'safety') {
                          badgeStyle = 'bg-emerald-950/70 text-emerald-300 border-emerald-800/80 font-medium';
                          icon = <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />;
                        } else if (badge.type === 'experience') {
                          badgeStyle = 'bg-amber-950/70 text-amber-300 border-amber-800/80 font-semibold';
                          icon = <Award className="w-3 h-3 text-amber-400 shrink-0" />;
                        } else if (badge.type === 'credential') {
                          badgeStyle = 'bg-sky-950/70 text-sky-300 border-sky-800/80';
                          icon = <Check className="w-3 h-3 text-sky-400 shrink-0" />;
                        } else if (badge.type === 'specialty') {
                          badgeStyle = 'bg-slate-800/90 text-slate-200 border-slate-700';
                          icon = <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />;
                        }

                        return (
                          <span
                            key={bIdx}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border shadow-xs ${badgeStyle}`}
                            title={`${badge.label} (${badge.type})`}
                          >
                            {icon}
                            <span>{badge.label}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Starting Wage:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-amber-400">
                          {formatINR(service.startingPrice)}
                        </span>
                        <span className="text-xs text-slate-400">/ 8-hr shift</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Wrench className="w-3.5 h-3.5 text-amber-400" />
                        Tools Included
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-slate-900/60 border-t border-slate-800 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={generateDirectWhatsAppUrl(`Hi Asif, I want to book: ${service.name}. Please let me know worker availability.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Contract Help Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Have a Unique Requirement or Large Construction Site?</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We provide tailored workforce contracts with dedicated supervisors for hotels, hospitals, retail showrooms, and residential developments across Kashmir & North India.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Call Asif: {BUSINESS_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
