"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import {
    Search,
    Upload,
    FileJson,
    FileDown,
    Filter,
    ArrowRight,
    ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CyberTerminal from '@/components/CyberTerminal';

export default function AnalyzerPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleSimulate = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/simulate', { method: 'POST' });
            const data = await res.json();
            setLogs(data.logs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="flex flex-col space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">LOG ANALYZER</h1>
                        <p className="text-slate-500 mt-1">Audit, filter, and inspect system log streams for anomalies.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleSimulate}
                            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-sm font-bold hover:bg-slate-800 transition-colors flex items-center"
                        >
                            <Zap size={16} className="mr-2 text-cyan-400" />
                            SIMULATE STREAM
                        </button>
                        <button className="px-4 py-2 bg-cyan-600 rounded-lg text-white text-sm font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/20">
                            EXPORT ARCHIVE
                        </button>
                    </div>
                </div>

                {/* Live Stream Terminal (V2) */}
                <CyberTerminal logs={logs} />

                {/* Upload Zone */}
                <div
                    className={cn(
                        "border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center space-y-4",
                        dragActive ? "border-cyan-500 bg-cyan-500/5" : "border-slate-800 bg-slate-900/50 hover:bg-slate-900"
                    )}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                >
                    <div className="p-4 bg-slate-800 rounded-full text-cyan-500">
                        <Upload size={32} />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-slate-200">Drop log files here or <span className="text-cyan-400 cursor-pointer">browse</span></p>
                        <p className="text-sm text-slate-500 mt-1">Supports CSV, JSON and raw syslog formats up to 50MB</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by IP, endpoint, or status..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <button className="p-2 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                        <Filter size={18} />
                    </button>
                </div>

                {/* Logs Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-950 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-800">
                            <tr>
                                <th className="py-4 px-6 font-bold">Timestamp</th>
                                <th className="py-4 px-6 font-bold">Source IP</th>
                                <th className="py-4 px-6 font-bold">Endpoint</th>
                                <th className="py-4 px-6 font-bold text-center">Status</th>
                                <th className="py-4 px-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {logs.length > 0 ? logs.slice(0, 15).map((log, i) => (
                                <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="py-4 px-6 text-slate-400 font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                                    <td className="py-4 px-6">
                                        <span className="text-cyan-400 font-mono">{log.ip_address}</span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-300 font-medium">{log.endpoint}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-bold",
                                                log.status < 300 ? "bg-emerald-500/10 text-emerald-500" :
                                                    log.status < 500 ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                                            )}>
                                                {log.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="p-1 px-3 bg-slate-800 text-slate-400 rounded text-xs hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                            Trace
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-slate-600 italic">
                                        No logs analyzed in this session.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

// Re-using Zap from lucide-react (defined in previous blocks but making sure it works here)
function Zap({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 14.899 9 3h3l-2.5 9h5.5l-5 9h-3.5L9 12H4z" />
        </svg>
    );
}
