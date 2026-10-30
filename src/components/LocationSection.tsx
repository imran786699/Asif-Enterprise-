import React from 'react';
import { BUSINESS_INFO } from '../data/servicesData';
import { MapPin, Navigation, ExternalLink, Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { generateDirectWhatsAppUrl } from '../utils/booking';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-slate-950 text-white border-b border-slate-800 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <MapPin className="w-4 h-4" />
            <span>Our Location & Operational Hub</span>
            <span className="text-slate-600">/</span>
            <span>Jammu & Kashmir</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Visit Our Office or Dispatch from Our Hub
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Our central workshop and workforce muster point is located on Aharbal-Kulgam Road, Kulgam. We rapidly dispatch verified labour crews and master carpenters to your doorstep across South Kashmir and the entire valley.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details & Action Card */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              {/* Address Box */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                      Registered Address
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Asif Enterprise Central Hub
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Pin Coordinates: 33.650428, 74.796425
                    </p>
                  </div>
                </div>

                {/* Primary Map Link */}
                <div className="pt-2">
                  <a
                    href={BUSINESS_INFO.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open in Google Maps ({BUSINESS_INFO.shortLocation})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Working Hours & Helpline */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Hub Hours:</strong> {BUSINESS_INFO.workingHours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Express Coverage:</strong> Kulgam, Anantnag, Shopian, Pulwama & Srinagar</span>
                </div>
              </div>

              {/* Coverage list */}
              <div className="pt-2 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Service Zones:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Kulgam & DH Pora', 'Aharbal Belt', 'Anantnag & Qazigund', 'Shopian & Pulwama', 'Srinagar & Bypass', 'North India Contracts'].map((zone, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[11px]"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-800 mt-6">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="py-3 px-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {BUSINESS_INFO.displayPhone}</span>
              </a>
              <a
                href={generateDirectWhatsAppUrl('Hello Asif, I am looking for your workshop/office location on Aharbal-Kulgam Road.')}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed Column */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative min-h-[380px] flex flex-col">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium">Live GPS Location: Aharbal-Kulgam Road</span>
              </div>
              <a
                href={BUSINESS_INFO.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Full Screen View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 w-full relative min-h-[340px]">
              <iframe
                title="Asif Enterprise Office Location"
                src={BUSINESS_INFO.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[110%]"
              />
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <span>Map Link: <a href={BUSINESS_INFO.mapUrl} target="_blank" rel="noreferrer" className="text-amber-400 underline font-mono">maps.app.goo.gl/WGY28pR6AzmgD96o7</a></span>
              <span>Need help finding us? Call +91 60064 13495</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
