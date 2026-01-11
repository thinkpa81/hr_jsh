import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, GraduationCap, Award, Target, BookOpen } from "lucide-react";

const tabs = [
  { name: "일반소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "연혁", href: "/about/history" },
  { name: "조직도", href: "/about/organization" },
  { name: "오시는 길", href: "/about/location" },
];

export default function About() {
  return (
    <div>
      <PageHeader 
        title="대학원 소개" 
        subtitle="데이터지식서비스공학과의 비전과 목표를 소개합니다"
        breadcrumb="대학원소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">데이터지식서비스공학과</h2>
            <p className="text-lg text-muted-foreground">
              단국대학교 대학원 데이터지식서비스공학과는 4차 산업혁명 시대를 선도할 
              데이터 전문가 양성을 목표로 합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0052A5]/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-[#0052A5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">비전</h3>
                    <p className="text-muted-foreground">
                      데이터 기반 의사결정과 지식서비스 혁신을 통해 
                      사회와 산업 발전에 기여하는 글로벌 인재 양성
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">미션</h3>
                    <p className="text-muted-foreground">
                      실무 중심의 교육과 연구를 통해 데이터 분석, AI, 
                      지식서비스 분야의 전문 인력 양성
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-[#0052A5]" />
                </div>
                <h3 className="font-bold text-2xl text-[#0052A5] mb-1">석·박사</h3>
                <p className="text-muted-foreground">학위과정 운영</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#FF6B35]" />
                </div>
                <h3 className="font-bold text-2xl text-[#FF6B35] mb-1">15+</h3>
                <p className="text-muted-foreground">전임 교수진</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-[#0052A5]" />
                </div>
                <h3 className="font-bold text-2xl text-[#0052A5] mb-1">50+</h3>
                <p className="text-muted-foreground">개설 과목</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#0052A5]" />
                학과 소개
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  데이터지식서비스공학과는 빅데이터, 인공지능, 클라우드 컴퓨팅 등 
                  첨단 기술을 기반으로 한 지식서비스 분야의 전문 인력을 양성합니다.
                </p>
                <p>
                  본 학과는 이론과 실무를 균형 있게 교육하며, 산업체와의 긴밀한 
                  협력을 통해 실질적인 문제 해결 능력을 갖춘 인재를 배출합니다.
                </p>
                <p>
                  졸업생들은 IT 기업, 금융기관, 공공기관, 연구소 등 다양한 분야에서 
                  데이터 과학자, AI 엔지니어, 시스템 아키텍트 등으로 활약하고 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
