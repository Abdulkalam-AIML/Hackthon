"use client";

import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import {
    Send,
    Bot,
    User,
    ShieldAlert,
    ShieldCheck,
    Zap,
    RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "SYSTEM INITIALIZED. I am the ThreatLens AI Copilot. I can explain detected anomalies, help you understand risk scores, or suggest mitigation steps. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsTyping(true);

        // Simulate AI response (since we don't have a real Gemini API key in this env)
        setTimeout(() => {
            let response = "";
            if (userMessage.toLowerCase().includes("brute force")) {
                response = "A brute force attack involves an attacker attempting to gain access by systematically trying every possible password. Our system detected multiple 401 Unauthorized responses from the same IP (185.22.31.11) which is a high-confidence indicator of such an attack. Recommendation: Implement IP rate limiting and enforce MFA.";
            } else if (userMessage.toLowerCase().includes("risk")) {
                response = "The system risk score is calculated based on the volume, severity, and frequency of detected anomalies. A score above 70 indicates active exploitation attempts that require immediate attention.";
            } else {
                response = "I've analyzed your query regarding the current security posture. Based on the logs, the system remains within nominal operating parameters, although I recommend reviewing the recent spike in traffic from the APAC region.";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-[75vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Chat Header */}
                <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-sm tracking-tight uppercase">Security Copilot</h2>
                            <div className="flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-2" />
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Autonomous Agent Online</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setMessages([messages[0]])}
                        className="p-2 text-slate-500 hover:text-white transition-colors"
                    >
                        <RefreshCw size={16} />
                    </button>
                </div>

                {/* Chat Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={cn(
                            "flex space-x-4 max-w-3xl",
                            msg.role === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : ""
                        )}>
                            <div className={cn(
                                "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border",
                                msg.role === 'assistant' ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-slate-800 border-slate-700 text-slate-300"
                            )}>
                                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className={cn(
                                "p-4 rounded-2xl text-sm leading-relaxed",
                                msg.role === 'assistant'
                                    ? "bg-slate-950 border border-slate-800 text-slate-300 shadow-xl"
                                    : "bg-cyan-600 text-white font-medium"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                                <Bot size={16} />
                            </div>
                            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-slate-950 border-t border-slate-800">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about detected threats or security posture..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-6 pr-14 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    <div className="mt-3 flex justify-center space-x-6">
                        <div className="flex items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                            <ShieldCheck size={10} className="mr-1 text-emerald-500" /> End-to-End Encrypted
                        </div>
                        <div className="flex items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                            <ShieldAlert size={10} className="mr-1 text-amber-500" /> Context-Aware AI
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
