import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';
import { generateDirectWhatsAppUrl } from '../utils/booking';

export const FloatingActionBar: React.FC = () => {
  return (
    <aside aria-label="Quick Contact Hotlines" className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
      {/* WhatsApp Floating Button */}
      <a
        href={generateDirectWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative"
        aria-label="Direct WhatsApp Chat with Asif Enterprise"
        title="Chat on WhatsApp (+91 60064 13495)"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-15 bg-slate-900 border border-slate-700 text-white text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          WhatsApp: {BUSINESS_INFO.displayPhone}
        </span>
      </a>

      {/* Phone Call Floating Button */}
      <a
        href={`tel:${BUSINESS_INFO.phone}`}
        className="w-13 h-13 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xl shadow-amber-950/50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative"
        aria-label="Call Proprietor Asif Directly"
        title="Call +91 60064 13495"
      >
        <Phone className="w-5 h-5 fill-slate-950" />
        <span className="absolute right-15 bg-slate-900 border border-slate-700 text-white text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Call Now: {BUSINESS_INFO.displayPhone}
        </span>
      </a>
    </aside>
  );
};
