"use client";

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import {
    ShieldCheck,
    ShieldAlert,
    History,
    Activity,
    Zap,
    Lock,
    Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Threat, ThreatLensAI } from '@/lib/ai-engine';
import GlobalThreatMap from '@/components/GlobalThreatMap';

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch live logs from the external API
                const liveRes = await fetch('/api/log');
                const liveData = await liveRes.json();

                if (liveData.logs && liveData.logs.length > 0) {
                    // Process live logs through AI engine on the client side for reactivity
                    const threats = ThreatLensAI.analyze(liveData.logs);
                    const riskScore = ThreatLensAI.calculateSystemRisk(threats);

                    setData({
                        riskScore,
                        threats,
                        logs: liveData.logs
                    });
                } else {
                    // Fallback to simulation if no live logs yet
                    const simRes = await fetch('/api/simulate', { method: 'POST' });
                    const simData = await simRes.json();
                    setData(simData);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-slate-400 animate-pulse text-sm uppercase tracking-widest font-bold">Initializing Data Pipeline...</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const { riskScore, threats, logs } = data;

    // Prepare chart data
    const timelineData = threats.map((t: Threat, i: number) => ({
        time: new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: t.risk_score,
        type: t.threat_type
    })).slice(-10);

    const loginStats = [
        { name: 'Mon', attempts: 400 },
        { name: 'Tue', attempts: 300 },
        { name: 'Wed', attempts: 600 },
        { name: 'Thu', attempts: 800 },
        { name: 'Fri', attempts: 500 },
        { name: 'Sat', attempts: 200 },
        { name: 'Sun', attempts: 100 },
    ];

    return (
        <AppLayout>
            <div className="mb-8 p-1 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 w-full">
                    <GlobalThreatMap threats={threats} />
                </div>
                <div className="p-4 flex flex-col items-center justify-center space-y-2">
                    <button
                        onClick={async () => {
                            if (confirm('Are you sure you want to clear system logs and reset the demo?')) {
                                await fetch('/api/log', { method: 'DELETE' });
                                window.location.reload();
                            }
                        }}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-400 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 transition-all flex items-center"
                    >
                        <Zap size={14} className="mr-2" /> RESET SYSTEM
                    </button>
                    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">Debug Mode v1.2</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Threat Score Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <ShieldAlert size={80} className={riskScore > 70 ? "text-red-500" : "text-cyan-500"} />
                    </div>
                    <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-tight">System Risk Score</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className={cn(
                            "text-5xl font-black tracking-tighter",
                            riskScore > 70 ? "text-red-500" : riskScore > 40 ? "text-amber-500" : "text-cyan-500"
                        )}>
                            {riskScore}
                        </span>
                        <span className="text-slate-500 text-sm">/ 100</span>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                        <span className={cn(
                            "px-2 py-0.5 rounded-full mr-2",
                            riskScore > 70 ? "bg-red-500/10 text-red-500" : "bg-cyan-500/10 text-cyan-400"
                        )}>
                            {riskScore > 70 ? "CRITICAL" : "STABLE"}
                        </span>
                        <span className="text-slate-500">Updated just now</span>
                    </div>
                </div>

                {/* Global Traffic */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-tight">Total Requests</h3>
                        <Globe size={18} className="text-cyan-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-100">{logs.length}</div>
                    <div className="mt-4 h-1 items-center flex">
                        <div className="bg-cyan-500 h-1 rounded-full w-3/4" />
                        <div className="bg-slate-800 h-1 rounded-full w-1/4" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">75% capacity utilized</p>
                </div>

                {/* Detected Threats */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-tight">Anomalies Detected</h3>
                        <ShieldAlert size={18} className="text-red-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-100">{threats.length}</div>
                    <p className="text-xs text-red-500/80 mt-2 flex items-center">
                        <Activity size={12} className="mr-1" />
                        +12.5% from last session
                    </p>
                </div>

                {/* Health Check */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-tight">System Health</h3>
                        <Zap size={18} className="text-emerald-500" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-500">99.8%</div>
                    <p className="text-xs text-slate-500 mt-2">All nodes operational</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-slate-100 text-lg font-bold mb-6 flex items-center">
                            <Activity className="mr-2 text-cyan-500" size={20} />
                            Threat Timeline Analysis
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={timelineData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#22d3ee' }}
                                    />
                                    <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center">
                            <History className="mr-2 text-cyan-500" size={20} />
                            Recent Security Alerts
                        </h3>
                        <div className="space-y-4">
                            {threats.slice(0, 5).map((threat: Threat, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className={cn(
                                            "p-2 rounded-full",
                                            threat.risk_score > 80 ? "bg-red-500/10 text-red-500" : "bg-cyan-500/10 text-cyan-500"
                                        )}>
                                            <ShieldAlert size={18} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-100">{threat.threat_type}</div>
                                            <div className="text-xs text-slate-500">{threat.ip} • {new Date(threat.timestamp).toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={cn(
                                            "text-sm font-bold",
                                            threat.risk_score > 80 ? "text-red-500" : "text-cyan-400"
                                        )}>
                                            Score: {threat.risk_score}
                                        </div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Components */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center">
                            <Lock className="mr-2 text-cyan-500" size={20} />
                            Login Attempts
                        </h3>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={loginStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: '#1e293b' }}
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                                    />
                                    <Bar dataKey="attempts" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-white text-lg font-bold mb-4">Top Suspicious IPs</h3>
                        <table className="w-full text-left text-sm">
                            <thead className="text-slate-500 uppercase text-[10px] font-bold">
                                <tr>
                                    <th className="pb-3 px-2">IP Address</th>
                                    <th className="pb-3 px-2 text-right">Activity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {Array.from(new Set(threats.map((t: Threat) => t.ip))).slice(0, 5).map((ip: any, i: number) => (
                                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-3 px-2 text-cyan-400 font-mono">{ip}</td>
                                        <td className="py-3 px-2 text-right text-slate-400">High Risk</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
