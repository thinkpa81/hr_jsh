import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Star, TrendingUp, Gift, BarChart3, GraduationCap, Target } from "lucide-react";
import { PageHeader } from "@/components/Header";

const hrTopics = [
  {
    id: "hrm",
    name: "인적자원관리(HRM)",
    icon: Users,
    description: "조직의 인적자원을 효과적으로 활용하기 위한 관리 활동",
    sections: [
      { title: "인력 계획", content: "조직 목표 달성에 필요한 인력의 수요 예측 및 공급 계획 수립" },
      { title: "채용 관리", content: "인재 확보를 위한 모집, 선발, 배치 프로세스 운영" },
      { title: "배치 및 이동", content: "적재적소 인력 배치와 효율적인 인사이동 관리" },
      { title: "퇴직 관리", content: "은퇴, 이직, 해고 등 퇴직 관련 프로세스 관리" },
    ],
  },
  {
    id: "hrd",
    name: "인적자원개발(HRD)",
    icon: GraduationCap,
    description: "구성원의 역량 개발과 조직의 성과 향상을 위한 체계적인 교육훈련",
    sections: [
      { title: "교육 체계", content: "직급별, 직무별 교육과정 설계 및 운영" },
      { title: "역량 개발", content: "핵심 역량 정의 및 개인별 역량 개발 지원" },
      { title: "경력 개발", content: "장기적 경력 경로 설계 및 CDP(Career Development Program) 운영" },
      { title: "리더십 개발", content: "미래 리더 양성을 위한 체계적 리더십 프로그램" },
    ],
  },
  {
    id: "evaluation",
    name: "평가 제도",
    icon: Star,
    description: "공정하고 객관적인 성과 및 역량 평가 시스템",
    sections: [
      { title: "성과 평가", content: "MBO 기반 목표 달성도 평가 및 KPI 관리" },
      { title: "역량 평가", content: "직무수행에 필요한 핵심역량 보유 수준 평가" },
      { title: "다면 평가", content: "상사, 동료, 부하 등 다양한 관점의 360도 피드백" },
      { title: "평가 보정", content: "평가자 간 편차 조정 및 공정성 확보 프로세스" },
    ],
  },
  {
    id: "reward",
    name: "보상 제도",
    icon: TrendingUp,
    description: "성과에 따른 공정한 보상과 동기부여 체계",
    sections: [
      { title: "급여 체계", content: "기본급, 성과급, 수당 등 보상 구조 설계" },
      { title: "성과 보상", content: "개인/팀/조직 성과에 따른 인센티브 지급" },
      { title: "승진 제도", content: "직급체계 및 승진 기준, 심사 프로세스" },
      { title: "비금전적 보상", content: "표창, 인정, 경력 기회 등 비재무적 보상" },
    ],
  },
  {
    id: "benefits",
    name: "복리후생",
    icon: Gift,
    description: "구성원의 삶의 질 향상을 위한 다양한 복지 제도",
    sections: [
      { title: "법정 복리후생", content: "4대 보험, 퇴직금 등 법적 의무 복지" },
      { title: "선택적 복지", content: "카페테리아 플랜 등 맞춤형 복지 제도" },
      { title: "워라밸 지원", content: "유연근무제, 휴가, 가족친화 제도" },
      { title: "건강관리", content: "건강검진, EAP, 심리상담 등 건강 지원" },
    ],
  },
  {
    id: "analytics",
    name: "HR Analytics",
    icon: BarChart3,
    description: "데이터 기반의 과학적 인사관리 의사결정",
    sections: [
      { title: "인력 분석", content: "인력 구성, 이직률, 채용 효율성 분석" },
      { title: "성과 분석", content: "개인/조직 성과 데이터 분석 및 예측" },
      { title: "역량 분석", content: "역량 Gap 분석 및 개발 니즈 파악" },
      { title: "예측 분석", content: "이직 예측, 성과 예측 등 AI 기반 분석" },
    ],
  },
];

export default function HRGuide() {
  return (
    <div>
      <PageHeader 
        title="HR 종합 가이드"
        subtitle="인사관리(HR) 전체 영역을 체계적으로 정리한 종합 가이드입니다"
        breadcrumb="HR GUIDE"
        tabs={[
          { name: "HR 종합 가이드", href: "/hr/guide" },
          { name: "평가제도", href: "/hr/evaluation" },
          { name: "승진제도", href: "/hr/promotion" },
          { name: "복리후생", href: "/hr/benefits" },
          { name: "조직문화", href: "/hr/culture" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {hrTopics.map((topic) => (
            <Card key={topic.id} className="hover-elevate shadow-lg border-t-4 border-t-[#0052A5]" data-testid={`card-${topic.id}`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0052A5]/10 to-[#0052A5]/5 flex items-center justify-center">
                    <topic.icon className="h-7 w-7 text-[#0052A5]" />
                  </div>
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.sections.map((section) => (
                    <li key={section.title} className="flex items-start gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35] mt-1.5 flex-shrink-0" />
                      <span>{section.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="hrm" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8 h-auto p-1">
            {hrTopics.map((topic) => (
              <TabsTrigger key={topic.id} value={topic.id} className="text-xs lg:text-sm py-3 data-[state=active]:bg-[#0052A5] data-[state=active]:text-white">
                {topic.name.split("(")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {hrTopics.map((topic) => (
            <TabsContent key={topic.id} value={topic.id}>
              <Card className="shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0052A5]/10 flex items-center justify-center">
                      <topic.icon className="h-6 w-6 text-[#0052A5]" />
                    </div>
                    <div>
                      <CardTitle>{topic.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {topic.sections.map((section) => (
                      <div key={section.title} className="p-5 bg-gradient-to-br from-muted/50 to-transparent rounded-xl border hover-elevate">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4 text-[#FF6B35]" />
                          {section.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{section.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
