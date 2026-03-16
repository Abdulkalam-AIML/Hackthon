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

        const response = NextResponse.json({
            status: 'received',
            threatCount: threats.length,
            currentRiskScore: riskScore
        }, { status: 200 });

        // Add CORS headers for multi-app support
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Invalid log format' }, { status: 400 });
    }
}

export async function OPTIONS() {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
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
