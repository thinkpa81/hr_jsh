import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/Header";
import { Code, Palette, BarChart3, Users, Megaphone, Settings, Building2, HeadphonesIcon } from "lucide-react";

const positions = [
  {
    category: "개발",
    icon: Code,
    color: "bg-blue-100 text-blue-600",
    roles: [
      { title: "프론트엔드 개발자", description: "React, Vue.js 등 프레임워크를 활용한 웹 애플리케이션 개발", skills: ["React", "TypeScript", "CSS"] },
      { title: "백엔드 개발자", description: "Node.js, Java 기반의 API 및 서버 개발", skills: ["Node.js", "Java", "SQL"] },
      { title: "풀스택 개발자", description: "프론트엔드부터 백엔드까지 전체 개발 담당", skills: ["React", "Node.js", "AWS"] },
      { title: "DevOps 엔지니어", description: "CI/CD 파이프라인 구축 및 인프라 관리", skills: ["Docker", "Kubernetes", "AWS"] },
    ]
  },
  {
    category: "디자인",
    icon: Palette,
    color: "bg-purple-100 text-purple-600",
    roles: [
      { title: "UI/UX 디자이너", description: "사용자 중심의 인터페이스 및 경험 설계", skills: ["Figma", "Adobe XD", "Prototyping"] },
      { title: "그래픽 디자이너", description: "브랜드 아이덴티티 및 마케팅 디자인", skills: ["Photoshop", "Illustrator", "InDesign"] },
      { title: "모션 디자이너", description: "인터랙션 및 애니메이션 디자인", skills: ["After Effects", "Lottie", "CSS Animation"] },
    ]
  },
  {
    category: "데이터",
    icon: BarChart3,
    color: "bg-green-100 text-green-600",
    roles: [
      { title: "데이터 분석가", description: "비즈니스 인사이트 도출을 위한 데이터 분석", skills: ["SQL", "Python", "Tableau"] },
      { title: "데이터 엔지니어", description: "데이터 파이프라인 구축 및 관리", skills: ["Spark", "Airflow", "BigQuery"] },
      { title: "머신러닝 엔지니어", description: "ML 모델 개발 및 서비스 적용", skills: ["Python", "TensorFlow", "MLOps"] },
    ]
  },
  {
    category: "인사/경영",
    icon: Users,
    color: "bg-orange-100 text-orange-600",
    roles: [
      { title: "HR 담당자", description: "채용, 교육, 인사관리 업무 수행", skills: ["채용", "노무관리", "교육기획"] },
      { title: "HRBP", description: "사업부 HR 파트너로서 전략적 인사 지원", skills: ["조직개발", "성과관리", "커뮤니케이션"] },
      { title: "경영기획", description: "전사 전략 수립 및 실행 관리", skills: ["전략기획", "재무분석", "프로젝트관리"] },
    ]
  },
  {
    category: "마케팅",
    icon: Megaphone,
    color: "bg-pink-100 text-pink-600",
    roles: [
      { title: "디지털 마케터", description: "온라인 마케팅 채널 전략 수립 및 운영", skills: ["GA", "Facebook Ads", "SEO"] },
      { title: "브랜드 마케터", description: "브랜드 전략 수립 및 캠페인 기획", skills: ["브랜딩", "캠페인기획", "PR"] },
      { title: "콘텐츠 마케터", description: "마케팅 콘텐츠 기획 및 제작", skills: ["콘텐츠기획", "SNS", "영상편집"] },
    ]
  },
  {
    category: "고객서비스",
    icon: HeadphonesIcon,
    color: "bg-teal-100 text-teal-600",
    roles: [
      { title: "CS 매니저", description: "고객 서비스 정책 수립 및 팀 관리", skills: ["CS전략", "팀관리", "VOC분석"] },
      { title: "고객상담사", description: "고객 문의 응대 및 문제 해결", skills: ["커뮤니케이션", "문제해결", "CRM"] },
    ]
  },
];

export default function Positions() {
  return (
    <div>
      <PageHeader 
        title="직무소개"
        subtitle="JSH의 다양한 직무를 알아보세요"
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
        <div className="space-y-12">
          {positions.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">{category.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.roles.map((role, roleIndex) => (
                  <Card key={roleIndex} className="hover-elevate">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">{role.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
