import React, { useState } from 'react';
import { FAQS, BUSINESS_INFO } from '../data/servicesData';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
            <span className="text-slate-600">/</span>
            <span>Common Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Everything you need to know about booking labours, carpenters, rates, tools, and guarantees.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 bg-slate-950 rounded-2xl border border-slate-800">
          <p className="text-sm font-semibold text-white">Have a specific question not listed here?</p>
          <p className="text-xs text-slate-400 mt-1">
            Speak directly with Asif Enterprise management anytime.
          </p>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call +91 60064 13495</span>
          </a>
        </div>
      </div>
    </section>
  );
};
