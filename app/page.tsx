import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, ShieldCheck, Zap, History, Search, Building2, Terminal } from 'lucide-react';

function FeatureCard({ icon, title, description, href }: { icon: any, title: string, description: string, href?: string }) {
  const content = (
    <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl text-left hover:border-slate-800 hover:bg-slate-900/60 transition-all h-full flex flex-col">
      <div className="mb-6">{icon}</div>
      <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{description}</p>
      {href && (
        <div className="text-cyan-500 text-xs font-bold uppercase tracking-widest flex items-center">
          Access Module <ArrowRight size={14} className="ml-1" />
        </div>
      )}
    </div>
  );

  return href ? <Link href={href} className="block">{content}</Link> : content;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="flex justify-between items-center px-8 md:px-24 py-8 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="text-cyan-500 h-8 w-8" />
          <span className="text-xl font-black tracking-tighter text-white uppercase">ThreatLens AI</span>
        </div>
        <div className="hidden md:flex space-x-12 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Vector</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">Core</a>
          <a href="#docs" className="hover:text-cyan-400 transition-colors">Terminal</a>
        </div>
        <Link
          href="/dashboard"
          className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-full text-slate-200 text-sm font-bold hover:bg-slate-800 transition-all hover:border-slate-700"
        >
          CONSOLE
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-8 md:px-24 pt-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase mb-8">
          <Zap size={12} className="animate-pulse" />
          <span>Next-Gen Anomaly Detection</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] max-w-4xl mb-8">
          DETECT DEEP <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">THREATS IN SYNC.</span>
        </h1>

        <p className="text-slate-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed mb-12">
          Harness adaptive AI to analyze server logs in real-time. Detect brute force, SQL injection patterns,
          and volumetric anomalies before they impact your infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-24">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-cyan-600 rounded-xl text-white font-bold hover:bg-cyan-500 transition-all flex items-center shadow-2xl shadow-cyan-900/40"
          >
            DEPLOY ANALYTICS <ArrowRight className="ml-2" size={20} />
          </Link>
          <Link
            href="/analyzer"
            className="px-8 py-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 font-bold hover:bg-slate-800 transition-all flex items-center"
          >
            VIEW SOURCE
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Building2 className="text-blue-500" size={32} />}
            title="Office Demo"
            description="Our target simulation site where logins occur and logs are generated."
            href="/office/login"
          />
          <FeatureCard
            icon={<ShieldCheck className="text-cyan-500" size={32} />}
            title="ThreatLens AI"
            description="The central monitoring dashboard that analyzes traffic and detects threats."
            href="/dashboard"
          />
          <FeatureCard
            icon={<Terminal className="text-emerald-500" size={32} />}
            title="Attack Simulator"
            description="Hacker-style console to perform brute-force attacks for demonstration."
            href="/attack"
          />
        </div>
      </main>

      <footer className="py-12 border-t border-slate-900 text-center text-slate-600 text-xs font-bold tracking-widest uppercase mb-10">
        © 2026 ThreatLens AI // Secure Protocol v1.4.2
      </footer>
    </div>
  );
}
