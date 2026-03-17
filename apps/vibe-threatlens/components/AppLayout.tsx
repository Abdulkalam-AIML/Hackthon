"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Search,
    FileText,
    MessageSquare,
    Settings,
    ShieldAlert,
    Menu,
    X,
    Terminal,
    Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Logs', icon: Search, href: '/analyzer' },
    { name: 'Alerts', icon: FileText, href: '/reports' },
    { name: 'Threat Intelligence', icon: MessageSquare, href: '/chat' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 scanline relative">
            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 z-40 h-screen transition-transform bg-slate-900 border-r border-slate-800",
                isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"
            )}>
                <div className="flex flex-col h-full px-3 py-4 overflow-y-auto">
                    <Link href="/" className="flex items-center ps-2.5 mb-10">
                        <ShieldAlert className="h-8 w-8 text-cyan-500 mr-2" />
                        <span className={cn("self-center text-xl font-semibold whitespace-nowrap text-white", !isSidebarOpen && "hidden")}>
                            ThreatLens AI
                        </span>
                    </Link>

                    <ul className="space-y-4 font-medium flex-1">
                        {sidebarItems.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className={cn(
                                    "flex items-center p-2 rounded-lg transition-colors group",
                                    pathname === item.href
                                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}>
                                    <item.icon className="w-6 h-6" />
                                    <span className={cn("ms-3", !isSidebarOpen && "hidden")}>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Demo Zones Section */}
                    <div className={cn("px-2 py-4 mt-4 border-t border-slate-800", !isSidebarOpen && "hidden")}>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4 px-2">Demo Ecosystem</div>
                        <div className="space-y-2">
                            <Link href="https://vibe-office.vercel.app" target="_blank" className="flex items-center space-x-3 p-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-blue-400 hover:bg-blue-500/10 transition-all group">
                                <Building2 size={16} className="group-hover:scale-110 transition-transform" />
                                <span className="text-[11px] font-bold uppercase">Vibe Office Portal</span>
                            </Link>
                            <Link href="https://vibe-simulator.vercel.app" target="_blank" className="flex items-center space-x-3 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 transition-all group">
                                <Terminal size={16} className="group-hover:scale-110 transition-transform animate-pulse" />
                                <span className="text-[11px] font-bold uppercase">Vibe Storm Simulator</span>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-auto p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div className={cn("flex items-center", !isSidebarOpen && "justify-center")}>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                            <span className={cn("text-xs text-slate-400", !isSidebarOpen && "hidden")}>System Secure</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "transition-all duration-300",
                isSidebarOpen ? "md:ml-64" : "md:ml-20"
            )}>
                {/* Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-8 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-400">
                            API STATUS: <span className="text-emerald-500">OPTIMAL</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                            AK
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
