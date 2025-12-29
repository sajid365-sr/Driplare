export function Newsletter() {
    return (
      <section className="py-24 bg-white border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-[#0A0A0A] rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">
                Download the <span className="text-primary italic">System_Audit.</span>
              </h3>
              <p className="text-white/60 text-lg mb-10 font-medium">
                Join 1,200+ architects receiving weekly automation blueprints and system engineering reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="architect@company.com"
                  className="flex-grow bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary hover:bg-primary/90 text-white font-black px-8 py-4 rounded-2xl transition-all active:scale-95">
                  Subscribe
                </button>
              </div>
              <p className="mt-6 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                No Spam // Just Infrastructure Updates
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }