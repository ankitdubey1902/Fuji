import React from "react";

const AboutUsPage = () => {
  return (
    <main className="flex-grow w-full pb-16 bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Hero section */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 tracking-tight leading-tight">
            Curating simplicity for the modern home.
          </h1>
          <p className="text-base md:text-lg text-gray-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            Founded in 2024, FUJI was built on a simple promise: to design and source everyday essentials that balance function, form, and pure material beauty.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-black text-gray-900 dark:text-slate-100 tracking-tight">Our Philosophy</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Every piece we carry is selected according to three core pillars.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-200">Premium Raw Materials</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
              We collaborate with global artisans who source ethically harvested timber, organic long-staple cottons, and high-purity metals to ensure lasting lifetime durability.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-200">Timeless Aesthetics</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
              We design with subtraction in mind. By removing unnecessary ornamentation, we create pure silhouettes that integrate harmoniously into any living space.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-200">Conscious Practices</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
              Sustainability isn’t an afterthought. From our solar-powered craft studios to our biodegradable starch packaging, we minimize footprints at every stage.
            </p>
          </div>

        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-indigo-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent_50%)]"></div>
          
          <div className="space-y-6 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 text-indigo-200 px-2.5 py-1 rounded border border-white/10">
              The Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Creating goods that become part of your routine.
            </h2>
            <p className="text-sm text-indigo-100 leading-relaxed">
              We believe the objects we interact with daily shape our focus and mindset. By offering thoughtfully made products, we aim to inject a quiet moment of mindfulness into your day-to-day routines.
            </p>
            <div className="pt-2">
              <span className="text-sm font-bold text-emerald-400">100% Carbon Neutral Shipping worldwide.</span>
            </div>
          </div>

          <div className="h-64 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between relative z-10 backdrop-blur-sm">
            <div className="space-y-2">
              <span className="text-5xl font-light text-indigo-300">“</span>
              <p className="text-base italic text-indigo-50 leading-relaxed">
                Simplicity is not the absence of clutter, but the presence of clarity. FUJI designs have introduced a sense of calm and order to my daily routine.
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center font-bold text-xs text-white">
                EL
              </div>
              <div>
                <h4 className="text-xs font-bold">Elena Rostova</h4>
                <p className="text-[10px] text-indigo-300">Architect & Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default AboutUsPage;
