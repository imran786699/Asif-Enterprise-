import React, { useState } from 'react';
import { PROJECTS, BUSINESS_INFO } from '../data/servicesData';
import { MapPin, Users, Clock, Check, ArrowRight } from 'lucide-react';

interface ProjectShowcaseProps {
  onOpenBooking: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Carpentry' | 'Labour Crew'>('All');

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-20 bg-slate-950 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              <span>Workmanship In Action</span>
              <span className="text-slate-600">/</span>
              <span>Past Project Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Recent Work Completed by Asif Enterprise
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl">
              Inspect real jobs delivered by our master carpenters and labour crews across Kashmir and North India.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mt-6 md:mt-0 flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            {(['All', 'Carpentry', 'Labour Crew'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold px-3 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-700 rounded-lg">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-md">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-md">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        {project.workersDeployed} Crew
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Key Highlights:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs text-slate-300 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-800"
                        >
                          <Check className="w-3 h-3 text-emerald-400" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Want similar results for your project?</span>
                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Hire This Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
