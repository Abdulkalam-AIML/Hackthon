import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const forwarded = req.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

        // Demo logic
        const isSuccess = email === 'admin@company.com' && password === 'admin123';

        const logEntry = {
            timestamp: new Date().toISOString(),
            ip_address: ip,
            email: email,
            status: isSuccess ? 200 : 401,
            endpoint: '/login',
            method: 'POST'
        };

        // Send log to ThreatLens API (Simulating external call)
        // In a real hackathon, this would be an absolute URL: https://threatlens-ai.vercel.app/api/log
        // For local demo, we call the local route
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        try {
            await fetch(`${baseUrl}/api/log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logEntry)
            });
        } catch (err) {
            console.error('Failed to send log to ThreatLens:', err);
        }

        if (isSuccess) {
            return NextResponse.json({ message: 'Login successful' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
