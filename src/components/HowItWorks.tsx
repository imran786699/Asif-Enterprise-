import React from 'react';
import { Hammer, CheckCircle2, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      step: '01',
      title: 'Select Trade & Team Size',
      description:
        'Choose whether you need construction labour, furniture shifting crew, or master carpenters for wardrobe & kitchen fitment. Specify how many workers and the shift duration.'
    },
    {
      step: '02',
      title: 'Instant Confirmation & Dispatch',
      description:
        'Submit online or call +91 6006413495 directly. We verify site requirements and assign verified, police-checked workers equipped with necessary power tools.'
    },
    {
      step: '03',
      title: 'Work Completed With Guarantee',
      description:
        'Workers arrive punctually at your site. Enjoy total peace of mind with our 2-hour free replacement guarantee. Pay transparent daily wages with zero surprises.'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Simple 3-Step Process</span>
            <span className="text-slate-600">/</span>
            <span>How Online Booking Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hiring Verified Workers Is Now Seamless
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            No waiting at roadside labour chowks in cold or rain. Book certified professionals right to your site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-slate-950 p-7 rounded-2xl border border-slate-800 relative hover:border-amber-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold text-amber-400/30 font-mono block mb-4">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Verified Accountability</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Book Workers in 60 Seconds</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Asif: {BUSINESS_INFO.displayPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
