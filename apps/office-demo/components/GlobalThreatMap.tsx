"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ThreatPoint {
    id: string;
    lat: number;
    lng: number;
    severity: number;
}

export default function GlobalThreatMap({ threats }: { threats: any[] }) {
    // Mock coordinate mapping for IPs (in a real app, this would use a GeoIP provider)
    const mapPoints = useMemo(() => {
        return threats.slice(0, 15).map((t, i) => ({
            id: `${t.ip}-${i}`,
            // Random-ish but deterministic coordinates based on IP segments for demo
            x: (parseInt(t.ip.split('.')[0]) % 100) * 8 + 100,
            y: (parseInt(t.ip.split('.')[1]) % 50) * 6 + 100,
            severity: t.risk_score
        }));
    }, [threats]);

    return (
        <div className="relative w-full aspect-[2/1] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden group">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            {/* SVG Map Container */}
            <svg className="w-full h-full" viewBox="0 0 1000 500">
                {/* Simplified World outlines (Mock) */}
                <path d="M150,150 Q250,100 350,150 T550,150 T750,200 T900,100" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="5,5" />

                {/* Dynamic Threat Points */}
                {mapPoints.map((point) => (
                    <g key={point.id} className="animate-pulse">
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={point.severity / 10}
                            className={cn(
                                "fill-current transition-all duration-1000",
                                point.severity > 80 ? "text-red-500/40" : "text-cyan-500/40"
                            )}
                        >
                            <animate attributeName="r" values={`${point.severity / 10};${point.severity / 5};${point.severity / 10}`} dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            className={point.severity > 80 ? "fill-red-500 shadow-[0_0_10px_red]" : "fill-cyan-500"}
                        />
                        {point.severity > 85 && (
                            <line
                                x1={point.x} y1={point.y}
                                x2={point.x + 20} y2={point.y - 20}
                                stroke={point.severity > 80 ? "#ef4444" : "#06b6d4"}
                                strokeWidth="1"
                                className="opacity-50"
                            />
                        )}
                    </g>
                ))}
            </svg>

            {/* Overlay UI */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md p-3 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Live Global Status</div>
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-white text-xs font-bold tracking-tight">ACTIVE VECTORS</span>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex space-x-2">
                <div className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-[9px] text-red-500 font-black">CRITICAL</div>
                <div className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[9px] text-cyan-400 font-black">OBSERVED</div>
            </div>
        </div>
    );
}
