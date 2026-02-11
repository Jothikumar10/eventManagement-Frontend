import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="relative bg-black text-white min-h-screen flex items-center overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        {/* Suble Grid Overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT CONTENT: THE HOOK */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/5 backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
              The Ultimate Event Protocol
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            EVENT<span className="text-yellow-400">HUB</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight max-w-lg mx-auto lg:mx-0">
            Discover premium experiences. Secure your access. Join the network.
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed font-medium">
            The central command for modern event management. Explore high-tier 
            gatherings, submit your credentials, and track your approval status 
            in real-time through our encrypted deployment system.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
            <Link
              to="/user/dashboard"
              className="px-10 py-4 rounded-2xl bg-yellow-400 text-black font-black text-xs uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-[0_10px_30px_rgba(250,204,21,0.2)] active:scale-95"
            >
              Explore Hub
            </Link>

            <Link
              to="/signup"
              className="px-10 py-4 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-md text-white font-black text-xs uppercase tracking-widest hover:border-yellow-400/50 transition-all active:scale-95"
            >
              Create Identity
            </Link>
          </div>
        </div>

        {/* RIGHT CONTENT: FEATURE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          <div className="absolute inset-0 bg-yellow-400/5 blur-[100px] -z-10"></div>
          
          <FeatureCard
            icon="🌐"
            title="Global Discovery"
            desc="Access a curated feed of events filtered by industry and tech stack."
          />
          <FeatureCard
            icon="⚡"
            title="Rapid Request"
            desc="One-click registration powered by your pre-verified Hub profile."
          />
          <FeatureCard
            icon="🛡️"
            title="Smart Approval"
            desc="Direct verification by event architects to ensure high-quality peers."
          />
          <FeatureCard
            icon="📊"
            title="Live Status"
            desc="Real-time handshake tracking from pending to approved access."
          />
        </div>

      </div>
    </section>
  );
}

/* ---------- FEATURE CARD ---------- */
const FeatureCard = ({ title, desc, icon }) => (
  <div className="group bg-gray-900/40 backdrop-blur-xl rounded-[2rem] p-8 border border-gray-800 hover:border-yellow-400/50 transition-all duration-500 flex flex-col gap-4">
    <div className="w-12 h-12 rounded-2xl bg-black border border-gray-800 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-yellow-400 transition-all duration-500 group-hover:text-black">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed font-medium group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
  </div>
);

export default Home;