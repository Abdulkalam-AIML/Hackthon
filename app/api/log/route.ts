import { NextRequest, NextResponse } from 'next/server';
import { ThreatLensAI, LogEntry } from '@/lib/ai-engine';

// In-memory store for demo session (In real app, use Redis/Postgres)
let globalLogs: LogEntry[] = [];

export async function POST(req: NextRequest) {
    try {
        const log: LogEntry = await req.json();

        // Add to our global list
        globalLogs.push(log);

        // Run AI analysis on the recent window
        const threats = ThreatLensAI.analyze(globalLogs.slice(-100));
        const riskScore = ThreatLensAI.calculateSystemRisk(threats);

        // If a threat is detected, we could trigger a webhook/alert here

        return NextResponse.json({
            status: 'received',
            threatCount: threats.length,
            currentRiskScore: riskScore
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid log format' }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({
        logs: globalLogs,
        count: globalLogs.length
    });
}

export async function DELETE() {
    globalLogs = [];
    return NextResponse.json({ message: 'Logs cleared' });
}
