import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, Users, CheckCircle, CreditCard, GraduationCap } from "lucide-react";

const tabs = [
  { name: "모집요강", href: "/admission" },
  { name: "입학절차", href: "/admission/process" },
  { name: "장학안내", href: "/admission/scholarship" },
  { name: "등록금 안내", href: "/admission/tuition" },
  { name: "FAQ", href: "/admission/faq" },
];

const steps = [
  {
    step: 1,
    title: "원서접수",
    icon: FileText,
    description: "인터넷 원서접수 시스템을 통해 지원서 작성 및 제출",
    details: ["진학어플라이(jinhakapply.com) 접속", "회원가입 후 원서작성", "전형료 결제", "지원서 출력"],
  },
  {
    step: 2,
    title: "서류제출",
    icon: Search,
    description: "제출서류 준비 및 학과 사무실로 제출",
    details: ["입학원서 1부", "졸업(예정)증명서", "성적증명서", "연구계획서", "경력증명서(해당자)"],
  },
  {
    step: 3,
    title: "서류심사",
    icon: FileText,
    description: "제출 서류를 바탕으로 1차 서류심사 진행",
    details: ["학부 성적 평가", "연구계획서 검토", "자격요건 확인"],
  },
  {
    step: 4,
    title: "면접고사",
    icon: Users,
    description: "전공 관련 구술면접 진행 (대면 또는 비대면)",
    details: ["전공지식 평가", "연구 역량 평가", "학업 의지 확인", "인성 면접"],
  },
  {
    step: 5,
    title: "합격자 발표",
    icon: CheckCircle,
    description: "웹정보시스템 및 대학원 홈페이지를 통해 발표",
    details: ["합격자 조회", "등록금 고지서 출력", "합격 안내문 확인"],
  },
  {
    step: 6,
    title: "등록",
    icon: CreditCard,
    description: "등록기간 내 등록금 납부",
    details: ["등록금 납부", "학생증 발급", "수강신청 준비"],
  },
];

export default function Process() {
  return (
    <div>
      <PageHeader 
        title="입학절차" 
        subtitle="대학원 입학 절차를 안내합니다"
        breadcrumb="입학안내"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.step} className="flex gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    index % 2 === 0 ? "bg-[#0052A5]" : "bg-[#FF6B35]"
                  } text-white font-bold text-lg`}>
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mt-4" />
                  )}
                </div>

                <Card className="flex-1">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className={`h-5 w-5 ${
                        index % 2 === 0 ? "text-[#0052A5]" : "text-[#FF6B35]"
                      }`} />
                      <h3 className="font-bold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0052A5]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Card className="mt-8 bg-[#0052A5]/5 border-[#0052A5]/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="h-6 w-6 text-[#0052A5]" />
                <h3 className="font-bold text-lg text-[#0052A5]">문의처</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">교학행정팀</p>
                  <p className="text-muted-foreground">전화: 031-8005-2262~3</p>
                  <p className="text-muted-foreground">이메일: datakse@dankook.ac.kr</p>
                </div>
                <div>
                  <p className="font-medium mb-1">위치</p>
                  <p className="text-muted-foreground">단국대학교 죽전캠퍼스</p>
                  <p className="text-muted-foreground">대학원동 511호</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
