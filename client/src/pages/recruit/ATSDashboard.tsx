import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Users, FileCheck, TrendingUp, Clock, CheckCircle2, AlertCircle, Workflow } from "lucide-react";
import { PageHeader } from "@/components/Header";
import { Link } from "wouter";

const pipelineStats = [
  { stage: "지원접수", count: 128, color: "bg-blue-500" },
  { stage: "서류심사", count: 89, color: "bg-yellow-500" },
  { stage: "1차면접", count: 45, color: "bg-orange-500" },
  { stage: "2차면접", count: 23, color: "bg-purple-500" },
  { stage: "최종합격", count: 12, color: "bg-green-500" },
];

const recentActivities = [
  { action: "서류 합격", candidate: "김지원", position: "프론트엔드 개발자", time: "10분 전" },
  { action: "면접 예약", candidate: "이서연", position: "데이터 엔지니어", time: "30분 전" },
  { action: "지원서 접수", candidate: "박민수", position: "HR 매니저", time: "1시간 전" },
  { action: "최종 합격", candidate: "정다영", position: "AI/ML 엔지니어", time: "2시간 전" },
];

export default function ATSDashboard() {
  return (
    <div>
      <PageHeader 
        title="ATS 대시보드"
        subtitle="지원자 추적 시스템 현황을 한눈에 확인하세요"
        breadcrumb="ATS"
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
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">128</p>
                  <p className="text-sm text-muted-foreground">총 지원자</p>
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
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">면접 진행중</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">최종 합격</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-t-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">9.4%</p>
                  <p className="text-sm text-muted-foreground">합격률</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-[#0052A5]" />
                  채용 파이프라인
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineStats.map((stage, index) => (
                    <div key={stage.stage} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">{stage.stage}</div>
                      <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                        <div 
                          className={`h-full ${stage.color} flex items-center justify-end pr-3 text-white text-sm font-medium`}
                          style={{ width: `${(stage.count / 128) * 100}%` }}
                        >
                          {stage.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Link href="/recruit/ats/pipeline">
                    <Button variant="outline" className="w-full border-[#0052A5] text-[#0052A5]">
                      파이프라인 상세 보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-[#0052A5]" />
                  ATS 기능
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/recruit/ats/pipeline">
                    <Card className="hover-elevate cursor-pointer h-full">
                      <CardContent className="p-5">
                        <Workflow className="h-8 w-8 text-[#0052A5] mb-3" />
                        <h4 className="font-semibold mb-1">파이프라인 관리</h4>
                        <p className="text-sm text-muted-foreground">채용 단계별 지원자 관리</p>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/recruit/ats/screening">
                    <Card className="hover-elevate cursor-pointer h-full">
                      <CardContent className="p-5">
                        <FileCheck className="h-8 w-8 text-[#FF6B35] mb-3" />
                        <h4 className="font-semibold mb-1">자동 스크리닝</h4>
                        <p className="text-sm text-muted-foreground">AI 기반 서류 심사 자동화</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">최근 활동</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-[#0052A5] mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.candidate}</span>님 
                          <Badge variant="outline" className="mx-1 text-xs">{activity.action}</Badge>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.position}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-[#FF6B35]/5 border-[#FF6B35]/20">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#FF6B35]">주의</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      3건의 면접 일정이 확정 대기 중입니다.
                    </p>
                    <Button size="sm" variant="outline" className="mt-3 text-[#FF6B35] border-[#FF6B35]">
                      확인하기
                    </Button>
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
