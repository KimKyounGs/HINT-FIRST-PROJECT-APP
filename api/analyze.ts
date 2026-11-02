import type { VercelRequest, VercelResponse } from '@vercel/node';
import { analyzeJobFit } from './_lib/analyzer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: {
        message: '지원하지 않는 HTTP 메소드입니다. POST 요청을 사용해주세요.',
        code: 'METHOD_NOT_ALLOWED',
      },
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: {
            message: '요청 본문이 유효한 JSON 형식이 아닙니다.',
            code: 'INVALID_JSON_BODY',
          },
        });
      }
    }

    const { userProfile, jobPosting } = body || {};

    if (!userProfile || !jobPosting) {
      return res.status(400).json({
        success: false,
        error: {
          message: '사용자 스펙(userProfile)과 채용 공고(jobPosting) 데이터가 모두 필요합니다.',
          code: 'MISSING_REQUIRED_FIELDS',
        },
      });
    }

    const { result, source } = await analyzeJobFit(userProfile, jobPosting);

    return res.status(200).json({
      success: true,
      data: result,
      analyzedAt: new Date().toISOString(),
      source,
    });
  } catch (err: any) {
    console.error('API /api/analyze error:', err);
    return res.status(500).json({
      success: false,
      error: {
        message: err.message || '직무 적합도 분석 중 서버 오류가 발생했습니다.',
        code: 'ANALYSIS_EXECUTION_ERROR',
      },
    });
  }
}
