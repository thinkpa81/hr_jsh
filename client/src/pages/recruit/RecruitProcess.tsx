import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { FileText, Users, MessageSquare, Award, CheckCircle, Clock, HelpCircle } from "lucide-react";

const processSteps = [
  {
    step: 1,
    title: "지원서 접수",
    icon: FileText,
    color: "bg-blue-500",
    duration: "상시",
    description: "채용공고를 확인하고 온라인으로 지원서를 작성합니다.",
    details: [
      "채용공고 확인 및 지원 자격 검토",
      "온라인 지원서 작성 (기본 정보, 경력, 자기소개서)",
      "포트폴리오 및 증빙서류 첨부 (해당시)",
    ]
  },
  {
    step: 2,
    title: "서류 심사",
    icon: Users,
    color: "bg-indigo-500",
    duration: "약 1~2주",
    description: "제출된 서류를 검토하여 적합한 지원자를 선별합니다.",
    details: [
      "지원 자격 및 경력 사항 검토",
      "직무 적합성 평가",
      "합격자 개별 연락",
    ]
  },
  {
    step: 3,
    title: "1차 면접",
    icon: MessageSquare,
    color: "bg-purple-500",
    duration: "약 1시간",
    description: "직무 역량과 조직 적합성을 평가하는 실무진 면접입니다.",
    details: [
      "직무 관련 역량 심층 평가",
      "과거 경험 및 성과 검증",
      "실무 케이스 스터디 (일부 직무)",
      "조직 문화 적합성 확인",
    ]
  },
  {
    step: 4,
    title: "2차 면접",
    icon: Award,
    color: "bg-orange-500",
    duration: "약 1시간",
    description: "경영진과의 면접으로 최종 적합성을 확인합니다.",
    details: [
      "임원진 면접",
      "조직 비전 및 가치 공유",
      "성장 가능성 평가",
      "최종 의사결정",
    ]
  },
  {
    step: 5,
    title: "최종 합격",
    icon: CheckCircle,
    color: "bg-green-500",
    duration: "약 1주",
    description: "합격 통보 후 처우 협의 및 입사 절차를 진행합니다.",
    details: [
      "최종 합격 통보",
      "연봉 및 처우 협의",
      "입사일 조율",
      "입사 서류 안내",
    ]
  },
];

const faqs = [
  { q: "지원서 수정이 가능한가요?", a: "마감 전까지 지원서 수정이 가능합니다. 마이페이지에서 수정할 수 있습니다." },
  { q: "중복 지원이 가능한가요?", a: "동시에 2개 이상의 포지션에 지원이 가능합니다. 단, 각 포지션별로 별도 지원이 필요합니다." },
  { q: "면접 일정 변경이 가능한가요?", a: "채용 담당자에게 연락하시면 일정 조율이 가능합니다." },
  { q: "합격 결과는 언제 확인할 수 있나요?", a: "각 전형 종료 후 약 1~2주 이내에 개별 안내드립니다." },
];

export default function RecruitProcess() {
  return (
    <div>
      <PageHeader 
        title="채용 프로세스"
        subtitle="JSH 채용 절차를 안내해 드립니다"
        breadcrumb="채용"
        tabs={[
          { name: "직무소개", href: "/recruit/positions" },
          { name: "채용 프로세스", href: "/recruit/process" },
          { name: "채용공고", href: "/recruit/jobs" },
          { name: "진행중인 채용", href: "/recruit/ongoing" },
          { name: "채용 FAQ", href: "/recruit/faq" },
          { name: "이력서 업로드", href: "/recruit/resume" },
          { name: "지원자 관리", href: "/recruit/applicants" },
          { name: "이메일 관리", href: "/recruit/email" },
          { name: "통계 분석", href: "/recruit/analytics" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0052A5] to-[#FF6B35] -translate-x-1/2" />
          
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <Card className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-xl ${step.color} text-white flex-shrink-0`}>
                          <step.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-[#0052A5]">STEP {step.step}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {step.duration}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground mb-4">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="hidden lg:flex items-center justify-center w-16">
                  <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg z-10`}>
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-[#0052A5]" />
            자주 묻는 질문
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-bold mb-2 text-[#0052A5]">Q. {faq.q}</h4>
                  <p className="text-sm text-muted-foreground">A. {faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
