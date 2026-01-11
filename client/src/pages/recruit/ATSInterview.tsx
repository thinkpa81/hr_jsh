import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, Video, MessageSquare, TrendingUp, Clock, Play, BarChart3, Smile, Frown, Meh } from "lucide-react";
import { PageHeader } from "@/components/Header";

const interviewAnalysis = [
  { 
    name: "김철수", 
    position: "프론트엔드 개발자", 
    date: "2024-09-20",
    scores: { communication: 85, technical: 92, attitude: 88, problemSolving: 90 },
    sentiment: "positive",
    keywords: ["React", "TypeScript", "팀워크", "문제해결"],
  },
  { 
    name: "이영희", 
    position: "데이터 엔지니어", 
    date: "2024-09-19",
    scores: { communication: 78, technical: 95, attitude: 82, problemSolving: 88 },
    sentiment: "neutral",
    keywords: ["Python", "Spark", "데이터파이프라인", "분석"],
  },
];

export default function ATSInterview() {
  return (
    <div>
      <PageHeader 
        title="AI 면접 분석"
        subtitle="AI 기반 면접 영상 분석 및 평가"
        breadcrumb="ATS / AI INTERVIEW"
        tabs={[
          { name: "ATS 대시보드", href: "/recruit/ats" },
          { name: "파이프라인 관리", href: "/recruit/ats/pipeline" },
          { name: "자동 스크리닝", href: "/recruit/ats/screening" },
          { name: "AI 면접 분석", href: "/recruit/ats/ai-interview" },
          { name: "평가 관리", href: "/recruit/ats/evaluation" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-t-4 border-t-[#0052A5]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0052A5]/10 flex items-center justify-center">
                  <Video className="h-6 w-6 text-[#0052A5]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">총 면접 영상</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-[#FF6B35]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-sm text-muted-foreground">분석 완료</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-sm text-muted-foreground">평균 점수</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-muted-foreground">분석 대기</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {interviewAnalysis.map((interview, index) => (
            <Card key={index} className="shadow-lg hover-elevate">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0052A5]/20 to-[#003d7a]/20" />
                      <Button size="icon" className="w-14 h-14 rounded-full bg-white/90 hover:bg-white text-[#0052A5]">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-semibold">{interview.name}</p>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#0052A5]">분석완료</Badge>
                      <span className="text-sm text-muted-foreground">{interview.date}</span>
                      <div className="flex-1" />
                      {interview.sentiment === "positive" && (
                        <Badge className="bg-green-500 gap-1">
                          <Smile className="h-3 w-3" /> 긍정적
                        </Badge>
                      )}
                      {interview.sentiment === "neutral" && (
                        <Badge variant="secondary" className="gap-1">
                          <Meh className="h-3 w-3" /> 중립
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>커뮤니케이션</span>
                            <span className="font-medium">{interview.scores.communication}%</span>
                          </div>
                          <Progress value={interview.scores.communication} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>기술 역량</span>
                            <span className="font-medium">{interview.scores.technical}%</span>
                          </div>
                          <Progress value={interview.scores.technical} className="h-2" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>태도/자세</span>
                            <span className="font-medium">{interview.scores.attitude}%</span>
                          </div>
                          <Progress value={interview.scores.attitude} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>문제해결력</span>
                            <span className="font-medium">{interview.scores.problemSolving}%</span>
                          </div>
                          <Progress value={interview.scores.problemSolving} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">핵심 키워드</p>
                      <div className="flex flex-wrap gap-2">
                        {interview.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline">{keyword}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="bg-[#0052A5] hover:bg-[#003d7a] gap-2">
                        <BarChart3 className="h-4 w-4" />
                        상세 분석
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        피드백 작성
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
