import { NextApiRequest, NextApiResponse } from 'next';
import { AttackSimulator } from '@/lib/simulator';
import { ThreatLensAI } from '@/lib/ai-engine';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const logs = AttackSimulator.getFullSimulation();
        const threats = ThreatLensAI.analyze(logs);
        const riskScore = ThreatLensAI.calculateSystemRisk(threats);

        res.status(200).json({
            success: true,
            logs,
            threats,
            riskScore
        });
    } catch (error) {
        res.status(500).json({ success: false, error: (error as Error).message });
    }
}
