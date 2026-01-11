import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { TrendingUp, Award, Users, Clock, Target, ArrowRight, Star, CheckCircle } from "lucide-react";

const jobLevels = [
  { level: "사원", years: "0-2년", description: "업무 기초 역량 습득 및 실무 경험 축적" },
  { level: "대리", years: "2-4년", description: "독립적 업무 수행 및 전문성 강화" },
  { level: "과장", years: "4-7년", description: "팀 단위 프로젝트 리드 및 후배 지도" },
  { level: "차장", years: "7-10년", description: "부서 내 핵심 업무 관리 및 전략 수립" },
  { level: "부장", years: "10년 이상", description: "부서/팀 총괄 관리 및 조직 성과 책임" },
  { level: "임원", years: "-", description: "경영 의사결정 및 회사 비전 실현" },
];

const promotionCriteria = [
  {
    title: "성과 기준",
    icon: Target,
    items: [
      "최근 2년간 평가 등급 B+ 이상",
      "핵심 성과 지표(KPI) 달성률 100% 이상",
      "동료 평가 점수 상위 30%",
    ]
  },
  {
    title: "역량 기준",
    icon: Award,
    items: [
      "해당 직급 필수 역량 충족",
      "리더십 역량 평가 통과",
      "직무 전문성 인정",
    ]
  },
  {
    title: "자격 기준",
    icon: Users,
    items: [
      "최소 근속 연수 충족",
      "필수 교육 이수 완료",
      "징계 이력 없음",
    ]
  },
];

const careerTracks = [
  {
    track: "관리직 트랙",
    description: "조직 관리 및 리더십 역할 수행",
    path: ["팀원", "파트장", "팀장", "본부장", "임원"],
    color: "from-blue-500 to-blue-600",
  },
  {
    track: "전문직 트랙",
    description: "직무 전문성 심화 및 기술 리더십",
    path: ["주니어", "시니어", "스태프", "프린시펄", "펠로우"],
    color: "from-purple-500 to-purple-600",
  },
];

export default function Promotion() {
  return (
    <div>
      <PageHeader 
        title="승진제도"
        subtitle="역량 기반 승진 및 경력 개발 경로"
        breadcrumb="인사제도"
        tabs={[
          { name: "HR 종합 가이드", href: "/hr/guide" },
          { name: "임원인사", href: "/hr/executive" },
          { name: "평가제도", href: "/hr/evaluation" },
          { name: "승진제도", href: "/hr/promotion" },
          { name: "복리후생", href: "/hr/benefits" },
          { name: "조직문화", href: "/hr/culture" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">경력 개발 경로</h2>
          <p className="text-muted-foreground">
            JSH는 구성원의 성장에 맞는 다양한 경력 경로를 제공합니다.
            관리직과 전문직 두 가지 트랙을 통해 본인의 강점을 살릴 수 있습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {careerTracks.map((track, index) => (
            <Card key={index}>
              <div className={`h-2 bg-gradient-to-r ${track.color}`} />
              <CardHeader>
                <CardTitle>{track.track}</CardTitle>
                <p className="text-sm text-muted-foreground">{track.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center flex-wrap gap-2">
                  {track.path.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium">
                        {step}
                      </span>
                      {stepIndex < track.path.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#0052A5]" />
              직급 체계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">직급</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">기준 연차</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">역할 및 책임</th>
                  </tr>
                </thead>
                <tbody>
                  {jobLevels.map((level, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-[#0052A5] text-white rounded-full text-sm font-medium">
                          {level.level}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">{level.years}</td>
                      <td className="py-4 px-4 text-muted-foreground">{level.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="h-6 w-6 text-[#FF6B35]" />
          승진 심사 기준
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {promotionCriteria.map((criteria, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <criteria.icon className="h-5 w-5 text-[#0052A5]" />
                  {criteria.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {criteria.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
