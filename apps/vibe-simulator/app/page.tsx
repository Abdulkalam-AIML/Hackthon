"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, Zap, Target, Sliders, Play, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HackerSimulator() {
    const [targetEmail, setTargetEmail] = useState('admin@company.com');
    const [attempts, setAttempts] = useState(15);
    const [logs, setLogs] = useState<string[]>([]);
    const [isAttacking, setIsAttacking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const addLog = (text: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`]);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const runAttack = async () => {
        setIsAttacking(true);
        setLogs([]);
        addLog(`INITIALIZING BRUTE FORCE ATTACK ON ${targetEmail.toUpperCase()}`);
        addLog(`BYPASSING EDGE FIREWALL... [SUCCESS]`);
        addLog(`INJECTING LOGIN PACKETS [COUNT: ${attempts}]`);

        for (let i = 1; i <= attempts; i++) {
            await new Promise(r => setTimeout(r, 400 + Math.random() * 600));

            try {
                const officeUrl = process.env.NEXT_PUBLIC_OFFICE_URL || 'https://vibe-office.vercel.app';
                const res = await fetch(`${officeUrl}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: targetEmail, password: `wrong_pass_${i}` })
                });

                if (res.status === 401) {
                    addLog(`ATTEMPT ${i}: FAILED LOGIN - ACCESS DENIED`);
                } else {
                    addLog(`ATTEMPT ${i}: UNEXPECTED RESPONSE CODE [${res.status}]`);
                }
            } catch (err) {
                addLog(`ATTEMPT ${i}: CONNECTION DROPPED - RETRYING...`);
            }

            if (i === 10) {
                addLog(`WARNING: MONITORING SYSTEM DETECTED SPIKE`);
            }
        }

        addLog(`ATTACK SEQUENCE COMPLETED.`);
        addLog(`STATUS: 100% BLOCKED | SYSTEM RISK SCORE: 92%`);
        setIsAttacking(false);
    };

    return (
        <div className="min-h-screen bg-black text-emerald-500 font-mono p-4 md:p-8 flex flex-col selection:bg-emerald-500/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-emerald-900/50 pb-4">
                <div className="flex items-center space-x-3">
                    <Terminal size={28} className="animate-pulse" />
                    <h1 className="text-xl font-black tracking-tighter uppercase">ShadowLens v4.0 // Terminal</h1>
                </div>
                <div className="px-3 py-1 border border-emerald-900 bg-emerald-950/30 rounded text-[10px] animate-pulse">
                    CONNECTION: ENCRYPTED.RELAY
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="p-6 bg-slate-950 border border-emerald-900/30 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-6 flex items-center">
                            <Sliders size={14} className="mr-2" /> Target Parameters
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] uppercase text-emerald-900 font-bold mb-2">Target Identifier</label>
                                <div className="relative">
                                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-900" size={16} />
                                    <input
                                        type="text"
                                        value={targetEmail}
                                        onChange={(e) => setTargetEmail(e.target.value)}
                                        className="w-full bg-black border border-emerald-900/50 rounded-lg py-3 pl-10 pr-4 text-emerald-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-[10px] uppercase text-emerald-900 font-bold mb-2">
                                    <span>Attempt Load</span>
                                    <span>{attempts} Requests</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={attempts}
                                    onChange={(e) => setAttempts(parseInt(e.target.value))}
                                    className="w-full accent-emerald-500 bg-emerald-950 h-1.5 rounded-full"
                                />
                            </div>

                            <button
                                onClick={runAttack}
                                disabled={isAttacking}
                                className={cn(
                                    "w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-2",
                                    isAttacking
                                        ? "bg-emerald-950/50 text-emerald-900 cursor-wait"
                                        : "bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                )}
                            >
                                {isAttacking ? (
                                    <>
                                        <Zap size={18} className="animate-bounce" />
                                        <span>Infiltrating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play size={18} fill="currentColor" />
                                        <span>Start Brute Force</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="p-6 bg-red-950/10 border border-red-900/20 rounded-2xl">
                        <div className="flex items-center text-red-500 text-[10px] font-black uppercase mb-3">
                            <ShieldAlert size={14} className="mr-2" /> Security Notice
                        </div>
                        <p className="text-[10px] text-red-900 leading-relaxed font-bold">
                            ATTENTION: THIS INTERFACE IS FOR AUTHORIZED PENTESTING ONLY. ALL REQUESTS ARE LOGGED TO THE DEMO SECURITY ORCHESTRATOR.
                        </p>
                    </div>
                </div>

                {/* Terminal */}
                <div className="lg:col-span-2 bg-slate-950 border border-emerald-900/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                    <div className="px-6 py-3 bg-emerald-950/20 border-b border-emerald-900/30 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-900" />
                            <div className="w-2 h-2 rounded-full bg-emerald-900" />
                            <div className="w-2 h-2 rounded-full bg-emerald-900" />
                        </div>
                        <div className="text-[10px] font-bold tracking-[0.3em] text-emerald-900 uppercase">Vector.Stream.Output</div>
                    </div>

                    <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-2 scrolbar-none h-[500px]">
                        {logs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full opacity-20">
                                <Terminal size={48} className="mb-4" />
                                <span className="text-xs uppercase tracking-widest">Awaiting Uplink...</span>
                            </div>
                        ) : (
                            logs.map((log, idx) => (
                                <div key={idx} className="flex space-x-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <span className="text-emerald-900 shrink-0">[{idx.toString().padStart(3, '0')}]</span>
                                    <span className={cn(
                                        "text-sm leading-tight",
                                        log.includes('FAILED') ? "text-red-500 font-bold" :
                                            log.includes('WARNING') ? "text-amber-500 font-bold" : ""
                                    )}>{log}</span>
                                </div>
                            ))
                        )}
                        {isAttacking && (
                            <div className="flex items-center space-x-2 text-emerald-500 animate-pulse">
                                <span>_</span>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-emerald-950/10 border-t border-emerald-900/30 text-[9px] text-emerald-900 font-bold flex justify-between">
                        <span>LOCAL.IP: 127.0.0.1</span>
                        <span>TARGET: {targetEmail}</span>
                        <span>UPTIME: 03:22:45</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
