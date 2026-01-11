import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/Header";
import type { Course } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Enrollment() {
  const { toast } = useToast();

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const handleEnroll = (courseTitle: string) => {
    toast({
      title: "수강 신청 완료",
      description: `"${courseTitle}" 과정에 수강 신청되었습니다.`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner />
      </div>
    );
  }

  const openCourses = courses?.filter(c => c.status === "open") || courses?.slice(0, 3) || [];
  const upcomingCourses = courses?.filter(c => c.status === "upcoming") || courses?.slice(3) || [];

  return (
    <div>
      <PageHeader 
        title="수강신청"
        subtitle="원하는 교육과정을 선택하고 수강 신청하세요"
        breadcrumb="ENROLLMENT"
        tabs={[
          { name: "교육과정 안내", href: "/education/courses" },
          { name: "수강신청", href: "/education/enroll" },
          { name: "나의 학습이력", href: "/education/history" },
          { name: "교육자료실", href: "/education/materials" },
          { name: "수료증 발급", href: "/education/certificate" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                신청 가능한 교육
              </h2>
              <div className="space-y-4">
                {openCourses.map((course) => (
                  <Card key={course.id} className="hover-elevate shadow-md">
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-green-500">신청가능</Badge>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {course.enrollments}/{30}명
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-4 w-4" />
                              {course.instructor}
                            </span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleEnroll(course.title)}
                          className="bg-[#0052A5] hover:bg-[#003d7a]"
                        >
                          수강 신청
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#FF6B35]" />
                예정된 교육
              </h2>
              <div className="space-y-4">
                {upcomingCourses.map((course) => (
                  <Card key={course.id} className="shadow-md opacity-80">
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">예정</Badge>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-4 w-4" />
                              {course.instructor}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" disabled>
                          신청 예정
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-t-4 border-t-[#0052A5]">
              <CardHeader>
                <CardTitle className="text-lg">수강 신청 안내</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0052A5] text-white flex items-center justify-center flex-shrink-0 text-xs">1</div>
                  <div>
                    <p className="font-medium">교육과정 선택</p>
                    <p className="text-muted-foreground">원하는 교육과정을 선택합니다</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0052A5] text-white flex items-center justify-center flex-shrink-0 text-xs">2</div>
                  <div>
                    <p className="font-medium">수강 신청</p>
                    <p className="text-muted-foreground">신청 버튼을 클릭하여 등록합니다</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0052A5] text-white flex items-center justify-center flex-shrink-0 text-xs">3</div>
                  <div>
                    <p className="font-medium">승인 확인</p>
                    <p className="text-muted-foreground">관리자 승인 후 교육에 참여합니다</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-[#FF6B35]/5 border-[#FF6B35]/20">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#FF6B35]">유의사항</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      수강 신청 후 취소는 교육 시작 3일 전까지 가능합니다.
                    </p>
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
