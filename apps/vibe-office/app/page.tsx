"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OfficeLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setEmail('');
                setPassword('');
                setError('Login Successful (Demo)');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection refused. Is security active?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative">
            <a
                href="https://threatmointors.vercel.app"
                className="absolute top-6 left-6 flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100"
            >
                <Shield size={16} />
                <span>Back to Monitoring</span>
            </a>
            <div className="w-full max-w-md">
                {/* Branding */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200 mb-6">
                        <Building2 className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">NexusCorp Internal</h1>
                    <p className="text-slate-500 mt-2">Employee Integrated Access Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Corporate Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-600 text-sm animate-shake">
                                    <Shield size={16} className="mr-2 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-70"
                            >
                                <span>{loading ? 'Verifying...' : 'Sign In'}</span>
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>
                    </div>

                    <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                        <span>Secure 256-bit AES Encryption</span>
                        <a href="#" className="hover:text-blue-600 font-semibold">Need Help?</a>
                    </div>
                </div>

                {/* Demo Note */}
                <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                    <p className="text-blue-800 text-xs font-semibold">
                        DEMO ACCOUNT: <span className="text-blue-600 font-mono">admin@company.com / admin123</span>
                    </p>
                </div>
            </div>

            <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
        </div>
    );
}
