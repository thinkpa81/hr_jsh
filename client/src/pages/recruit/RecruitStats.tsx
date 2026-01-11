import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { BarChart3, Users, Clock, Target, TrendingUp, TrendingDown, Calendar } from "lucide-react";

const monthlyData = [
  { month: "1월", applicants: 156, hired: 12, rate: 7.7 },
  { month: "2월", applicants: 189, hired: 15, rate: 7.9 },
  { month: "3월", applicants: 234, hired: 18, rate: 7.7 },
  { month: "4월", applicants: 198, hired: 14, rate: 7.1 },
  { month: "5월", applicants: 212, hired: 16, rate: 7.5 },
  { month: "6월", applicants: 245, hired: 19, rate: 7.8 },
  { month: "7월", applicants: 267, hired: 21, rate: 7.9 },
  { month: "8월", applicants: 289, hired: 23, rate: 8.0 },
  { month: "9월", applicants: 234, hired: 17, rate: 7.3 },
  { month: "10월", applicants: 256, hired: 20, rate: 7.8 },
  { month: "11월", applicants: 278, hired: 22, rate: 7.9 },
  { month: "12월", applicants: 198, hired: 15, rate: 7.6 },
];

const positionStats = [
  { position: "개발", applicants: 1245, hired: 89, avgDays: 28, satisfaction: 4.5 },
  { position: "디자인", applicants: 456, hired: 34, avgDays: 32, satisfaction: 4.3 },
  { position: "마케팅", applicants: 567, hired: 42, avgDays: 25, satisfaction: 4.6 },
  { position: "영업", applicants: 389, hired: 28, avgDays: 21, satisfaction: 4.2 },
  { position: "인사", applicants: 234, hired: 18, avgDays: 30, satisfaction: 4.4 },
];

export default function RecruitStats() {
  const totalApplicants = monthlyData.reduce((a, b) => a + b.applicants, 0);
  const totalHired = monthlyData.reduce((a, b) => a + b.hired, 0);
  const avgRate = (totalHired / totalApplicants * 100).toFixed(1);

  return (
    <div>
      <PageHeader 
        title="통계 분석"
        subtitle="채용 데이터를 분석하고 인사이트를 얻으세요"
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">연간 지원자</p>
                  <p className="text-3xl font-bold">{totalApplicants.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> +15.2%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">연간 채용</p>
                  <p className="text-3xl font-bold">{totalHired}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> +8.5%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-100 text-green-600">
                  <Target className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">평균 채용률</p>
                  <p className="text-3xl font-bold">{avgRate}%</p>
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3" /> -0.3%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">평균 소요일</p>
                  <p className="text-3xl font-bold">28일</p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> -3일
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0052A5]" />
              월별 채용 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">월</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">지원자</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">채용</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">채용률</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">추이</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{data.month}</td>
                      <td className="py-3 px-4 text-center">{data.applicants}</td>
                      <td className="py-3 px-4 text-center text-green-600 font-bold">{data.hired}</td>
                      <td className="py-3 px-4 text-center">{data.rate}%</td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#0052A5] to-[#FF6B35] h-2 rounded-full"
                            style={{ width: `${(data.applicants / 300) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#FF6B35]" />
              직군별 채용 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">직군</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">지원자</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">채용</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">평균 소요일</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">만족도</th>
                  </tr>
                </thead>
                <tbody>
                  {positionStats.map((stat, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{stat.position}</td>
                      <td className="py-3 px-4 text-center">{stat.applicants.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center text-green-600 font-bold">{stat.hired}</td>
                      <td className="py-3 px-4 text-center">{stat.avgDays}일</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {stat.satisfaction}/5.0
                        </span>
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
