import { NextRequest, NextResponse } from 'next/server';
import { ThreatLensAI, LogEntry } from '@/lib/ai-engine';

let globalLogs: LogEntry[] = [];

// Helper to add CORS to response
function addCORS(res: NextResponse) {
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res;
}

export async function OPTIONS() {
    return addCORS(new NextResponse(null, { status: 204 }));
}

export async function POST(req: NextRequest) {
    try {
        const log: LogEntry = await req.json();
        globalLogs.push(log);

        // Keep only last 200 logs to stay memory efficient
        if (globalLogs.length > 200) globalLogs.shift();

        const threats = ThreatLensAI.analyze(globalLogs);
        const riskScore = ThreatLensAI.calculateSystemRisk(threats);

        return addCORS(NextResponse.json({
            status: 'received',
            threatCount: threats.length,
            currentRiskScore: riskScore
        }));
    } catch (error) {
        return addCORS(NextResponse.json({ message: 'Error processing log' }, { status: 400 }));
    }
}

export async function GET() {
    // If empty dashboard, add one "System Initialized" log
    if (globalLogs.length === 0) {
        globalLogs.push({
            timestamp: new Date().toISOString(),
            ip_address: '127.0.0.1',
            endpoint: '/system',
            status: 200,
            login_attempts: 0
        });
    }

    const threats = ThreatLensAI.analyze(globalLogs);
    const riskScore = ThreatLensAI.calculateSystemRisk(threats);

    return addCORS(NextResponse.json({
        logs: globalLogs,
        threats: threats,
        riskScore: riskScore
    }));
}

export async function DELETE() {
    globalLogs = [];
    return addCORS(NextResponse.json({ message: 'Reset successful' }));
}
