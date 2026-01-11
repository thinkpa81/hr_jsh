import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileCheck, Star, MessageSquare, CheckCircle2, Clock, Users, ThumbsUp, ThumbsDown } from "lucide-react";
import { PageHeader } from "@/components/Header";

const evaluations = [
  {
    candidate: "김철수",
    position: "프론트엔드 개발자",
    stage: "2차면접",
    evaluators: [
      { name: "박팀장", score: 4.5, comment: "기술 역량 우수, 커뮤니케이션 좋음", decision: "pass" },
      { name: "이과장", score: 4.0, comment: "문제해결력 양호, 팀워크 기대됨", decision: "pass" },
      { name: "최부장", score: 4.2, comment: "성장 가능성 높음", decision: "pass" },
    ],
    averageScore: 4.2,
    status: "pending",
  },
  {
    candidate: "이영희",
    position: "데이터 엔지니어",
    stage: "1차면접",
    evaluators: [
      { name: "김팀장", score: 4.8, comment: "기술 스택 완벽, 적극적인 자세", decision: "pass" },
      { name: "정과장", score: 4.5, comment: "분석력 뛰어남", decision: "pass" },
    ],
    averageScore: 4.6,
    status: "approved",
  },
];

export default function ATSEvaluation() {
  return (
    <div>
      <PageHeader 
        title="평가 관리"
        subtitle="지원자 면접 평가 및 의사결정"
        breadcrumb="ATS / EVALUATION"
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
                  <FileCheck className="h-6 w-6 text-[#0052A5]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">평가 완료</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-[#FF6B35]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">결정 대기</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">합격 결정</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <ThumbsDown className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">불합격</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {evaluations.map((evaluation, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-[#0052A5] text-white text-lg">
                        {evaluation.candidate.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{evaluation.candidate}</h3>
                      <p className="text-sm text-muted-foreground">{evaluation.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{evaluation.stage}</Badge>
                    {evaluation.status === "pending" && (
                      <Badge variant="secondary">결정 대기</Badge>
                    )}
                    {evaluation.status === "approved" && (
                      <Badge className="bg-green-500">합격 결정</Badge>
                    )}
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FF6B35]/10 rounded-lg">
                      <Star className="h-4 w-4 text-[#FF6B35] fill-[#FF6B35]" />
                      <span className="font-bold text-[#FF6B35]">{evaluation.averageScore.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {evaluation.evaluators.map((evaluator, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-muted">
                          {evaluator.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{evaluator.name}</p>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(evaluator.score) ? 'text-[#FF6B35] fill-[#FF6B35]' : 'text-muted'}`} 
                              />
                            ))}
                            <span className="text-sm ml-1">{evaluator.score}</span>
                          </div>
                          {evaluator.decision === "pass" && (
                            <Badge className="bg-green-500 text-xs">Pass</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{evaluator.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {evaluation.status === "pending" && (
                  <div className="flex gap-3 mt-6 pt-4 border-t">
                    <Button className="bg-green-500 hover:bg-green-600 gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      합격 결정
                    </Button>
                    <Button variant="destructive" className="gap-2">
                      <ThumbsDown className="h-4 w-4" />
                      불합격
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      추가 면접 요청
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
