import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { Award, Target, BarChart3, Calendar, CheckCircle, Star, Users, FileText } from "lucide-react";

const evaluationTypes = [
  {
    title: "성과 평가",
    period: "반기별",
    description: "업무 목표 달성도와 성과를 측정합니다",
    items: ["목표 달성률", "업무 품질", "생산성", "문제 해결 능력"],
    weight: 60,
  },
  {
    title: "역량 평가",
    period: "연간",
    description: "직무 역량과 핵심 역량을 평가합니다",
    items: ["전문성", "리더십", "협업", "커뮤니케이션"],
    weight: 40,
  },
];

const evaluationProcess = [
  { step: 1, title: "목표 설정", description: "상반기/하반기 시작 시 개인 목표 수립", timing: "1월/7월" },
  { step: 2, title: "중간 점검", description: "목표 달성 현황 점검 및 피드백", timing: "3월/9월" },
  { step: 3, title: "자기 평가", description: "본인 성과에 대한 자기 평가 작성", timing: "6월/12월" },
  { step: 4, title: "1차 평가", description: "직속 상사의 1차 평가 진행", timing: "6월/12월" },
  { step: 5, title: "2차 평가", description: "상위 관리자의 2차 평가 및 조정", timing: "7월/1월" },
  { step: 6, title: "피드백 면담", description: "평가 결과 공유 및 개발 계획 수립", timing: "7월/1월" },
];

const gradeSystem = [
  { grade: "S", description: "탁월", percentage: "상위 5%", color: "bg-purple-500" },
  { grade: "A", description: "우수", percentage: "상위 20%", color: "bg-blue-500" },
  { grade: "B+", description: "양호", percentage: "상위 40%", color: "bg-green-500" },
  { grade: "B", description: "보통", percentage: "상위 70%", color: "bg-yellow-500" },
  { grade: "C", description: "개선필요", percentage: "하위 30%", color: "bg-orange-500" },
];

export default function Evaluation() {
  return (
    <div>
      <PageHeader 
        title="평가제도"
        subtitle="공정하고 투명한 성과 평가 시스템"
        breadcrumb="인사제도"
        tabs={[
          { name: "HR 종합 가이드", href: "/hr/guide" },
          { name: "임원인사", href: "/hr/executive" },
          { name: "평가제도", href: "/hr/evaluation" },
          { name: "승진제도", href: "/hr/promotion" },
          { name: "복리후생", href: "/hr/benefits" },
          { name: "조직문화", href: "/hr/culture" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">평가제도 개요</h2>
          <p className="text-muted-foreground">
            JSH는 공정하고 투명한 평가를 통해 구성원의 성장을 지원합니다.
            성과와 역량을 균형있게 평가하여 개인의 발전 방향을 제시합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {evaluationTypes.map((type, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#0052A5]" />
                    {type.title}
                  </CardTitle>
                  <span className="text-sm font-medium bg-[#0052A5] text-white px-3 py-1 rounded-full">
                    반영 비율 {type.weight}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <p className="text-sm text-muted-foreground mb-2">평가 주기: {type.period}</p>
                <div className="space-y-2">
                  {type.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#FF6B35]" />
              평가 프로세스
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evaluationProcess.map((process) => (
                <div key={process.step} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#0052A5] text-white flex items-center justify-center font-bold text-sm">
                      {process.step}
                    </div>
                    <h4 className="font-medium">{process.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{process.description}</p>
                  <p className="text-xs text-[#FF6B35] font-medium">{process.timing}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#0052A5]" />
              평가 등급 체계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gradeSystem.map((grade, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${grade.color} text-white flex items-center justify-center font-bold text-lg`}>
                    {grade.grade}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{grade.description}</span>
                      <span className="text-sm text-muted-foreground">{grade.percentage}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${grade.color} rounded-full`}
                        style={{ width: grade.percentage.includes("5") ? "5%" : grade.percentage.includes("20") ? "20%" : grade.percentage.includes("40") ? "40%" : grade.percentage.includes("70") ? "70%" : "30%" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
