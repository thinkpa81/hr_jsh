import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Workflow, ChevronRight, MoreVertical, Mail, Phone, Calendar, Star } from "lucide-react";
import { PageHeader } from "@/components/Header";

const pipelineStages = [
  {
    name: "지원접수",
    count: 12,
    color: "border-blue-500",
    candidates: [
      { name: "김철수", position: "프론트엔드 개발자", date: "2024-09-20", rating: 4 },
      { name: "이영희", position: "데이터 엔지니어", date: "2024-09-19", rating: 5 },
      { name: "박민수", position: "HR 매니저", date: "2024-09-18", rating: 3 },
    ]
  },
  {
    name: "서류심사",
    count: 8,
    color: "border-yellow-500",
    candidates: [
      { name: "정수진", position: "프론트엔드 개발자", date: "2024-09-17", rating: 5 },
      { name: "최동욱", position: "AI/ML 엔지니어", date: "2024-09-16", rating: 4 },
    ]
  },
  {
    name: "1차면접",
    count: 5,
    color: "border-orange-500",
    candidates: [
      { name: "강지영", position: "데이터 엔지니어", date: "2024-09-15", rating: 5 },
      { name: "윤서연", position: "프론트엔드 개발자", date: "2024-09-14", rating: 4 },
    ]
  },
  {
    name: "2차면접",
    count: 3,
    color: "border-purple-500",
    candidates: [
      { name: "임재현", position: "AI/ML 엔지니어", date: "2024-09-13", rating: 5 },
    ]
  },
  {
    name: "최종합격",
    count: 2,
    color: "border-green-500",
    candidates: [
      { name: "한미래", position: "HR 매니저", date: "2024-09-12", rating: 5 },
    ]
  },
];

export default function ATSPipeline() {
  return (
    <div>
      <PageHeader 
        title="파이프라인 관리"
        subtitle="채용 단계별 지원자를 관리하세요"
        breadcrumb="ATS / PIPELINE"
        tabs={[
          { name: "ATS 대시보드", href: "/recruit/ats" },
          { name: "파이프라인 관리", href: "/recruit/ats/pipeline" },
          { name: "자동 스크리닝", href: "/recruit/ats/screening" },
          { name: "AI 면접 분석", href: "/recruit/ats/ai-interview" },
          { name: "평가 관리", href: "/recruit/ats/evaluation" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="flex-shrink-0 w-72">
              <Card className={`shadow-lg border-t-4 ${stage.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      {stage.name}
                      <Badge variant="secondary">{stage.count}</Badge>
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stage.candidates.map((candidate, idx) => (
                    <Card key={idx} className="hover-elevate cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-[#0052A5] text-white text-sm">
                              {candidate.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{candidate.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{candidate.position}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < candidate.rating ? 'text-[#FF6B35] fill-[#FF6B35]' : 'text-muted'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Calendar className="h-3 w-3" />
                          </Button>
                          <div className="flex-1" />
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full text-sm h-9">
                    + 지원자 추가
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
