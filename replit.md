# Replit.md - JSH HR 통합 포털

## Overview

JSH HR 통합 포털 (HR Integrated Portal) - 종합 인사/채용 시스템. 채용공고, 이력서 관리, HR 분석, 인사제도, 교육/개발, 공지사항, 고객지원 기능을 제공합니다.

The project follows a modern full-stack architecture with a React frontend and Express backend, using PostgreSQL for data persistence.

## Brand Colors
- Primary: #0052A5 (JSH Blue)
- Accent: #FF6B35 (Orange)

## Admin Credentials
- Email: thinkpa@naver.com
- Password: audghk99**

## Key Features
- 채용 메뉴 순서: 직무소개 → 채용 프로세스 → 채용공고 → 진행중인 채용 → 채용 FAQ → 이력서 업로드 → 지원자 관리 → 이메일 관리 → 통계 분석
- 인사제도 메뉴 순서: HR 종합 가이드 → 임원인사 → 평가제도 → 승진제도 → 복리후생 → 조직문화
- 임원인사 페이지: 상법/민법 기반 임원 관리 규정 (이사 선임/해임, 이사의 의무, 이사회 운영, 감사 등)
- 4자리 PIN 보안: 이력서/문의 수정/삭제 시 사용자 인증
- 관리자 권한: PIN 없이 모든 데이터 수정/삭제 가능
- 비밀번호 보호 자료실: /support/archive (비밀번호: 2001)
- 개인정보처리방침: /privacy 페이지

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (supports light/dark modes)
- **Build Tool**: Vite with HMR support

**Key Design Decisions**:
- Component-based architecture with reusable UI primitives from shadcn/ui
- Form handling with react-hook-form and Zod validation
- Responsive design with mobile-first approach following design guidelines

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Style**: RESTful JSON API with `/api` prefix
- **Authentication**: Simple email/password authentication (extensible for session-based auth)
- **Storage Abstraction**: Interface-based storage pattern (`IStorage`) allowing easy swap between in-memory and database implementations

**Key Design Decisions**:
- Separation of routes, storage, and static file serving
- Development mode uses Vite middleware for HMR
- Production serves pre-built static files from `dist/public`

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Validation**: drizzle-zod for generating Zod schemas from Drizzle tables
- **Migrations**: Drizzle Kit with `db:push` command

**Core Entities**:
- Users (authentication and roles)
- Papers (research publications with categories, authors, journals)
- Notices (announcements with categories)
- TalentPool (graduate/researcher profiles)
- Regulations (department rules and guidelines)
- DepartmentInfo (about page content)
- MenuCategories/MenuItems (dynamic navigation)

### Project Structure
```
├── client/              # React frontend
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route page components
│       ├── lib/         # Utilities, auth, theme, query client
│       └── hooks/       # Custom React hooks
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data access layer
│   └── vite.ts          # Vite dev middleware
├── shared/              # Shared code
│   └── schema.ts        # Drizzle schema + Zod types
└── migrations/          # Database migrations
```

### Path Aliases
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets` → `./attached_assets`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations

### UI/Component Libraries
- **Radix UI**: Accessible, unstyled component primitives (dialogs, dropdowns, tabs, etc.)
- **shadcn/ui**: Pre-styled component collection (new-york style variant)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### State & Data Fetching
- **TanStack React Query**: Server state management and caching
- **react-hook-form**: Form state management
- **Zod**: Schema validation

### Build & Development
- **Vite**: Frontend build tool with React plugin
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development

### Fonts
- **Pretendard Variable**: Korean typography
- **DM Sans / Inter**: English typography
- **Fira Code / JetBrains Mono**: Monospace for technical content

### Session Management (Optional)
- **connect-pg-simple**: PostgreSQL session store (available but not currently active)
- **express-session**: Session middleware (available for future authentication expansion)