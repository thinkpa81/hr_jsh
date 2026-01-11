import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { Users, UserCheck, UserX, Clock, Building2, Award, GraduationCap, Briefcase } from "lucide-react";

const workforceStats = [
  { label: "총 직원 수", value: "1,247", icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "정규직", value: "1,089", icon: UserCheck, color: "bg-green-100 text-green-600" },
  { label: "계약직", value: "158", icon: Clock, color: "bg-orange-100 text-orange-600" },
  { label: "이번 달 퇴사", value: "12", icon: UserX, color: "bg-red-100 text-red-600" },
];

const ageDistribution = [
  { range: "20대", count: 312, percentage: 25 },
  { range: "30대", count: 498, percentage: 40 },
  { range: "40대", count: 312, percentage: 25 },
  { range: "50대 이상", count: 125, percentage: 10 },
];

const tenureDistribution = [
  { range: "1년 미만", count: 186, percentage: 15 },
  { range: "1-3년", count: 374, percentage: 30 },
  { range: "3-5년", count: 312, percentage: 25 },
  { range: "5-10년", count: 249, percentage: 20 },
  { range: "10년 이상", count: 126, percentage: 10 },
];

const educationData = [
  { level: "고졸", count: 87, percentage: 7 },
  { level: "전문대졸", count: 162, percentage: 13 },
  { level: "대졸", count: 748, percentage: 60 },
  { level: "석사", count: 200, percentage: 16 },
  { level: "박사", count: 50, percentage: 4 },
];

const departmentHeadcount = [
  { dept: "개발본부", headcount: 342, managers: 28, ratio: "1:12" },
  { dept: "영업본부", headcount: 256, managers: 32, ratio: "1:8" },
  { dept: "마케팅본부", headcount: 128, managers: 16, ratio: "1:8" },
  { dept: "경영지원본부", headcount: 180, managers: 24, ratio: "1:7.5" },
  { dept: "연구개발본부", headcount: 198, managers: 22, ratio: "1:9" },
  { dept: "고객서비스본부", headcount: 143, managers: 18, ratio: "1:8" },
];

export default function Workforce() {
  return (
    <div>
      <PageHeader 
        title="인력 현황"
        subtitle="조직의 인력 구성을 상세히 분석하세요"
        breadcrumb="HR 분석"
        tabs={[
          { name: "대시보드", href: "/analytics/dashboard" },
          { name: "채용 분석", href: "/analytics/recruit" },
          { name: "인력 현황", href: "/analytics/workforce" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {workforceStats.map((stat, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#0052A5]" />
                연령대별 분포
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ageDistribution.map((age, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{age.range}</span>
                      <span className="text-muted-foreground">{age.count}명 ({age.percentage}%)</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#0052A5] to-[#0052A5]/70 rounded-full"
                        style={{ width: `${age.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#FF6B35]" />
                근속연수별 분포
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tenureDistribution.map((tenure, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{tenure.range}</span>
                      <span className="text-muted-foreground">{tenure.count}명 ({tenure.percentage}%)</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/70 rounded-full"
                        style={{ width: `${tenure.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-600" />
                학력별 분포
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {educationData.map((edu, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <span className="font-medium">{edu.level}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{edu.count}명</span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {edu.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#0052A5]" />
                부서별 인력 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">부서</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">인원</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">관리자</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">관리자 비율</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentHeadcount.map((dept, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{dept.dept}</td>
                        <td className="py-3 px-4 text-center">{dept.headcount}명</td>
                        <td className="py-3 px-4 text-center">{dept.managers}명</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {dept.ratio}
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

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-4xl font-bold">56%</p>
              <p className="text-muted-foreground mt-2">남성 비율</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-pink-100 flex items-center justify-center">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <p className="text-4xl font-bold">44%</p>
              <p className="text-muted-foreground mt-2">여성 비율</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-4xl font-bold">4.2년</p>
              <p className="text-muted-foreground mt-2">평균 근속연수</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
