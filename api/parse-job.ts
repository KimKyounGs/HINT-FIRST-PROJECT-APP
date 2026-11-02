import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parseJobPosting } from './_lib/analyzer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    const { rawText, companyName, roleTitle } = body || {};

    if (!rawText && !roleTitle) {
      return res.status(400).json({
        success: false,
        error: {
          message: '공고 원문 내용 또는 직무명을 입력해주세요.',
          code: 'MISSING_INPUT_TEXT',
        },
      });
    }

    const parsed = await parseJobPosting(rawText || '', companyName, roleTitle);

    return res.status(200).json({
      success: true,
      data: parsed,
    });
  } catch (err: any) {
    console.error('API /api/parse-job error:', err);
    return res.status(500).json({
      success: false,
      error: {
        message: err.message || '공고 분석 중 서버 오류가 발생했습니다.',
        code: 'JOB_PARSE_ERROR',
      },
    });
  }
}
