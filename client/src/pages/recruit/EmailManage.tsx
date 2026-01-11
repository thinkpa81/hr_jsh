import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/Header";
import { Mail, Send, Inbox, FileText, Clock, Users, Plus, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

const emailTemplates = [
  { id: 1, name: "서류 접수 안내", description: "지원서 접수 완료 안내 메일", usedCount: 156 },
  { id: 2, name: "서류 합격 안내", description: "서류 전형 합격 및 면접 안내", usedCount: 89 },
  { id: 3, name: "면접 일정 안내", description: "면접 일정 및 장소 안내", usedCount: 72 },
  { id: 4, name: "최종 합격 안내", description: "최종 합격 및 입사 안내", usedCount: 34 },
  { id: 5, name: "불합격 안내", description: "전형 결과 불합격 안내", usedCount: 48 },
];

const recentEmails = [
  { id: 1, subject: "[JSH] 서류 전형 결과 안내", recipients: 15, status: "전송완료", date: "2026-01-10 14:30" },
  { id: 2, subject: "[JSH] 1차 면접 일정 안내", recipients: 8, status: "전송완료", date: "2026-01-09 10:15" },
  { id: 3, subject: "[JSH] 최종 합격을 축하드립니다", recipients: 3, status: "전송완료", date: "2026-01-08 16:45" },
  { id: 4, subject: "[JSH] 2차 면접 안내", recipients: 5, status: "예약됨", date: "2026-01-11 09:00" },
  { id: 5, subject: "[JSH] 지원서 접수 완료", recipients: 12, status: "전송완료", date: "2026-01-07 11:20" },
];

export default function EmailManage() {
  return (
    <div>
      <PageHeader 
        title="이메일 관리"
        subtitle="채용 관련 이메일 발송 및 템플릿을 관리하세요"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <Send className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">이번 달 발송</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100 text-green-600">
                  <Inbox className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">오픈율</p>
                  <p className="text-2xl font-bold">87.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">예약 대기</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">템플릿</p>
                  <p className="text-2xl font-bold">{emailTemplates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#0052A5]" />
                이메일 템플릿
              </CardTitle>
              <Button size="sm" className="gap-2 bg-[#0052A5] hover:bg-[#003d7a]">
                <Plus className="h-4 w-4" />
                새 템플릿
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{template.usedCount}회 사용</Badge>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#FF6B35]" />
                최근 발송 내역
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                검색
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEmails.map((email) => (
                  <div key={email.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{email.subject}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {email.recipients}명
                        </span>
                        <span>{email.date}</span>
                      </div>
                    </div>
                    <Badge className={email.status === "전송완료" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                      {email.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-[#0052A5] to-[#003d7a] text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">새 이메일 발송</h3>
                <p className="text-white/80">채용 지원자들에게 이메일을 발송하세요</p>
              </div>
              <Button className="bg-white text-[#0052A5] hover:bg-white/90 gap-2">
                <Send className="h-4 w-4" />
                이메일 작성하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
