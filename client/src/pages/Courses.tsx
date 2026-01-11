import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, Star, BookOpen } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/Header";
import type { Course } from "@shared/schema";

export default function Courses() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="교육/개발"
        subtitle="JSH의 다양한 교육 프로그램을 확인하세요"
        breadcrumb="EDUCATION"
        tabs={[
          { name: "교육과정 안내", href: "/education/courses" },
          { name: "수강신청", href: "/education/enroll" },
          { name: "나의 학습이력", href: "/education/history" },
          { name: "교육자료실", href: "/education/materials" },
          { name: "수료증 발급", href: "/education/certificate" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <Card key={course.id} className="hover-elevate shadow-lg group" data-testid={`course-card-${course.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-[#0052A5]">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-[#0052A5] transition-colors">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#0052A5]" />
                    <span>강사: {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#0052A5]" />
                    <span>교육시간: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0052A5]" />
                    <span>수강인원: {course.enrollments}명</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-[#FF6B35]" />
                    <span>평점: {(course.rating || 0) / 10}/5.0</span>
                  </div>
                </div>
                <Button className="w-full gap-2 bg-[#0052A5] hover:bg-[#003d7a]" data-testid={`button-enroll-${course.id}`}>
                  <BookOpen className="h-4 w-4" />
                  수강 신청
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!courses || courses.length === 0) && (
          <Card className="shadow-lg">
            <CardContent className="py-20 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">등록된 교육과정이 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
