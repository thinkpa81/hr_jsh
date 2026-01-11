# Render 배포 가이드

## 🚀 자동 배포 (render.yaml 사용)

### 1단계: Render 계정 생성
1. https://render.com 접속
2. GitHub 계정으로 회원가입 또는 로그인

### 2단계: Blueprint로 배포
1. Render 대시보드에서 **"New +"** 클릭
2. **"Blueprint"** 선택
3. GitHub 저장소 연결: `thinkpa81/hr_jsh`
4. **"Apply"** 클릭

render.yaml 파일이 자동으로 다음을 설정합니다:
- ✅ Web Service (Node.js)
- ✅ PostgreSQL Database
- ✅ 환경 변수 자동 설정
- ✅ 데이터베이스 연결 자동 구성

### 3단계: 배포 확인
- 빌드 로그 확인: 약 3-5분 소요
- 배포 완료 후 URL 확인: `https://hr-portal-xxxx.onrender.com`

---

## 🛠️ 수동 배포 (render.yaml 없이)

### 1단계: PostgreSQL 데이터베이스 생성
1. Render 대시보드에서 **"New +"** → **"PostgreSQL"**
2. 설정:
   - Name: `hr-portal-db`
   - Database: `hr_portal`
   - User: `hr_portal_user`
   - Region: Singapore
   - Plan: Free
3. **"Create Database"** 클릭
4. **Internal Database URL** 복사 (나중에 사용)

### 2단계: Web Service 생성
1. Render 대시보드에서 **"New +"** → **"Web Service"**
2. GitHub 저장소 연결: `thinkpa81/hr_jsh`
3. 설정:
   - **Name**: `hr-portal`
   - **Region**: Singapore
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3단계: 환경 변수 설정
Web Service 설정의 **"Environment"** 탭에서 추가:

```
NODE_ENV=production
SESSION_SECRET=your-random-secret-key-here
DATABASE_URL=[1단계에서 복사한 Internal Database URL]
```

### 4단계: 배포
1. **"Create Web Service"** 클릭
2. 자동으로 빌드 및 배포 시작
3. 로그에서 진행 상황 확인

---

## 📊 데이터베이스 마이그레이션

### 방법 1: Render Shell 사용
1. Web Service 페이지에서 **"Shell"** 탭 클릭
2. 다음 명령어 실행:
```bash
npm run db:push
```

### 방법 2: 로컬에서 원격 DB에 연결
1. Render에서 **External Database URL** 복사
2. 로컬 터미널에서:
```bash
export DATABASE_URL="복사한_External_URL"
npm run db:push
```

---

## 🔧 주요 설정

### package.json 스크립트
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsx script/build.ts",
    "start": "NODE_ENV=production node dist/index.cjs",
    "db:push": "drizzle-kit push"
  }
}
```

### 포트 설정
- 서버는 자동으로 `process.env.PORT` 사용 (Render가 자동 할당)
- 기본값: 5000 (환경 변수가 없을 경우)

### 데이터베이스 연결
- `DATABASE_URL` 환경 변수 필수
- PostgreSQL 연결 풀 사용
- Drizzle ORM으로 관리

---

## ✅ 배포 확인

배포 완료 후 다음 URL로 접속:
- **홈페이지**: `https://hr-portal-xxxx.onrender.com`
- **로그인**: `https://hr-portal-xxxx.onrender.com/login`
- **채용공고**: `https://hr-portal-xxxx.onrender.com/recruit/jobs`
- **HR 가이드**: `https://hr-portal-xxxx.onrender.com/hr-guide`

---

## ⚠️ Free Tier 제한사항

1. **서비스 비활성화**: 15분 동안 요청이 없으면 슬립 모드
2. **콜드 스타트**: 슬립 후 첫 요청 시 30-60초 소요
3. **데이터베이스**: 90일 후 자동 삭제 (활동이 없을 경우)
4. **월간 시간**: 750시간/월 무료 (약 31일)

---

## 🔄 업데이트 배포

GitHub에 푸시하면 자동으로 재배포:
```bash
git add .
git commit -m "Update: 변경 사항 설명"
git push origin main
```

Render가 자동으로:
1. 새 커밋 감지
2. 빌드 시작
3. 배포 완료

---

## 🐛 트러블슈팅

### 빌드 실패
- 로그 확인: Build Logs 탭
- `package.json` 의존성 확인
- Node.js 버전 확인 (`.node-version` 파일)

### 데이터베이스 연결 실패
- `DATABASE_URL` 환경 변수 확인
- Internal Database URL 사용 여부 확인
- PostgreSQL 서비스 실행 상태 확인

### 서비스 시작 실패
- Start Command 확인: `npm start`
- `dist/index.cjs` 파일 생성 여부 확인
- 포트 바인딩 확인: `0.0.0.0:${PORT}`

---

## 📞 지원

- Render 문서: https://render.com/docs
- Render 커뮤니티: https://community.render.com
- GitHub Issues: https://github.com/thinkpa81/hr_jsh/issues
