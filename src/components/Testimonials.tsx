import React from 'react';
import { TESTIMONIALS } from '../data/servicesData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Client Endorsements</span>
            <span className="text-slate-600">/</span>
            <span>Real Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Trusted by Contractors, Designers & Homeowners
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Over 1,200 satisfied jobs delivered across Jammu & Kashmir and Northern regions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Client</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.clientName}</h4>
                  <p className="text-xs text-slate-400">
                    {item.role} · {item.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-amber-400 font-medium block">
                    {item.serviceUsed}
                  </span>
                  <span className="text-[10px] text-slate-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
