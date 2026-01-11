import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { HelpCircle, ChevronDown, FileText, Users, MessageSquare, Briefcase, Gift, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    category: "지원 자격",
    icon: FileText,
    faqs: [
      { q: "경력 기준은 어떻게 되나요?", a: "해당 직무와 관련된 경력을 기준으로 합니다. 인턴, 아르바이트 경험도 관련 업무인 경우 경력으로 인정됩니다." },
      { q: "학력 제한이 있나요?", a: "대부분의 포지션에서 학력 제한은 없습니다. 다만, 일부 전문 직무의 경우 관련 학위가 필요할 수 있습니다." },
      { q: "외국인도 지원 가능한가요?", a: "네, 가능합니다. 다만 취업 비자 취득이 가능해야 하며, 한국어 또는 영어 의사소통이 원활해야 합니다." },
      { q: "이전 지원자도 재지원 가능한가요?", a: "네, 가능합니다. 6개월 이후부터 재지원이 가능합니다." },
    ]
  },
  {
    category: "지원서 작성",
    icon: Users,
    faqs: [
      { q: "자기소개서 분량 제한이 있나요?", a: "항목당 500자 이내로 작성해 주세요. 간결하고 명확하게 본인의 역량을 어필해 주시면 됩니다." },
      { q: "포트폴리오 제출은 필수인가요?", a: "디자인, 개발 등 일부 직무는 포트폴리오 제출이 필수입니다. 채용공고에서 확인해 주세요." },
      { q: "지원서 수정이 가능한가요?", a: "마감 전까지 지원서 수정이 가능합니다. 마이페이지에서 수정할 수 있습니다." },
      { q: "중복 지원이 가능한가요?", a: "동시에 2개 이상의 포지션에 지원이 가능합니다." },
    ]
  },
  {
    category: "전형 과정",
    icon: MessageSquare,
    faqs: [
      { q: "전형 결과는 언제 알 수 있나요?", a: "각 전형 종료 후 약 1~2주 이내에 개별 안내드립니다." },
      { q: "면접 일정 변경이 가능한가요?", a: "채용 담당자에게 연락하시면 일정 조율이 가능합니다." },
      { q: "면접은 어떤 방식으로 진행되나요?", a: "대면 면접이 기본이며, 상황에 따라 화상 면접으로 진행될 수 있습니다." },
      { q: "코딩 테스트가 있나요?", a: "개발 직군의 경우 코딩 테스트가 진행됩니다. 상세 내용은 별도 안내드립니다." },
    ]
  },
  {
    category: "복리후생",
    icon: Gift,
    faqs: [
      { q: "연봉 협상은 어떻게 되나요?", a: "최종 합격 후 경력과 역량을 고려하여 개별 협의합니다." },
      { q: "수습 기간이 있나요?", a: "3개월의 수습 기간이 있으며, 급여는 100% 지급됩니다." },
      { q: "재택근무가 가능한가요?", a: "부서 및 직무에 따라 재택근무가 가능합니다. 자세한 내용은 면접 시 안내드립니다." },
      { q: "연차는 어떻게 되나요?", a: "입사 첫해 15일, 이후 근속년수에 따라 가산됩니다." },
    ]
  },
  {
    category: "입사 관련",
    icon: Clock,
    faqs: [
      { q: "입사일은 언제인가요?", a: "최종 합격 후 협의하여 결정합니다. 보통 합격 통보 후 2~4주 내 입사합니다." },
      { q: "입사 시 필요한 서류는?", a: "신분증 사본, 주민등록등본, 통장 사본, 증명사진, 졸업증명서 등이 필요합니다." },
      { q: "신입사원 교육이 있나요?", a: "네, 입사 후 1주일간의 온보딩 프로그램이 진행됩니다." },
    ]
  },
];

export default function RecruitFaq() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <PageHeader 
        title="채용 FAQ"
        subtitle="채용에 관한 자주 묻는 질문들입니다"
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
        <div className="space-y-12">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#0052A5]/10">
                  <category.icon className="h-5 w-5 text-[#0052A5]" />
                </div>
                <h2 className="text-xl font-bold">{category.category}</h2>
              </div>
              
              <div className="space-y-2">
                {category.faqs.map((faq, faqIndex) => {
                  const itemId = `${catIndex}-${faqIndex}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <Card key={faqIndex} className="overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-[#FF6B35]" />
                          {faq.q}
                        </span>
                        <ChevronDown className={cn(
                          "h-5 w-5 text-muted-foreground transition-transform",
                          isOpen && "rotate-180"
                        )} />
                      </button>
                      <div className={cn(
                        "overflow-hidden transition-all duration-300",
                        isOpen ? "max-h-48" : "max-h-0"
                      )}>
                        <div className="p-4 pt-0 text-sm text-muted-foreground bg-muted/30">
                          {faq.a}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-[#0052A5] to-[#003d7a] text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">더 궁금한 점이 있으신가요?</h3>
            <p className="text-white/80 mb-4">채용 관련 문의사항은 언제든 연락주세요.</p>
            <p className="font-medium">이메일: recruit@jsh.co.kr | 전화: 02-1234-5678</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
