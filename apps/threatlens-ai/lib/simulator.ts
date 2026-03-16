import { LogEntry } from "./ai-engine";

export class AttackSimulator {
    static generateBruteForce(ip: string = "185.22.31.11"): LogEntry[] {
        const logs: LogEntry[] = [];
        const now = new Date();
        for (let i = 0; i < 15; i++) {
            logs.push({
                timestamp: new Date(now.getTime() - (15 - i) * 1000).toISOString(),
                ip_address: ip,
                endpoint: "/api/v1/login",
                status: 401,
                login_attempts: 1
            });
        }
        return logs;
    }

    static generateTrafficSpike(ip: string = "45.12.88.22"): LogEntry[] {
        const logs: LogEntry[] = [];
        const now = new Date();
        for (let i = 0; i < 60; i++) {
            logs.push({
                timestamp: new Date(now.getTime() - (60 - i) * 500).toISOString(),
                ip_address: ip,
                endpoint: "/api/v1/resource",
                status: 200,
                login_attempts: 0
            });
        }
        return logs;
    }

    static generateDataExfiltration(ip: string = "112.55.99.1"): LogEntry[] {
        const logs: LogEntry[] = [];
        const now = new Date();
        logs.push({
            timestamp: now.toISOString(),
            ip_address: ip,
            endpoint: "/api/v1/export/database",
            status: 200,
            login_attempts: 0,
            request_count: 5000 // High volume simulation field
        } as any);
        return logs;
    }

    static generateNormalTraffic(): LogEntry[] {
        const ips = ["192.168.1.1", "10.0.0.5", "172.16.0.20"];
        const endpoints = ["/", "/dashboard", "/settings", "/profile"];
        const logs: LogEntry[] = [];
        const now = new Date();

        for (let i = 0; i < 100; i++) {
            logs.push({
                timestamp: new Date(now.getTime() - Math.random() * 3600000).toISOString(),
                ip_address: ips[Math.floor(Math.random() * ips.length)],
                endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
                status: 200,
                login_attempts: 0
            });
        }
        return logs;
    }

    static getFullSimulation(): LogEntry[] {
        return [
            ...this.generateNormalTraffic(),
            ...this.generateBruteForce(),
            ...this.generateTrafficSpike(),
            ...this.generateDataExfiltration()
        ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
}
