import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, GraduationCap, DollarSign, Users, ArrowLeft, Send } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Job } from "@shared/schema";

export default function JobDetail() {
  const [, params] = useRoute("/recruit/jobs/:id");

  const { data: job, isLoading } = useQuery<Job>({
    queryKey: ["/api/jobs", params?.id],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">채용공고를 찾을 수 없습니다.</p>
            <Link href="/recruit/jobs">
              <Button variant="ghost" className="mt-4">목록으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/recruit/jobs">
        <Button variant="ghost" className="gap-2 mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary">{job.company}</Badge>
                <Badge variant="outline">{job.employmentType}</Badge>
                <Badge className="bg-green-500">채용중</Badge>
              </div>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <p className="text-muted-foreground">{job.department}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.education}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{job.salary}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">직무 설명</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">자격 요건</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{job.requirements}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">복리후생</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{job.benefits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">마감일</span>
                  <span className="font-medium">{job.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">조회수</span>
                  <span className="font-medium">{job.views}회</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">지원자</span>
                  <span className="font-medium flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {job.applicants}명
                  </span>
                </div>
              </div>
              <Button className="w-full gap-2" size="lg" data-testid="button-apply">
                <Send className="h-4 w-4" />
                지원하기
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                예시 데이터입니다
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">채용 프로세스</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                  <span>서류 전형</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">2</div>
                  <span>1차 면접</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">3</div>
                  <span>2차 면접</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">4</div>
                  <span>최종 합격</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
