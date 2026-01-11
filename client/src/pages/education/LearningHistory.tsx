import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Clock, Calendar, Award, TrendingUp, BookOpen, CheckCircle2, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";

const mockLearningHistory = [
  { id: 1, title: "리더십 역량 개발", category: "리더십", status: "completed", progress: 100, completedDate: "2024-08-15", duration: "16시간", score: 92 },
  { id: 2, title: "데이터 분석 기초", category: "IT/디지털", status: "in_progress", progress: 65, startDate: "2024-09-01", duration: "24시간", score: null },
  { id: 3, title: "커뮤니케이션 스킬", category: "소프트스킬", status: "completed", completedDate: "2024-07-20", progress: 100, duration: "8시간", score: 88 },
  { id: 4, title: "프로젝트 관리", category: "비즈니스", status: "completed", completedDate: "2024-06-10", progress: 100, duration: "12시간", score: 95 },
];

export default function LearningHistory() {
  const { user } = useAuth();

  const completedCourses = mockLearningHistory.filter(c => c.status === "completed");
  const inProgressCourses = mockLearningHistory.filter(c => c.status === "in_progress");
  const totalHours = completedCourses.reduce((acc, c) => acc + parseInt(c.duration), 0);
  const avgScore = Math.round(completedCourses.reduce((acc, c) => acc + (c.score || 0), 0) / completedCourses.length);

  return (
    <div>
      <PageHeader 
        title="나의 학습이력"
        subtitle="수강 완료 및 진행 중인 교육과정을 확인하세요"
        breadcrumb="MY LEARNING"
        tabs={[
          { name: "교육과정 안내", href: "/education/courses" },
          { name: "수강신청", href: "/education/enroll" },
          { name: "나의 학습이력", href: "/education/history" },
          { name: "교육자료실", href: "/education/materials" },
          { name: "수료증 발급", href: "/education/certificate" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        {!user ? (
          <Card className="shadow-lg">
            <CardContent className="py-20 text-center">
              <GraduationCap className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground mb-4">로그인 후 학습이력을 확인할 수 있습니다</p>
              <Link href="/login">
                <Button className="bg-[#0052A5] hover:bg-[#003d7a]">로그인</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-lg border-t-4 border-t-[#0052A5]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0052A5]/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-[#0052A5]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{completedCourses.length}</p>
                      <p className="text-sm text-muted-foreground">수료 과정</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-t-4 border-t-[#FF6B35]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                      <PlayCircle className="h-6 w-6 text-[#FF6B35]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{inProgressCourses.length}</p>
                      <p className="text-sm text-muted-foreground">진행 중</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-t-4 border-t-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalHours}시간</p>
                      <p className="text-sm text-muted-foreground">총 학습시간</p>
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
                      <p className="text-2xl font-bold">{avgScore}점</p>
                      <p className="text-sm text-muted-foreground">평균 점수</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {inProgressCourses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-[#FF6B35]" />
                  진행 중인 교육
                </h2>
                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <Card key={course.id} className="shadow-md hover-elevate">
                      <CardContent className="p-5">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-[#FF6B35]">진행중</Badge>
                              <Badge variant="outline">{course.category}</Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-3">{course.title}</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">진행률</span>
                                <span className="font-medium">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          </div>
                          <Button className="bg-[#0052A5] hover:bg-[#003d7a]">
                            이어서 학습
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                수료 완료
              </h2>
              <div className="space-y-4">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="shadow-md">
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-green-500">수료</Badge>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              수료일: {course.completedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-[#FF6B35]" />
                              점수: {course.score}점
                            </span>
                          </div>
                        </div>
                        <Link href="/education/certificate">
                          <Button variant="outline" className="border-[#0052A5] text-[#0052A5]">
                            <Award className="h-4 w-4 mr-2" />
                            수료증 발급
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
