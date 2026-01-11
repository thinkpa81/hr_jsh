import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/Header";
import { Users, Search, Filter, Mail, Phone, Eye, MoreHorizontal, Calendar, Briefcase } from "lucide-react";

const applicants = [
  { id: 1, name: "김철수", position: "프론트엔드 개발자", status: "서류심사", date: "2026-01-08", email: "kim@email.com", phone: "010-1234-5678", experience: "3년" },
  { id: 2, name: "이영희", position: "백엔드 개발자", status: "1차면접", date: "2026-01-07", email: "lee@email.com", phone: "010-2345-6789", experience: "5년" },
  { id: 3, name: "박민수", position: "UI/UX 디자이너", status: "2차면접", date: "2026-01-05", email: "park@email.com", phone: "010-3456-7890", experience: "4년" },
  { id: 4, name: "정수진", position: "데이터 분석가", status: "합격", date: "2026-01-04", email: "jung@email.com", phone: "010-4567-8901", experience: "2년" },
  { id: 5, name: "최동훈", position: "프론트엔드 개발자", status: "불합격", date: "2026-01-03", email: "choi@email.com", phone: "010-5678-9012", experience: "1년" },
  { id: 6, name: "강미래", position: "HR 담당자", status: "서류심사", date: "2026-01-09", email: "kang@email.com", phone: "010-6789-0123", experience: "6년" },
  { id: 7, name: "윤서연", position: "마케팅 매니저", status: "1차면접", date: "2026-01-06", email: "yoon@email.com", phone: "010-7890-1234", experience: "4년" },
  { id: 8, name: "임재현", position: "백엔드 개발자", status: "서류심사", date: "2026-01-10", email: "lim@email.com", phone: "010-8901-2345", experience: "2년" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "서류심사": return "bg-blue-100 text-blue-700";
    case "1차면접": return "bg-yellow-100 text-yellow-700";
    case "2차면접": return "bg-purple-100 text-purple-700";
    case "합격": return "bg-green-100 text-green-700";
    case "불합격": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Applicants() {
  return (
    <div>
      <PageHeader 
        title="지원자 관리"
        subtitle="채용 지원자 현황을 관리하세요"
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
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="이름, 포지션으로 검색" 
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="gap-2 flex-1 md:flex-none">
                  <Filter className="h-4 w-4" />
                  필터
                </Button>
                <Button className="bg-[#0052A5] hover:bg-[#003d7a] gap-2 flex-1 md:flex-none">
                  <Users className="h-4 w-4" />
                  전체 {applicants.length}명
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">서류 심사</p>
                  <p className="text-2xl font-bold">{applicants.filter(a => a.status === "서류심사").length}명</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Briefcase className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">면접 진행</p>
                  <p className="text-2xl font-bold">{applicants.filter(a => a.status.includes("면접")).length}명</p>
                </div>
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">합격</p>
                  <p className="text-2xl font-bold text-green-600">{applicants.filter(a => a.status === "합격").length}명</p>
                </div>
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">불합격</p>
                  <p className="text-2xl font-bold text-red-600">{applicants.filter(a => a.status === "불합격").length}명</p>
                </div>
                <div className="p-2 rounded-lg bg-red-100 text-red-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-4 px-6 font-medium">이름</th>
                    <th className="text-left py-4 px-6 font-medium">지원 포지션</th>
                    <th className="text-left py-4 px-6 font-medium">경력</th>
                    <th className="text-left py-4 px-6 font-medium">지원일</th>
                    <th className="text-center py-4 px-6 font-medium">상태</th>
                    <th className="text-center py-4 px-6 font-medium">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="border-b hover:bg-muted/30">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-xs text-muted-foreground">{applicant.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">{applicant.position}</td>
                      <td className="py-4 px-6">{applicant.experience}</td>
                      <td className="py-4 px-6">{applicant.date}</td>
                      <td className="py-4 px-6 text-center">
                        <Badge className={getStatusColor(applicant.status)}>
                          {applicant.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
