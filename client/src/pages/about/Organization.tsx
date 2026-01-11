import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, FlaskConical, Briefcase } from "lucide-react";

const tabs = [
  { name: "일반소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "연혁", href: "/about/history" },
  { name: "조직도", href: "/about/organization" },
  { name: "오시는 길", href: "/about/location" },
];

export default function Organization() {
  return (
    <div>
      <PageHeader 
        title="조직도" 
        subtitle="데이터지식서비스공학과의 조직 구성을 안내합니다"
        breadcrumb="대학원소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <Card className="w-64 bg-gradient-to-br from-[#0052A5] to-[#003d7a] text-white mb-8">
              <CardContent className="py-6 text-center">
                <h3 className="font-bold text-lg">학과장</h3>
                <p className="text-sm text-white/80 mt-1">홍길동 교수</p>
              </CardContent>
            </Card>

            <div className="w-0.5 h-8 bg-[#0052A5]" />

            <div className="grid md:grid-cols-2 gap-8 w-full relative">
              <div className="absolute left-1/2 top-0 w-[calc(50%-2rem)] h-0.5 bg-[#0052A5]" />
              <div className="absolute right-[calc(25%+1rem)] top-0 w-0.5 h-8 bg-[#0052A5]" />
              <div className="absolute left-[calc(25%+1rem)] top-0 w-0.5 h-8 bg-[#0052A5]" />

              <Card className="mt-8">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-[#FF6B35]" />
                    </div>
                    <h3 className="font-bold text-lg">교학행정팀</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 학사 행정 업무</li>
                    <li>• 입학/졸업 관리</li>
                    <li>• 장학 업무</li>
                    <li>• 학적 관리</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0052A5]/10 flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-[#0052A5]" />
                    </div>
                    <h3 className="font-bold text-lg">연구지원팀</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 연구 과제 관리</li>
                    <li>• 산학협력 지원</li>
                    <li>• 연구실 관리</li>
                    <li>• 학술 행사 지원</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="w-full mt-12">
              <h3 className="text-xl font-bold text-center mb-6 text-[#0052A5]">전공 분야</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-[#0052A5]" />
                    </div>
                    <h4 className="font-bold mb-2">데이터사이언스 전공</h4>
                    <p className="text-sm text-muted-foreground">
                      빅데이터 분석, 데이터 마이닝, 통계학
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-3">
                      <FlaskConical className="h-6 w-6 text-[#FF6B35]" />
                    </div>
                    <h4 className="font-bold mb-2">인공지능 전공</h4>
                    <p className="text-sm text-muted-foreground">
                      머신러닝, 딥러닝, 자연어처리
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="py-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-[#0052A5]" />
                    </div>
                    <h4 className="font-bold mb-2">지식서비스공학 전공</h4>
                    <p className="text-sm text-muted-foreground">
                      지식관리, 서비스공학, 시스템 설계
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
