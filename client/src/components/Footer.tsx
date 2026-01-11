import { Link } from "wouter";
import { Mail, Phone, MapPin, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold">JSH HR 통합 포털</p>
                <p className="text-xs text-muted-foreground">Human Resources Portal</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              데이터 분석, HR 대시보드, AI 혁신 기술로 미래를 만들어갑니다.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">채용</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/recruit/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                채용공고
              </Link>
              <Link href="/recruit/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                채용 대시보드
              </Link>
              <Link href="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                데이터 분석
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">HR 서비스</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/hr/guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                HR 가이드
              </Link>
              <Link href="/education/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                교육과정
              </Link>
              <Link href="/notices" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                공지사항
              </Link>
              <Link href="/support/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                고객지원
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">연락처</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>경기도 용인시 수지구 죽전로 152</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>-</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>thinkpa@naver.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Copyright {new Date().getFullYear()} JSH HR 통합 포털. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                개인정보처리방침
              </Link>
              <span className="text-muted-foreground/50">|</span>
              <Link href="/terms" className="hover:text-foreground transition-colors" data-testid="link-terms">
                이용약관
              </Link>
            </div>
          </div>
          <p className="text-xs text-center mt-2 text-muted-foreground/70">이 사이트는 예시 데이터로 구성되어 있습니다.</p>
        </div>
      </div>
    </footer>
  );
}
