"use client";

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TerminalLine {
    text: string;
    type: 'log' | 'info' | 'alert';
}

export default function CyberTerminal({ logs }: { logs: any[] }) {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logs.length > 0) {
            const newLines = logs.map(log => ({
                text: `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.ip_address} -> ${log.endpoint} [${log.status}]`,
                type: (log.status >= 400 ? 'alert' : 'log') as any
            }));
            setLines(newLines);
        }
    }, [logs]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-mono text-[11px] h-[300px] group shadow-2xl">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                </div>
                <div className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">Live.Log.Stream.v4</div>
            </div>

            <div ref={scrollRef} className="p-4 overflow-y-auto h-[calc(100%-36px)] space-y-1 scrollbar-none">
                {lines.length === 0 ? (
                    <div className="text-slate-600 animate-pulse">Awaiting incoming data stream...</div>
                ) : (
                    lines.map((line, idx) => (
                        <div key={idx} className={cn(
                            "whitespace-nowrap overflow-hidden transition-all duration-300",
                            line.type === 'alert' ? "text-red-500 font-bold" : "text-cyan-500/80"
                        )}>
                            <span className="text-slate-700 mr-2 opacity-50">{idx.toString().padStart(4, '0')}</span>
                            {line.text}
                        </div>
                    ))
                )}
            </div>

            {/* Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(30,41,59,0.5)] z-20" />
        </div>
    );
}
