import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_PORTFOLIO } from '../data/initialData';
import { ExternalLink, Layers, ArrowUpRight, BarChart3, Code, Terminal } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Web Development', 'Logistics Software', 'Enterprise Tech'];

  const filteredItems = INITIAL_PORTFOLIO.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>SELECTED WORKS & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Minimalist Portfolio & <span className="text-emerald-600">Logistics Case Studies</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Explore our technical portfolio of custom web platforms, freight dispatch portals, and enterprise document collaboration engines developed for industry leaders.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-emerald-500 transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              {/* Image Banner */}
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-emerald-700 font-bold">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-mono text-white bg-slate-900/90 px-2.5 py-1 rounded border border-slate-700 font-semibold">
                    Client: {item.client}
                  </span>
                  <span className="text-xs font-mono text-emerald-300 font-bold flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded border border-emerald-500/40">
                    <BarChart3 className="w-3.5 h-3.5" />
                    {item.metrics}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
