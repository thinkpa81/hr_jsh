import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { BookOpen, Users, Award, TrendingUp, Gift, Building2, FileText, Clock, Target, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const hrSections = [
  {
    title: "평가제도",
    description: "공정하고 투명한 성과 평가 시스템",
    icon: Award,
    href: "/hr/evaluation",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "승진제도",
    description: "역량 기반 승진 및 경력 개발 경로",
    icon: TrendingUp,
    href: "/hr/promotion",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "복리후생",
    description: "직원 만족을 위한 다양한 복지 제도",
    icon: Gift,
    href: "/hr/benefits",
    color: "from-green-500 to-green-600",
  },
  {
    title: "조직문화",
    description: "JSH만의 특별한 조직 문화와 가치",
    icon: Building2,
    href: "/hr/culture",
    color: "from-orange-500 to-orange-600",
  },
];

const hrPolicies = [
  { title: "근무시간", content: "유연근무제 운영 (코어타임 10:00-16:00)", icon: Clock },
  { title: "휴가제도", content: "연차 15일 + 리프레시 휴가 + 경조휴가", icon: FileText },
  { title: "평가주기", content: "반기별 성과 평가 및 연간 역량 평가", icon: Target },
  { title: "교육지원", content: "직무 교육비 연 100만원 지원", icon: BookOpen },
];

export default function HRGuidePage() {
  return (
    <div>
      <PageHeader 
        title="HR 종합 가이드"
        subtitle="JSH의 인사제도를 한눈에 확인하세요"
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
          <h2 className="text-2xl font-bold mb-4">JSH 인사제도 개요</h2>
          <p className="text-muted-foreground">
            JSH는 구성원의 성장과 행복을 최우선으로 생각합니다. 
            공정한 평가, 투명한 승진, 다양한 복리후생을 통해 
            모든 직원이 최고의 역량을 발휘할 수 있는 환경을 만들어 갑니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {hrSections.map((section, index) => (
            <Link key={index} href={section.href}>
              <Card className="h-full hover-elevate cursor-pointer group overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} text-white flex items-center justify-center mb-4`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#0052A5] transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#0052A5]" />
              주요 인사정책
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {hrPolicies.map((policy, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="p-2 rounded-lg bg-[#0052A5]/10">
                    <policy.icon className="h-5 w-5 text-[#0052A5]" />
                  </div>
                  <div>
                    <h4 className="font-medium">{policy.title}</h4>
                    <p className="text-sm text-muted-foreground">{policy.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#0052A5] to-[#003d7a] text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">인사팀에 문의하기</h3>
                <p className="text-white/80">
                  인사제도에 관한 궁금한 점이 있으시면 언제든 문의해주세요.
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="font-medium">이메일: hr@jsh.co.kr</p>
                <p className="text-white/80">전화: 02-1234-5678 (내선 100)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
