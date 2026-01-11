# HR Portal - Site Revamp

코아시아 지주사 HR 포털 웹 애플리케이션

## 🎯 프로젝트 개요

코아시아 그룹의 인사(HR) 업무를 통합 관리하는 풀스택 웹 애플리케이션입니다. 채용 관리, 인사 정책, 교육 프로그램, 분석 대시보드 등 HR 전반의 기능을 제공합니다.

## ✨ 주요 기능

### 📋 채용 관리 (ATS)
- 채용 공고 관리
- 지원자 추적 시스템 (Applicant Tracking System)
- 면접 일정 관리
- 서류 심사 및 평가
- 채용 통계 및 분석

### 👥 인사 관리
- 인사 정책 가이드
- 조직 문화 소개
- 복리후생 안내
- 인사 평가 시스템
- 승진/보상 관리

### 📚 교육 프로그램
- 교육 과정 카탈로그
- 수강 신청 관리
- 학습 이력 추적
- 수료증 발급
- 교육 자료 관리

### 📊 분석 대시보드
- 채용 현황 분석
- 인력 현황 통계
- 교육 이수율 분석
- 맞춤형 리포트 생성

### 🔔 공지사항 및 지원
- 공지사항 관리
- FAQ 관리
- 문의 시스템
- 자료실

## 🛠️ 기술 스택

### Backend
- **Runtime**: Node.js 20.x
- **Framework**: Express 4.21
- **Database**: PostgreSQL (Drizzle ORM)
- **Authentication**: Passport.js (Local Strategy)
- **Session**: express-session (Memory Store)
- **File Upload**: Multer
- **WebSocket**: ws

### Frontend
- **Library**: React 18.3
- **Router**: Wouter 3.3
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS 3.4
- **State Management**: Tanstack Query 5.60
- **Animations**: Framer Motion 11.13
- **Forms**: React Hook Form 7.55
- **Validation**: Zod 3.24

### DevOps
- **Build Tool**: Vite 7.3
- **Language**: TypeScript 5.6
- **Package Manager**: npm
- **Deployment**: Render (PostgreSQL + Web Service)

## 🚀 배포

### Render 자동 배포 (권장)

1. **Render 계정 생성**
   - https://render.com 접속
   - GitHub 계정으로 로그인

2. **Blueprint로 배포**
   - Dashboard → "New +" → "Blueprint"
   - GitHub 저장소 연결: `thinkpa81/hr_jsh`
   - "Apply" 클릭

3. **배포 확인**
   - 빌드 완료 대기 (3-5분)
   - 생성된 URL로 접속: `https://hr-portal-xxxx.onrender.com`

자세한 배포 가이드: [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

### 로컬 개발

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에서 DATABASE_URL 설정

# 데이터베이스 마이그레이션
npm run db:push

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 📁 프로젝트 구조

```
webapp/
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/    # UI 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── hooks/         # 커스텀 훅
│   │   └── lib/           # 유틸리티
│   └── public/            # 정적 파일
├── server/                # Express 백엔드
│   ├── index.ts          # 서버 진입점
│   ├── routes.ts         # API 라우트
│   ├── db.ts             # 데이터베이스 연결
│   └── storage.ts        # 파일 저장소
├── shared/               # 공유 코드
│   └── schema.ts         # 데이터베이스 스키마
├── script/               # 빌드 스크립트
├── dist/                 # 빌드 출력
├── render.yaml           # Render 배포 설정
└── package.json          # 프로젝트 설정
```

## 🔧 환경 변수

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=your-random-secret-key
```

## 📊 데이터베이스

### PostgreSQL 스키마
- Users (사용자)
- Jobs (채용 공고)
- Applications (지원서)
- Courses (교육 과정)
- Enrollments (수강 신청)
- Notices (공지사항)

### 마이그레이션
```bash
# 스키마 푸시
npm run db:push

# 스키마 확인
npm run check
```

## 🌐 주요 페이지

- **홈**: `/`
- **로그인**: `/login`
- **채용공고**: `/recruit/jobs`
- **지원서 작성**: `/recruit/apply/:id`
- **HR 가이드**: `/hr-guide`
- **교육 과정**: `/education/courses`
- **공지사항**: `/notices`
- **관리자**: `/admin`
- **분석**: `/analytics`

## 📱 반응형 디자인

- **데스크톱**: 1024px+
- **태블릿**: 768px - 1023px
- **모바일**: 320px - 767px

## 🔐 인증 시스템

- **전략**: Passport Local Strategy
- **세션**: Memory Store (개발), PostgreSQL (프로덕션 권장)
- **비밀번호**: bcrypt 해싱
- **권한**: 사용자/관리자 역할 기반

## 📈 성능

- **첫 로딩**: < 3초
- **인터랙션**: < 100ms
- **빌드 크기**: ~1MB (gzipped)
- **Lighthouse 점수**: 90+

## 🧪 테스트

```bash
# 타입 체크
npm run check

# 빌드 테스트
npm run build
```

## 📝 개발 가이드

### 코드 스타일
- TypeScript strict mode
- ESM modules
- Functional components (React)
- Async/await (비동기)

### 커밋 메시지
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 업데이트
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드/설정 변경
```

## 🤝 기여

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License

## 👤 작성자

**장순호** - 코아시아 지주사 인사기획 부장
- GitHub: [@thinkpa81](https://github.com/thinkpa81)

## 🔗 링크

- **GitHub**: https://github.com/thinkpa81/hr_jsh
- **Production**: https://hr-portal.onrender.com (배포 후 업데이트)
- **Sandbox**: https://3000-i8rzpwpjcqszxo0a1npw5-82b888ba.sandbox.novita.ai

## 📞 지원

문제가 발생하면 GitHub Issues에 등록해주세요:
https://github.com/thinkpa81/hr_jsh/issues

---

**Last Updated**: 2026-01-11
**Version**: 1.0.0
