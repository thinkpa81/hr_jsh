import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Filter, CheckCircle2, XCircle, Clock, Zap, Settings, Play, FileText } from "lucide-react";
import { PageHeader } from "@/components/Header";

const screeningRules = [
  { name: "학력 요건", description: "학사 이상", active: true },
  { name: "경력 요건", description: "3년 이상", active: true },
  { name: "필수 스킬", description: "React, TypeScript", active: true },
  { name: "우대 사항", description: "AWS, Docker", active: false },
];

const screeningResults = [
  { name: "김철수", position: "프론트엔드 개발자", score: 92, status: "passed", matchRate: 95 },
  { name: "이영희", position: "데이터 엔지니어", score: 78, status: "passed", matchRate: 82 },
  { name: "박민수", position: "HR 매니저", score: 45, status: "failed", matchRate: 48 },
  { name: "정수진", position: "AI/ML 엔지니어", score: 88, status: "passed", matchRate: 90 },
  { name: "최동욱", position: "프론트엔드 개발자", score: 55, status: "review", matchRate: 60 },
];

export default function ATSScreening() {
  return (
    <div>
      <PageHeader 
        title="자동 스크리닝"
        subtitle="AI 기반 서류 심사 자동화 시스템"
        breadcrumb="ATS / SCREENING"
        tabs={[
          { name: "ATS 대시보드", href: "/recruit/ats" },
          { name: "파이프라인 관리", href: "/recruit/ats/pipeline" },
          { name: "자동 스크리닝", href: "/recruit/ats/screening" },
          { name: "AI 면접 분석", href: "/recruit/ats/ai-interview" },
          { name: "평가 관리", href: "/recruit/ats/evaluation" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-[#0052A5]" />
                    스크리닝 결과
                  </CardTitle>
                  <Button className="bg-[#0052A5] hover:bg-[#003d7a] gap-2">
                    <Play className="h-4 w-4" />
                    스크리닝 실행
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {screeningResults.map((result, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover-elevate">
                      <div className="w-12 h-12 rounded-full bg-[#0052A5]/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-[#0052A5]">{result.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{result.name}</p>
                          {result.status === "passed" && (
                            <Badge className="bg-green-500">합격</Badge>
                          )}
                          {result.status === "failed" && (
                            <Badge variant="destructive">불합격</Badge>
                          )}
                          {result.status === "review" && (
                            <Badge variant="secondary">검토필요</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{result.position}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>매칭률</span>
                              <span className="font-medium">{result.matchRate}%</span>
                            </div>
                            <Progress value={result.matchRate} className="h-2" />
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#0052A5]">{result.score}</p>
                            <p className="text-xs text-muted-foreground">점수</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        상세
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-t-4 border-t-[#0052A5]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    스크리닝 규칙
                  </CardTitle>
                  <Button variant="ghost" size="sm">편집</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {screeningRules.map((rule, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${rule.active ? 'bg-green-500/10' : 'bg-muted'}`}>
                      {rule.active ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{rule.name}</p>
                      <p className="text-xs text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-[#0052A5]/5 to-transparent">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0052A5]/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-[#0052A5]" />
                  </div>
                  <div>
                    <p className="font-semibold">AI 스크리닝</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      머신러닝 기반으로 지원자의 적합성을 자동 평가합니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-5">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-500">3</p>
                    <p className="text-xs text-muted-foreground">합격</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-500">1</p>
                    <p className="text-xs text-muted-foreground">불합격</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-500">1</p>
                    <p className="text-xs text-muted-foreground">검토필요</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0052A5]">72%</p>
                    <p className="text-xs text-muted-foreground">평균 매칭률</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
