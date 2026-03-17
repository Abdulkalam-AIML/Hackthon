import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
    const mockLogs = [
        {
            timestamp: new Date().toISOString(),
            ip_address: '192.168.1.105',
            email: 'admin@company.com',
            status: 401,
            endpoint: '/login',
            method: 'POST'
        },
        {
            timestamp: new Date(Date.now() - 5000).toISOString(),
            ip_address: '192.168.1.105',
            email: 'admin@company.com',
            status: 401,
            endpoint: '/login',
            method: 'POST'
        },
        {
            timestamp: new Date(Date.now() - 10000).toISOString(),
            ip_address: '102.15.54.1',
            email: 'user@gmail.com',
            status: 200,
            endpoint: '/dashboard',
            method: 'GET'
        }
    ];

    const threats = [
        {
            ip: '192.168.1.105',
            threat_type: "Brute Force Attack",
            risk_score: 88,
            timestamp: new Date().toISOString(),
            details: "Detected 12 failed login attempts from this IP."
        }
    ];

    return NextResponse.json({
        riskScore: 65,
        threats: threats,
        logs: mockLogs
    });
}
