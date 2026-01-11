import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { Building2, Heart, Sparkles, Users, MessageSquare, Lightbulb, Clock, Coffee, Target, Award } from "lucide-react";

const coreValues = [
  {
    value: "혁신",
    english: "Innovation",
    description: "끊임없이 새로운 것을 시도하고 더 나은 방법을 찾습니다",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
  },
  {
    value: "협업",
    english: "Collaboration",
    description: "함께 일할 때 더 큰 가치를 만들어낼 수 있습니다",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "존중",
    english: "Respect",
    description: "다양성을 인정하고 서로를 존중합니다",
    icon: Heart,
    color: "from-pink-500 to-red-500",
  },
  {
    value: "성장",
    english: "Growth",
    description: "개인과 조직의 지속적인 성장을 추구합니다",
    icon: Sparkles,
    color: "from-green-500 to-emerald-500",
  },
];

const culturePractices = [
  {
    title: "수평적 커뮤니케이션",
    description: "직급에 관계없이 자유롭게 의견을 나눕니다. 모든 구성원이 '님' 호칭을 사용합니다.",
    icon: MessageSquare,
  },
  {
    title: "유연근무제",
    description: "코어타임(10시-16시) 외 자율 출퇴근. 월 1회 재택근무 가능.",
    icon: Clock,
  },
  {
    title: "자유로운 휴가",
    description: "휴가 사용에 별도 승인 없이 자율적으로 사용 가능합니다.",
    icon: Coffee,
  },
  {
    title: "성과 중심",
    description: "근무 시간이 아닌 성과와 결과로 평가합니다.",
    icon: Target,
  },
];

const teamEvents = [
  { name: "월간 타운홀 미팅", description: "경영진과 전 직원이 함께하는 소통의 시간" },
  { name: "팀 빌딩 데이", description: "분기별 팀 단합 활동 및 워크샵" },
  { name: "JSH 해커톤", description: "연 2회 전사 해커톤 개최" },
  { name: "동호회 활동", description: "다양한 취미 동호회 활동 지원" },
  { name: "패밀리 데이", description: "가족과 함께하는 연간 행사" },
  { name: "송년회/신년회", description: "한 해를 마무리하고 새해를 맞이하는 행사" },
];

export default function Culture() {
  return (
    <div>
      <PageHeader 
        title="조직문화"
        subtitle="JSH만의 특별한 조직 문화와 가치"
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
          <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
          <p className="text-muted-foreground">
            JSH는 핵심 가치를 바탕으로 함께 성장하는 문화를 만들어갑니다.
            모든 구성원이 자부심을 느끼고 최고의 성과를 낼 수 있는 환경을 추구합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coreValues.map((value, index) => (
            <Card key={index} className="text-center hover-elevate">
              <CardContent className="pt-8 pb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} text-white flex items-center justify-center`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-1">{value.value}</h3>
                <p className="text-sm text-muted-foreground mb-3">{value.english}</p>
                <p className="text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#0052A5]" />
              우리의 일하는 방식
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {culturePractices.map((practice, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="p-2 rounded-lg bg-[#0052A5]/10">
                    <practice.icon className="h-5 w-5 text-[#0052A5]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{practice.title}</h4>
                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FF6B35]" />
              함께하는 활동
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {teamEvents.map((event, index) => (
                <div key={index} className="p-4 border rounded-lg hover:border-[#0052A5] transition-colors">
                  <h4 className="font-medium mb-1">{event.name}</h4>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-[#0052A5] to-[#003d7a] text-white">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Employee Voice</h3>
              <blockquote className="italic text-white/90 mb-4">
                "JSH에서 일하면서 가장 좋은 점은 자유롭게 의견을 낼 수 있다는 것입니다. 
                모든 아이디어가 존중받고, 실제로 변화를 만들어낼 수 있어요."
              </blockquote>
              <p className="text-sm text-white/70">- 개발팀 김OO</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FF6B35] to-[#e55a2b] text-white">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Work-Life Balance</h3>
              <blockquote className="italic text-white/90 mb-4">
                "유연근무제 덕분에 아이 등원 후 출근하고, 
                중요한 가족 행사에도 빠짐없이 참석할 수 있어 정말 감사해요."
              </blockquote>
              <p className="text-sm text-white/70">- 마케팅팀 박OO</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
