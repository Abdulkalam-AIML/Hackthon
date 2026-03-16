import { NextApiRequest, NextApiResponse } from 'next';
import { ThreatLensAI } from '@/lib/ai-engine';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { logs } = req.body;
        if (!logs || !Array.isArray(logs)) {
            return res.status(400).json({ message: 'Invalid logs format' });
        }

        const threats = ThreatLensAI.analyze(logs);
        const riskScore = ThreatLensAI.calculateSystemRisk(threats);

        res.status(200).json({
            success: true,
            threats,
            riskScore,
            summary: {
                totalLogs: logs.length,
                totalThreats: threats.length,
                criticalThreats: threats.filter(t => t.risk_score >= 90).length
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: (error as Error).message });
    }
}
