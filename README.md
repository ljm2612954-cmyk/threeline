# 삼행시 생성기

Claude AI를 활용한 재미있는 삼행시 생성 웹 앱입니다.

## 기능

- 3글자 단어 입력
- Claude API를 통한 AI 삼행시 생성
- 깔끔하고 모던한 UI/UX
- 반응형 디자인 (모바일 대응)
- 로딩 애니메이션

## 기술 스택

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Vercel Serverless Functions
- **AI**: Claude Sonnet 4.5 API
- **Deployment**: Vercel

## 프로젝트 구조

```
threeline/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # 프론트엔드 로직
├── api/
│   └── generate.js     # Vercel Serverless Function (Claude API 호출)
├── package.json        # 프로젝트 설정 및 의존성
├── .env                # 환경변수 (gitignore에 추가 필요)
├── .env.example        # 환경변수 예시
└── README.md           # 프로젝트 문서
```

## 로컬 개발 환경 설정

### 1. 필수 조건

- Node.js 18 이상
- npm 또는 yarn
- Claude API Key ([Anthropic Console](https://console.anthropic.com/)에서 발급)

### 2. 설치

```bash
# 의존성 설치
npm install

# Vercel CLI 전역 설치 (선택사항)
npm install -g vercel
```

### 3. 환경변수 설정

`.env.example` 파일을 `.env`로 복사하고 API 키를 설정합니다:

```bash
cp .env.example .env
```

`.env` 파일을 열고 API 키를 입력:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 4. 로컬 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## Vercel 배포

### 1. Vercel 계정 생성

[Vercel](https://vercel.com/)에 가입합니다.

### 2. 프로젝트 배포

#### 방법 1: Vercel CLI 사용

```bash
# Vercel 로그인
vercel login

# 배포
vercel --prod
```

#### 방법 2: GitHub 연동

1. GitHub에 프로젝트 푸시
2. Vercel 대시보드에서 "Import Project" 선택
3. GitHub 레포지토리 연결
4. 자동 배포 설정

### 3. 환경변수 설정 (중요!)

Vercel 대시보드에서:

1. 프로젝트 선택
2. Settings > Environment Variables 메뉴
3. `ANTHROPIC_API_KEY` 추가
4. Production, Preview, Development 모두 체크
5. Save

### 4. 재배포

환경변수 설정 후 프로젝트를 재배포합니다:

```bash
vercel --prod
```

## API 사용량 및 비용

- Claude Sonnet 4.5 모델 사용
- 요금은 [Anthropic Pricing](https://www.anthropic.com/pricing) 참고
- API 키 관리에 주의하세요 (절대 클라이언트에 노출하지 말 것)

## 보안

- API 키는 **절대 클라이언트 코드에 포함하지 마세요**
- `.env` 파일은 `.gitignore`에 추가하세요
- Vercel의 Environment Variables를 통해서만 API 키 관리
- Serverless Function을 통해 API 호출을 처리하여 키 노출 방지

## 라이선스

MIT

## 문의

문제가 발생하거나 제안사항이 있으시면 이슈를 등록해주세요.
