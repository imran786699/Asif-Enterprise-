import React, { useState } from 'react';
import { WORKER_ACTION_PHOTOS, BUSINESS_INFO } from '../data/servicesData';
import { HardHat, Hammer, Truck, MapPin, Wrench, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface WorkersLiveGalleryProps {
  onSelectCrewForBooking: (serviceId: string) => void;
}

export const WorkersLiveGallery: React.FC<WorkersLiveGalleryProps> = ({ onSelectCrewForBooking }) => {
  const [filter, setFilter] = useState<'all' | 'labour' | 'carpentry' | 'shifting'>('all');

  const filteredPhotos = WORKER_ACTION_PHOTOS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="workers-gallery" className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              <HardHat className="w-4 h-4" />
              <span>Real Workforce In Action</span>
              <span className="text-slate-600">/</span>
              <span>On-Site Project Photography</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              See Our Skilled Labours & Master Carpenters at Work
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse actual photographs of our verified workforce handling concrete mixing, fine teak joinery, modular kitchen installations, and delicate furniture shifting across Jammu & Kashmir sites.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Crews ({WORKER_ACTION_PHOTOS.length})
            </button>
            <button
              onClick={() => setFilter('labour')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'labour'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              Civil Labourers
            </button>
            <button
              onClick={() => setFilter('carpentry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'carpentry'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              Master Carpenters
            </button>
            <button
              onClick={() => setFilter('shifting')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'shifting'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              Shifting Teams
            </button>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Photo with Overlay Badge */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Trade Tag Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-slate-900/90 backdrop-blur-md text-amber-400 border border-slate-700/80 shadow-md">
                      {item.trade}
                    </span>
                  </div>

                  {/* Location Pin Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium text-[11px]">{item.location}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-slate-900 space-y-1.5 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item.crewSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Tools: {item.toolsUsed}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectCrewForBooking(item.serviceId)}
                  className="w-full py-2.5 px-3 bg-slate-900 hover:bg-amber-400 text-slate-300 hover:text-slate-950 font-bold text-xs rounded-xl border border-slate-800 hover:border-amber-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Book This Work Crew</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All personnel pictured are authenticated members of Asif Enterprise roster with verified Aadhaar credentials.
            </span>
          </div>
          <span className="text-slate-300 font-semibold">
            Need custom site inspection? Call <a href={`tel:${BUSINESS_INFO.phone}`} className="text-amber-400 underline">{BUSINESS_INFO.displayPhone}</a>
          </span>
        </div>
      </div>
    </section>
  );
};
