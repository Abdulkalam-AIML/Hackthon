"use client";

import React from 'react';
import { Building2, LayoutDashboard, Users, FileText, Settings, Bell, LogOut, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OfficeDashboard() {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col hidden md:flex">
                <div className="p-6 flex items-center space-x-3 text-white">
                    <Building2 className="text-blue-500" size={24} />
                    <span className="font-bold tracking-tight">NexusCorp</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <NavItem icon={<Users size={20} />} label="Employees" />
                    <NavItem icon={<FileText size={20} />} label="Documents" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">AD</div>
                        <div className="text-xs">
                            <div className="text-white font-bold">Admin User</div>
                            <div>System Admin</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <h2 className="font-bold text-slate-800">Operational Overview</h2>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Bell size={20} />
                        </button>
                        <button className="flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                <div className="p-8 overflow-y-auto">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start space-x-4 mb-8">
                        <div className="bg-emerald-500 text-white p-2 rounded-xl">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-emerald-900 text-lg">Login Successful</h3>
                            <p className="text-emerald-700 font-medium">Welcome back to the corporate intranet. All systems are operational.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard label="Total Projects" value="12" change="+3 this month" />
                        <StatCard label="Pending Tasks" value="48" change="-5 today" />
                        <StatCard label="Storage Used" value="84%" change="Normal" />
                    </div>

                    <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-xl mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm">Quarterly Report Update</div>
                                            <div className="text-slate-400 text-xs">Updated 2 hours ago by HR Dept</div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">DOC-542</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <a href="#" className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm",
            active ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "hover:bg-slate-800 hover:text-white"
        )}>
            {icon}
            <span>{label}</span>
        </a>
    );
}

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</div>
            <div className="text-3xl font-black text-slate-900 mb-2">{value}</div>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded-md">{change}</div>
        </div>
    );
}
