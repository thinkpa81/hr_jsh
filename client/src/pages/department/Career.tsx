import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Building2, GraduationCap, FlaskConical, TrendingUp } from "lucide-react";

const tabs = [
  { name: "학과개요", href: "/department" },
  { name: "교수진", href: "/department/faculty" },
  { name: "교육목표", href: "/department/goals" },
  { name: "졸업 후 진로", href: "/department/career" },
];

const careers = [
  {
    category: "IT 기업",
    icon: Building2,
    color: "#0052A5",
    positions: ["데이터 과학자", "AI/ML 엔지니어", "빅데이터 아키텍트", "클라우드 엔지니어"],
    companies: ["네이버", "카카오", "삼성SDS", "LG CNS", "SK C&C"],
  },
  {
    category: "금융기관",
    icon: TrendingUp,
    color: "#FF6B35",
    positions: ["퀀트 애널리스트", "리스크 분석가", "핀테크 개발자", "데이터 엔지니어"],
    companies: ["국민은행", "신한금융", "삼성증권", "토스", "카카오페이"],
  },
  {
    category: "공공기관/연구소",
    icon: FlaskConical,
    color: "#0052A5",
    positions: ["연구원", "정책 분석가", "시스템 설계자", "데이터 관리자"],
    companies: ["ETRI", "KISTI", "NIA", "공공데이터포털", "통계청"],
  },
  {
    category: "학계/교육",
    icon: GraduationCap,
    color: "#FF6B35",
    positions: ["교수", "연구교수", "박사후연구원", "강사"],
    companies: ["국내외 대학", "연구기관", "교육기관"],
  },
];

export default function Career() {
  return (
    <div>
      <PageHeader 
        title="졸업 후 진로" 
        subtitle="데이터지식서비스공학과 졸업생의 다양한 진로"
        breadcrumb="학과소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">다양한 분야에서 활약하는 졸업생</h2>
            <p className="text-muted-foreground">
              데이터지식서비스공학과 졸업생들은 IT, 금융, 공공기관, 학계 등 
              다양한 분야에서 전문가로 활동하고 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {careers.map((career, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${career.color}15` }}
                    >
                      <career.icon className="h-6 w-6" style={{ color: career.color }} />
                    </div>
                    <h3 className="font-bold text-lg">{career.category}</h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2 text-[#0052A5]">주요 직무</p>
                    <div className="flex flex-wrap gap-2">
                      {career.positions.map((position, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-muted"
                        >
                          {position}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2 text-[#FF6B35]">진출 기관</p>
                    <p className="text-sm text-muted-foreground">
                      {career.companies.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="h-6 w-6 text-[#0052A5]" />
                <h3 className="font-bold text-xl">취업 현황</h3>
              </div>

              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-[#0052A5]">95%</p>
                  <p className="text-sm text-muted-foreground">취업률</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FF6B35]">85%</p>
                  <p className="text-sm text-muted-foreground">전공 일치도</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#0052A5]">6,500만</p>
                  <p className="text-sm text-muted-foreground">평균 초봉 (원)</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FF6B35]">92%</p>
                  <p className="text-sm text-muted-foreground">취업 만족도</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
