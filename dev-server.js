import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import path from 'path';
import { fileURLToPath } from 'url';

// ES 모듈에서 __dirname 사용을 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// API 엔드포인트: 삼행시 생성
app.post('/api/generate', async (req, res) => {
    try {
        const { word } = req.body;

        // 입력 검증
        if (!word || typeof word !== 'string') {
            return res.status(400).json({ error: '단어를 입력해주세요.' });
        }

        if (word.length !== 3) {
            return res.status(400).json({ error: '정확히 3글자를 입력해주세요.' });
        }

        // API 키 확인
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            console.error('ANTHROPIC_API_KEY is not set');
            return res.status(500).json({ error: '서버 설정 오류가 발생했습니다. .env 파일에 ANTHROPIC_API_KEY를 설정해주세요.' });
        }

        // Claude API 클라이언트 생성
        const client = new Anthropic({
            apiKey: apiKey,
        });

        // System prompt
        const systemPrompt = `당신은 삼행시 작가입니다.
사용자가 입력한 3글자로 삼행시를 작성하세요.

규칙:
1. 각 글자로 시작하는 문장을 작성합니다
2. 긍정적이고 유머러스한 톤을 유지합니다
3. 각 줄은 자연스럽게 이어져야 합니다

출력 형식 (반드시 이 형식만 출력):
[첫번째글자]: [문장]
[두번째글자]: [문장]
[세번째글자]: [문장]

주의: 삼행시 3줄만 출력하세요. 인사말, 설명, 부연설명 등 다른 텍스트는 절대 포함하지 마세요.`;

        console.log(`삼행시 생성 요청: "${word}"`);

        // Claude API 호출
        const message = await client.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 20000,
            temperature: 1,
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: word
                        }
                    ]
                }
            ]
        });

        // 응답에서 텍스트 추출
        const poem = message.content[0].text;
        console.log(`삼행시 생성 완료:\n${poem}`);

        // 결과 반환
        return res.status(200).json({ poem });

    } catch (error) {
        console.error('Error generating poem:', error);

        // API 에러 처리
        if (error.status === 401) {
            return res.status(500).json({ error: 'API 인증 오류가 발생했습니다.' });
        }

        if (error.status === 429) {
            return res.status(429).json({ error: 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' });
        }

        return res.status(500).json({
            error: '삼행시 생성 중 오류가 발생했습니다.',
            details: error.message
        });
    }
});

// 헬스체크 엔드포인트
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: '삼행시 생성기 API 서버가 정상 작동 중입니다.',
        apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 삼행시 생성기 개발 서버 실행 중`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔑 API Key 설정: ${process.env.ANTHROPIC_API_KEY ? '✅' : '❌ (.env 파일 확인 필요)'}`);
    console.log('='.repeat(50));
});
