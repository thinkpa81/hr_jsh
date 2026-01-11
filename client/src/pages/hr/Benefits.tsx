import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { Gift, Home, Heart, GraduationCap, Car, Utensils, Dumbbell, Baby, Plane, DollarSign, Stethoscope, Building2 } from "lucide-react";

const benefitCategories = [
  {
    category: "생활 지원",
    icon: Home,
    color: "from-blue-500 to-blue-600",
    benefits: [
      { name: "주거 지원", description: "사택 제공 또는 주거비 지원 (월 50만원)" },
      { name: "통근 지원", description: "셔틀버스 운영 및 교통비 지원" },
      { name: "식사 지원", description: "중식 제공 및 야근 식대 지원" },
      { name: "경조사 지원", description: "경조금 및 경조휴가 지원" },
    ]
  },
  {
    category: "건강 관리",
    icon: Heart,
    color: "from-red-500 to-red-600",
    benefits: [
      { name: "건강검진", description: "연 1회 종합건강검진 지원 (가족 포함)" },
      { name: "의료비 지원", description: "본인 및 가족 의료비 연 200만원 한도 지원" },
      { name: "헬스장", description: "사내 헬스장 운영 및 피트니스 비용 지원" },
      { name: "심리 상담", description: "전문 상담사 상담 프로그램 운영" },
    ]
  },
  {
    category: "자기 개발",
    icon: GraduationCap,
    color: "from-purple-500 to-purple-600",
    benefits: [
      { name: "교육비 지원", description: "직무 관련 교육비 연 100만원 지원" },
      { name: "자격증", description: "업무 관련 자격증 취득 비용 전액 지원" },
      { name: "도서 구입", description: "월 5만원 도서 구입비 지원" },
      { name: "어학 교육", description: "어학 학원비 월 30만원 한도 지원" },
    ]
  },
  {
    category: "가족 지원",
    icon: Baby,
    color: "from-green-500 to-green-600",
    benefits: [
      { name: "출산 축하금", description: "출산 축하금 100만원 지급" },
      { name: "육아 지원", description: "사내 어린이집 운영 및 보육비 지원" },
      { name: "자녀 학자금", description: "자녀 학자금 (중고대) 지원" },
      { name: "가족 돌봄", description: "가족 돌봄 휴가 연 10일 제공" },
    ]
  },
  {
    category: "휴가/여가",
    icon: Plane,
    color: "from-orange-500 to-orange-600",
    benefits: [
      { name: "연차휴가", description: "입사 첫해 15일, 매년 1일씩 증가" },
      { name: "리프레시 휴가", description: "5년차 5일, 10년차 10일 추가 휴가" },
      { name: "콘도/리조트", description: "제휴 콘도 및 리조트 이용권 제공" },
      { name: "여행비 지원", description: "연 1회 국내외 여행비 50만원 지원" },
    ]
  },
  {
    category: "금전적 지원",
    icon: DollarSign,
    color: "from-teal-500 to-teal-600",
    benefits: [
      { name: "성과급", description: "연간 성과에 따른 인센티브 지급" },
      { name: "퇴직연금", description: "DC형 퇴직연금 운용" },
      { name: "주식 매수", description: "우리사주조합 가입 지원" },
      { name: "대출 지원", description: "저금리 생활안정자금 대출" },
    ]
  },
];

export default function Benefits() {
  return (
    <div>
      <PageHeader 
        title="복리후생"
        subtitle="직원 만족을 위한 다양한 복지 제도"
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
          <h2 className="text-2xl font-bold mb-4">JSH 복리후생</h2>
          <p className="text-muted-foreground">
            JSH는 직원들의 일과 삶의 균형을 위해 다양한 복리후생 제도를 운영합니다.
            건강, 성장, 가족, 여가 모든 영역에서 최고의 지원을 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${category.color}`} />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="border-b last:border-0 pb-3 last:pb-0">
                      <h4 className="font-medium text-sm">{benefit.name}</h4>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-[#0052A5] to-[#003d7a] text-white">
          <CardContent className="p-8 text-center">
            <Gift className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">더 많은 혜택이 준비되어 있습니다</h3>
            <p className="text-white/80">
              위에 소개된 내용 외에도 다양한 복리후생 제도가 있습니다.
              <br />입사 후 인사팀을 통해 자세한 안내를 받으실 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
