export interface LogEntry {
  timestamp: string;
  ip_address: string;
  endpoint: string;
  status: number;
  login_attempts: number;
}

export interface Threat {
  ip: string;
  threat_type: string;
  risk_score: number;
  timestamp: string;
  details: string;
}

export class ThreatLensAI {
  private static BRUTE_FORCE_THRESHOLD = 10;
  private static SUSPICIOUS_IP_THRESHOLD = 50;
  private static TIME_WINDOW_MS = 60000; // 1 minute

  static analyze(logs: LogEntry[]): Threat[] {
    const threats: Threat[] = [];
    const ipStats: Record<string, { failedLogins: number; requestCount: number; lastSeen: number }> = {};

    // Sort logs by timestamp to process sequentially if needed
    const sortedLogs = [...logs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    sortedLogs.forEach((log) => {
      const ip = log.ip_address;
      if (!ipStats[ip]) {
        ipStats[ip] = { failedLogins: 0, requestCount: 0, lastSeen: new Date(log.timestamp).getTime() };
      }

      const stats = ipStats[ip];
      stats.requestCount++;

      if (log.status === 401 || log.status === 403) {
        stats.failedLogins += log.login_attempts || 1;
      }

      // 1. Detect Brute Force
      if (stats.failedLogins > this.BRUTE_FORCE_THRESHOLD) {
        threats.push({
          ip,
          threat_type: "Brute Force Attack",
          risk_score: Math.min(85 + (stats.failedLogins - 10), 98),
          timestamp: log.timestamp,
          details: `Detected ${stats.failedLogins} failed login attempts from this IP.`
        });
        // Reset or damp after detection to avoid duplicate alerts for same sequence
        stats.failedLogins = 0;
      }

      // 2. Detect Suspicious IP (High Frequency)
      const currentTime = new Date(log.timestamp).getTime();
      if (stats.requestCount > this.SUSPICIOUS_IP_THRESHOLD) {
        threats.push({
          ip,
          threat_type: "Suspicious IP Activity",
          risk_score: 85,
          timestamp: log.timestamp,
          details: `High request frequency: ${stats.requestCount} requests detected.`
        });
        stats.requestCount = 0; // Reset
      }

      // 3. Detect Data Exfiltration (V2)
      // (Simplified: detecting large request_count simulation field if present)
      if ((log as any).request_count > 500) {
        threats.push({
          ip,
          threat_type: "Data Exfiltration Attempt",
          risk_score: 95,
          timestamp: log.timestamp,
          details: `Abnormal data transfer volume: ${(log as any).request_count} packets in single request.`
        });
      }
    });

    return threats;
  }

  static calculateSystemRisk(threats: Threat[]): number {
    if (threats.length === 0) return 10;
    const avgRisk = threats.reduce((sum, t) => sum + t.risk_score, 0) / threats.length;
    return Math.min(Math.round(avgRisk + (threats.length * 2)), 100);
  }
}
