import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiClient } from './_lib/analyzer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { hasApiKey } = getGeminiClient();
    return res.status(200).json({
      success: true,
      status: 'ok',
      hasApiKey,
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL ? 'vercel-serverless' : 'node-runtime',
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: {
        message: err.message || '서버 상태 확인 중 오류가 발생했습니다.',
        code: 'HEALTH_CHECK_ERROR',
      },
    });
  }
}
