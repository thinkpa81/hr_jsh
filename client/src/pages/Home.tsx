import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Bot, TrendingUp, BarChart3, Brain, BookOpen, ArrowRight, MapPin, Clock, GraduationCap, Building2, Award, CheckCircle2, Sparkles, Target, Zap, Shield, Heart, Star } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Job, Notice } from "@shared/schema";

export default function Home() {
  const { data: stats } = useQuery<{
    activeJobs: number;
    totalApplicants: number;
    aiAccuracy: number;
    satisfaction: number;
    employees: number;
  }>({
    queryKey: ["/api/stats"],
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const { data: notices } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-br from-[#0052A5] via-[#003d7a] to-[#002952] text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF6B35]/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-[#FF6B35]" />
                <span className="text-sm font-medium">AI 기반 HR 솔루션</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
                함께 성장하는<br />
                <span className="text-[#FF6B35]">JSH</span> HR 포털
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl">
                데이터 분석, HR 대시보드, AI 혁신 기술로<br className="hidden sm:block" />
                미래 인재 경영을 만들어갑니다
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/analytics">
                  <Button size="lg" className="gap-2 bg-[#FF6B35] hover:bg-[#e55a2a] text-white border-0 shadow-lg shadow-[#FF6B35]/30" data-testid="button-analytics">
                    <BarChart3 className="h-5 w-5" />
                    데이터 분석
                  </Button>
                </Link>
                <Link href="/recruit/jobs">
                  <Button size="lg" variant="secondary" className="gap-2 bg-white text-[#0052A5] hover:bg-white/90" data-testid="button-jobs">
                    <Briefcase className="h-5 w-5" />
                    채용공고 보기
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-3xl" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <Users className="h-8 w-8 mx-auto mb-2 text-[#FF6B35]" />
                      <p className="text-3xl font-bold">{stats?.employees || "1,200"}+</p>
                      <p className="text-sm text-white/70">전체 임직원</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <Briefcase className="h-8 w-8 mx-auto mb-2 text-[#FF6B35]" />
                      <p className="text-3xl font-bold">{stats?.activeJobs || jobs?.length || 5}</p>
                      <p className="text-sm text-white/70">진행중 채용</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <Bot className="h-8 w-8 mx-auto mb-2 text-[#FF6B35]" />
                      <p className="text-3xl font-bold">{stats?.aiAccuracy || 95}%</p>
                      <p className="text-sm text-white/70">AI 정확도</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-[#FF6B35]" />
                      <p className="text-3xl font-bold">{stats?.satisfaction || 87}%</p>
                      <p className="text-sm text-white/70">직원 만족도</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-[#0052A5]/5 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#0052A5]" />
              <span>AI 기반 채용 솔루션</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#0052A5]" />
              <span>데이터 기반 의사결정</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#0052A5]" />
              <span>통합 HR 대시보드</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#0052A5]" />
              <span>체계적 인재 육성</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Main Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">JSH HR 시스템 핵심 기능</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI 기반 데이터 분석으로 최적의 HR 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover-elevate border-t-4 border-t-[#0052A5]">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-[#0052A5]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-[#0052A5]" />
                </div>
                <CardTitle>데이터 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  HR Analytics와 People Analytics로 데이터 기반 의사결정을 지원합니다.
                </p>
                <Link href="/analytics">
                  <Button variant="ghost" className="p-0 h-auto text-[#0052A5] gap-1">
                    자세히 보기 <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-elevate border-t-4 border-t-[#FF6B35]">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-7 w-7 text-[#FF6B35]" />
                </div>
                <CardTitle>AI 채용</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  AI 면접, 예측 분석, 자동 스크리닝으로 채용 효율성을 극대화합니다.
                </p>
                <Link href="/recruit/jobs">
                  <Button variant="ghost" className="p-0 h-auto text-[#FF6B35] gap-1">
                    자세히 보기 <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-elevate border-t-4 border-t-green-500">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7 text-green-500" />
                </div>
                <CardTitle>교육/개발</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  체계적인 교육 프로그램과 경력 개발을 통해 인재를 성장시킵니다.
                </p>
                <Link href="/education/courses">
                  <Button variant="ghost" className="p-0 h-auto text-green-500 gap-1">
                    자세히 보기 <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-elevate border-t-4 border-t-purple-500">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-7 w-7 text-purple-500" />
                </div>
                <CardTitle>인사제도</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  HRM, HRD, 평가, 보상, 복리후생 등 전체 HR 영역을 체계화합니다.
                </p>
                <Link href="/hr/guide">
                  <Button variant="ghost" className="p-0 h-auto text-purple-500 gap-1">
                    자세히 보기 <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
            <div>
              <Badge variant="outline" className="mb-4">Job Openings</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">주요 채용공고</h2>
              <p className="text-muted-foreground">JSH의 최신 채용 정보를 확인하세요</p>
            </div>
            <Link href="/recruit/jobs">
              <Button variant="outline" className="gap-2 mt-4 lg:mt-0">
                전체 보기 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {jobsLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs?.slice(0, 3).map((job) => (
                <Card key={job.id} className="hover-elevate group" data-testid={`job-card-${job.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-[#0052A5]/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-[#0052A5]" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="text-xs">{job.company}</Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{job.employmentType}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-[#0052A5] transition-colors line-clamp-1">{job.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>마감: {job.deadline}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>지원자 {job.applicants}명</span>
                      </div>
                      <Link href={`/recruit/jobs/${job.id}`}>
                        <Button size="sm" className="gap-1 bg-[#0052A5] hover:bg-[#003d7a]">
                          지원하기 <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Why JSH</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">JSH와 함께하는 이유</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              최고의 인재가 최고의 성과를 만들어갑니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0052A5]/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-[#0052A5]" />
              </div>
              <h3 className="font-semibold mb-2">명확한 비전</h3>
              <p className="text-sm text-muted-foreground">
                데이터 기반 HR 혁신으로 미래를 선도합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                <Zap className="h-8 w-8 text-[#FF6B35]" />
              </div>
              <h3 className="font-semibold mb-2">빠른 성장</h3>
              <p className="text-sm text-muted-foreground">
                개인과 조직이 함께 성장하는 문화
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">안정적 환경</h3>
              <p className="text-sm text-muted-foreground">
                체계적인 복리후생과 근무 환경
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-2">워라밸</h3>
              <p className="text-sm text-muted-foreground">
                일과 삶의 균형을 존중하는 문화
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-[#0052A5] to-[#003d7a] text-white border-0">
              <CardContent className="p-8">
                <Badge className="bg-white/20 text-white mb-4">HR Guide</Badge>
                <h3 className="text-2xl font-bold mb-3">인사관리(HR) 종합 가이드</h3>
                <p className="text-white/80 mb-6">
                  HRM, HRD, 채용, 평가, 보상, 교육, 노사관계, HR Analytics까지
                  모든 HR 영역을 체계적으로 정리한 완전 가이드
                </p>
                <Link href="/hr/guide">
                  <Button variant="secondary" className="gap-2">
                    <BookOpen className="h-5 w-5" />
                    가이드 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-[#FF6B35] to-[#e55a2a] text-white">
              <CardContent className="p-8">
                <Badge className="bg-white/20 text-white mb-4">Analytics</Badge>
                <h3 className="text-2xl font-bold mb-3">HR Analytics 대시보드</h3>
                <p className="text-white/80 mb-6">
                  실시간 채용, 평가, 교육 현황을 한눈에 확인하고
                  데이터 기반 의사결정으로 HR을 혁신하세요
                </p>
                <Link href="/analytics">
                  <Button variant="secondary" className="gap-2">
                    <BarChart3 className="h-5 w-5" />
                    대시보드 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {notices && notices.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">공지사항</h2>
              <Link href="/notices">
                <Button variant="ghost" className="gap-1">
                  전체 보기 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notices.slice(0, 3).map((notice) => (
                <Link key={notice.id} href={`/notices/${notice.id}`}>
                  <Card className="hover-elevate cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {notice.important && <Badge className="bg-red-500 text-xs">중요</Badge>}
                        <Badge variant="outline" className="text-xs">{notice.category}</Badge>
                      </div>
                      <h3 className="font-medium line-clamp-2 mb-2">{notice.title}</h3>
                      <p className="text-sm text-muted-foreground">{notice.createdAt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-[#0052A5] via-[#003d7a] to-[#002952] text-white">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-6 text-[#FF6B35]" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            JSH와 함께 HR 혁신을 경험하고<br className="hidden sm:block" />
            당신의 커리어를 한 단계 성장시키세요
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/recruit/jobs">
              <Button size="lg" className="gap-2 bg-[#FF6B35] hover:bg-[#e55a2a] border-0 shadow-lg">
                <Briefcase className="h-5 w-5" />
                채용공고 보기
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="gap-2 border-white/50 text-white hover:bg-white/10">
                <BarChart3 className="h-5 w-5" />
                데이터 분석
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
