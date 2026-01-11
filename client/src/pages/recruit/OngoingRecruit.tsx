import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/Header";
import { Clock, Users, Calendar, Briefcase, CheckCircle, AlertCircle, Hourglass } from "lucide-react";

const ongoingRecruits = [
  {
    id: 1,
    title: "시니어 프론트엔드 개발자",
    department: "개발본부",
    status: "면접진행",
    stage: "2차 면접",
    applicants: 48,
    shortlisted: 12,
    interviewed: 8,
    startDate: "2026-01-05",
    deadline: "2026-02-15",
    progress: 60,
  },
  {
    id: 2,
    title: "백엔드 개발자",
    department: "개발본부",
    status: "서류심사",
    stage: "서류 심사중",
    applicants: 67,
    shortlisted: 0,
    interviewed: 0,
    startDate: "2026-01-10",
    deadline: "2026-02-20",
    progress: 25,
  },
  {
    id: 3,
    title: "데이터 분석가",
    department: "데이터팀",
    status: "면접진행",
    stage: "1차 면접",
    applicants: 45,
    shortlisted: 15,
    interviewed: 5,
    startDate: "2026-01-08",
    deadline: "2026-02-28",
    progress: 45,
  },
  {
    id: 4,
    title: "HR 담당자",
    department: "인사팀",
    status: "최종단계",
    stage: "처우 협의",
    applicants: 28,
    shortlisted: 8,
    interviewed: 8,
    startDate: "2025-12-20",
    deadline: "2026-02-25",
    progress: 85,
  },
  {
    id: 5,
    title: "마케팅 매니저",
    department: "마케팅본부",
    status: "서류심사",
    stage: "서류 접수중",
    applicants: 21,
    shortlisted: 0,
    interviewed: 0,
    startDate: "2026-01-15",
    deadline: "2026-03-05",
    progress: 15,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "서류심사": return "bg-blue-100 text-blue-700";
    case "면접진행": return "bg-orange-100 text-orange-700";
    case "최종단계": return "bg-green-100 text-green-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 75) return "from-green-500 to-green-400";
  if (progress >= 50) return "from-orange-500 to-orange-400";
  return "from-blue-500 to-blue-400";
};

export default function OngoingRecruit() {
  return (
    <div>
      <PageHeader 
        title="진행중인 채용"
        subtitle="현재 진행중인 채용 현황을 확인하세요"
        breadcrumb="채용"
        tabs={[
          { name: "직무소개", href: "/recruit/positions" },
          { name: "채용 프로세스", href: "/recruit/process" },
          { name: "채용공고", href: "/recruit/jobs" },
          { name: "진행중인 채용", href: "/recruit/ongoing" },
          { name: "채용 FAQ", href: "/recruit/faq" },
          { name: "이력서 업로드", href: "/recruit/resume" },
          { name: "지원자 관리", href: "/recruit/applicants" },
          { name: "이메일 관리", href: "/recruit/email" },
          { name: "통계 분석", href: "/recruit/analytics" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">진행중 채용</p>
                  <p className="text-2xl font-bold">{ongoingRecruits.length}건</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100 text-green-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">총 지원자</p>
                  <p className="text-2xl font-bold">{ongoingRecruits.reduce((a, b) => a + b.applicants, 0)}명</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                  <Hourglass className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">면접 진행중</p>
                  <p className="text-2xl font-bold">{ongoingRecruits.filter(r => r.status === "면접진행").length}건</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">최종 단계</p>
                  <p className="text-2xl font-bold">{ongoingRecruits.filter(r => r.status === "최종단계").length}건</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {ongoingRecruits.map((recruit) => (
            <Card key={recruit.id} className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{recruit.title}</h3>
                      <Badge className={getStatusColor(recruit.status)}>
                        {recruit.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{recruit.department} · {recruit.stage}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">지원자</span>
                        <p className="font-bold">{recruit.applicants}명</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">서류통과</span>
                        <p className="font-bold">{recruit.shortlisted}명</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">면접완료</span>
                        <p className="font-bold">{recruit.interviewed}명</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">마감일</span>
                        <p className="font-bold">{recruit.deadline}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-48">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">진행률</span>
                      <span className="text-sm font-bold">{recruit.progress}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getProgressColor(recruit.progress)} rounded-full transition-all`}
                        style={{ width: `${recruit.progress}%` }}
                      />
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
