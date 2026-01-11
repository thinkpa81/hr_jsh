import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle, Award, TrendingUp, Users, Globe } from "lucide-react";

const tabs = [
  { name: "학과개요", href: "/department" },
  { name: "교수진", href: "/department/faculty" },
  { name: "교육목표", href: "/department/goals" },
  { name: "졸업 후 진로", href: "/department/career" },
];

export default function Goals() {
  return (
    <div>
      <PageHeader 
        title="교육목표" 
        subtitle="데이터지식서비스공학과의 교육 목표와 인재상"
        breadcrumb="학과소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center mx-auto mb-4">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">데이터 시대를 선도하는 전문 인재 양성</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              4차 산업혁명 시대에 필요한 데이터 분석 역량과 지식서비스 설계 능력을 
              갖춘 창의적 인재를 양성합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-t-4 border-t-[#0052A5]">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-[#0052A5]">전문성</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                    데이터 분석 및 처리 전문 역량
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                    AI/ML 기술 활용 능력
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                    지식서비스 설계 및 구현 능력
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#FF6B35]">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-[#FF6B35]">창의성</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    문제 해결 중심 사고력
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    융합적 접근 방식
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    혁신적 서비스 기획 능력
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#0052A5]">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-[#0052A5]">실무능력</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                    산업 현장 적용 능력
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                    프로젝트 수행 경험
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                    협업 및 커뮤니케이션 능력
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-bold text-xl mb-6 text-center">핵심 역량</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-[#0052A5]" />
                  </div>
                  <h4 className="font-medium mb-1">분석적 사고력</h4>
                  <p className="text-xs text-muted-foreground">데이터 기반 의사결정</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-[#FF6B35]" />
                  </div>
                  <h4 className="font-medium mb-1">기술 혁신력</h4>
                  <p className="text-xs text-muted-foreground">최신 기술 습득 및 적용</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-[#0052A5]" />
                  </div>
                  <h4 className="font-medium mb-1">협업 능력</h4>
                  <p className="text-xs text-muted-foreground">팀 프로젝트 수행</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-6 w-6 text-[#FF6B35]" />
                  </div>
                  <h4 className="font-medium mb-1">글로벌 역량</h4>
                  <p className="text-xs text-muted-foreground">국제적 소통 능력</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
