import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, Star, BookOpen, Search, Filter } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Course } from "@shared/schema";
import { useState } from "react";
import { Link } from "wouter";

export default function CoursesCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterCategory === "all") return matchesSearch;
    return matchesSearch && course.category === filterCategory;
  });

  const categories = Array.from(new Set(courses?.map(c => c.category) || [])).filter((c): c is string => c !== null);

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
        title="교육과정 안내"
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
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="교육과정 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12"
              data-testid="input-search"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48 h-12">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{filteredCourses?.length || 0}</span>개의 교육과정
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses?.map((course) => (
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
                <Link href="/education/enroll">
                  <Button className="w-full gap-2 bg-[#0052A5] hover:bg-[#003d7a]" data-testid={`button-enroll-${course.id}`}>
                    <BookOpen className="h-4 w-4" />
                    수강 신청
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!filteredCourses || filteredCourses.length === 0) && (
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
