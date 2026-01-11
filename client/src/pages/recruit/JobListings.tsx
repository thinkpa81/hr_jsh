import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/Header";
import { Briefcase, MapPin, Clock, Users, ChevronRight, Building2, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const jobListings = [
  {
    id: 1,
    title: "시니어 프론트엔드 개발자",
    department: "개발본부",
    location: "서울 강남",
    type: "정규직",
    experience: "경력 5년 이상",
    salary: "협의",
    deadline: "2026-02-15",
    isHot: true,
    applicants: 48,
  },
  {
    id: 2,
    title: "백엔드 개발자",
    department: "개발본부",
    location: "서울 강남",
    type: "정규직",
    experience: "경력 3년 이상",
    salary: "5,000~7,000만원",
    deadline: "2026-02-20",
    isHot: true,
    applicants: 67,
  },
  {
    id: 3,
    title: "UI/UX 디자이너",
    department: "디자인팀",
    location: "서울 강남",
    type: "정규직",
    experience: "경력 2년 이상",
    salary: "4,000~5,500만원",
    deadline: "2026-02-10",
    isHot: false,
    applicants: 32,
  },
  {
    id: 4,
    title: "HR 담당자",
    department: "인사팀",
    location: "서울 강남",
    type: "정규직",
    experience: "경력 3년 이상",
    salary: "4,500~6,000만원",
    deadline: "2026-02-25",
    isHot: false,
    applicants: 28,
  },
  {
    id: 5,
    title: "데이터 분석가",
    department: "데이터팀",
    location: "서울 판교",
    type: "정규직",
    experience: "경력 2년 이상",
    salary: "5,000~7,000만원",
    deadline: "2026-02-28",
    isHot: true,
    applicants: 45,
  },
  {
    id: 6,
    title: "마케팅 매니저",
    department: "마케팅본부",
    location: "서울 강남",
    type: "정규직",
    experience: "경력 5년 이상",
    salary: "6,000~8,000만원",
    deadline: "2026-03-05",
    isHot: false,
    applicants: 21,
  },
];

export default function JobListings() {
  const { toast } = useToast();

  const handleApply = (jobId: number) => {
    toast({
      title: "준비중입니다",
      description: "해당 기능은 현재 준비중입니다. 빠른 시일 내에 제공해 드리겠습니다.",
    });
  };

  return (
    <div>
      <PageHeader 
        title="채용공고"
        subtitle="JSH와 함께 성장할 인재를 찾습니다"
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
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            총 <span className="font-bold text-foreground">{jobListings.length}</span>개의 채용공고가 있습니다
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">최신순</Button>
            <Button variant="outline" size="sm">마감임박순</Button>
          </div>
        </div>

        <div className="grid gap-4">
          {jobListings.map((job) => (
            <Card key={job.id} className="hover-elevate cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {job.isHot && (
                        <Badge className="bg-[#FF6B35] text-white">HOT</Badge>
                      )}
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#0052A5] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:items-end gap-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        지원자 {job.applicants}명
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        ~{job.deadline}
                      </span>
                    </div>
                    <Button 
                      className="bg-[#0052A5] hover:bg-[#003d7a] gap-2"
                      onClick={() => handleApply(job.id)}
                      data-testid={`button-apply-${job.id}`}
                    >
                      지원하기
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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
