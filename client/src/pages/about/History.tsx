import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { name: "일반소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "연혁", href: "/about/history" },
  { name: "조직도", href: "/about/organization" },
  { name: "오시는 길", href: "/about/location" },
];

const historyData = [
  {
    year: "2024",
    events: [
      { month: "09", content: "AI 융합연구센터 개소" },
      { month: "03", content: "데이터사이언스 전공 신설" },
    ],
  },
  {
    year: "2023",
    events: [
      { month: "09", content: "산학협력 MOU 체결 (10개 기업)" },
      { month: "06", content: "빅데이터 분석 실습실 구축" },
      { month: "03", content: "학과 BK21 사업 선정" },
    ],
  },
  {
    year: "2022",
    events: [
      { month: "09", content: "박사과정 신설" },
      { month: "03", content: "지식서비스공학 전공 개설" },
    ],
  },
  {
    year: "2021",
    events: [
      { month: "09", content: "클라우드 컴퓨팅 연구실 설립" },
      { month: "03", content: "데이터지식서비스공학과 신설 (석사과정)" },
    ],
  },
  {
    year: "2020",
    events: [
      { month: "12", content: "학과 설립 인가" },
      { month: "06", content: "학과 설립 준비위원회 구성" },
    ],
  },
];

export default function History() {
  return (
    <div>
      <PageHeader 
        title="연혁" 
        subtitle="데이터지식서비스공학과의 발자취를 소개합니다"
        breadcrumb="대학원소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#0052A5]/20" />
            
            {historyData.map((yearData, yearIndex) => (
              <div key={yearData.year} className="relative mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center text-white font-bold text-lg z-10">
                    {yearData.year}
                  </div>
                  <h2 className="text-2xl font-bold text-[#0052A5]">{yearData.year}년</h2>
                </div>
                
                <div className="ml-20 space-y-4">
                  {yearData.events.map((event, eventIndex) => (
                    <Card key={eventIndex} className="hover:shadow-md transition-shadow">
                      <CardContent className="py-4 flex items-center gap-4">
                        <span className="text-sm font-bold text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full">
                          {event.month}월
                        </span>
                        <span className="text-foreground">{event.content}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
