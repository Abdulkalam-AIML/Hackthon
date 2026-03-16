"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import {
    FileText,
    Download,
    ShieldCheck,
    ShieldAlert,
    PieChart,
    Table,
    Calendar,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { ThreatLensAI } from '@/lib/ai-engine';

export default function ReportsPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [riskInfo, setRiskInfo] = useState({ score: 10, count: 0 });

    React.useEffect(() => {
        const fetchRisk = async () => {
            try {
                const res = await fetch('/api/log');
                const data = await res.json();
                if (data.logs) {
                    const threats = ThreatLensAI.analyze(data.logs);
                    const score = ThreatLensAI.calculateSystemRisk(threats);
                    setRiskInfo({ score, count: data.logs.length });
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchRisk();
    }, []);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <AppLayout>
            <div className="flex flex-col space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight underline decoration-cyan-500 decoration-4">SECURITY REPORTS</h1>
                        <p className="text-slate-500 mt-1">Generate and export automated security audit summaries.</p>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="px-6 py-3 bg-cyan-600 rounded-xl text-white font-bold hover:bg-cyan-500 transition-all flex items-center shadow-2xl shadow-cyan-900/40 disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                            <Zap size={18} className="mr-2" />
                        )}
                        GENERATE NEW AUDIT
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:col-span-2">
                        <h3 className="text-white font-bold mb-6 flex items-center">
                            <ShieldCheck className="mr-2 text-emerald-500" size={20} />
                            Recent Report: System Health Audit v2.4
                        </h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Risk Level</span>
                                    <div className={cn(
                                        "text-2xl font-black mt-1",
                                        riskInfo.score > 70 ? "text-red-500" : riskInfo.score > 40 ? "text-amber-500" : "text-emerald-500"
                                    )}>
                                        {riskInfo.score > 70 ? "CRITICAL" : "STABLE"}
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Compliance</span>
                                    <div className="text-2xl font-black text-white mt-1">94%</div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-400 leading-relaxed shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                                <p className="mb-4">
                                    The system was audited over the last 24-hour cycle. A total of <span className="text-white">{riskInfo.count} requests</span> were analyzed.
                                    Anomaly detection vectors identified the current security posture as <span className={cn("font-bold", riskInfo.score > 70 ? "text-red-500" : "text-emerald-500")}>
                                        {riskInfo.score > 70 ? "highly vulnerable" : "optimally secure"}
                                    </span>.
                                </p>
                                <p>
                                    Internal latency remains optimal at <span className="text-cyan-400 font-mono">24ms</span>. No critical data exfiltration patterns detected.
                                </p>
                            </div>

                            {/* Playbook Section (V2) */}
                            <div className="p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl">
                                <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center">
                                    <Zap size={14} className="mr-2" /> AI-Generated Mitigation Playbook
                                </h4>
                                <ul className="space-y-3 text-xs text-slate-300">
                                    <li className="flex items-start">
                                        <span className="text-cyan-500 mr-2">01.</span>
                                        <span>Apply <strong>Rate Limiting</strong> to endpoint <code>/api/v1/login</code> with 5req/min per IP.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-cyan-500 mr-2">02.</span>
                                        <span>Enforce <strong>Geofencing</strong> on database export calls outside known HQ IPs.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-cyan-500 mr-2">03.</span>
                                        <span>Rotate <strong>SSL Certificates</strong> and audit session tokens for IP <code>112.55.99.1</code>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">
                        <h3 className="text-white font-bold mb-6 flex items-center tracking-tight">
                            <History className="mr-2 text-cyan-500" size={18} />
                            HISTORY
                        </h3>
                        <div className="space-y-4">
                            {[
                                { date: '2026-03-14', title: 'Weekly SecOps Summary', type: 'PDF' },
                                { date: '2026-03-10', title: 'Intrusion Attempt Log', type: 'JSON' },
                                { date: '2026-03-01', title: 'Monthly Infrastructure Audit', type: 'PDF' },
                            ].map((report, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors cursor-pointer group rounded-lg">
                                    <div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{report.date}</div>
                                        <div className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">{report.title}</div>
                                    </div>
                                    <Download size={14} className="text-slate-600 group-hover:text-white" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function History({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
        </svg>
    );
}
