import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Users, Award, TrendingUp, Database, Brain, Cloud } from "lucide-react";

const tabs = [
  { name: "학과개요", href: "/department" },
  { name: "교수진", href: "/department/faculty" },
  { name: "교육목표", href: "/department/goals" },
  { name: "졸업 후 진로", href: "/department/career" },
];

export default function Department() {
  return (
    <div>
      <PageHeader 
        title="학과 개요" 
        subtitle="데이터지식서비스공학과를 소개합니다"
        breadcrumb="학과소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">데이터지식서비스공학과</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              데이터 기반의 지식서비스 혁신을 선도하는 전문 인력 양성을 목표로, 
              빅데이터, 인공지능, 클라우드 컴퓨팅 분야의 심화 교육을 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-[#0052A5]" />
                </div>
                <h3 className="font-bold text-lg mb-2">데이터사이언스</h3>
                <p className="text-sm text-muted-foreground">
                  빅데이터 분석, 데이터 마이닝, 통계적 모델링 및 시각화
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-[#FF6B35]" />
                </div>
                <h3 className="font-bold text-lg mb-2">인공지능</h3>
                <p className="text-sm text-muted-foreground">
                  머신러닝, 딥러닝, 자연어처리, 컴퓨터 비전
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-8 w-8 text-[#0052A5]" />
                </div>
                <h3 className="font-bold text-lg mb-2">지식서비스공학</h3>
                <p className="text-sm text-muted-foreground">
                  클라우드 컴퓨팅, 지식관리, 서비스 설계
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-[#0052A5]">
                <BookOpen className="h-5 w-5" />
                학과 특성
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="h-4 w-4 text-[#FF6B35]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">실무 중심 교육</h4>
                      <p className="text-sm text-muted-foreground">
                        산업체 연계 프로젝트와 실습 중심의 교과과정 운영
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0052A5]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="h-4 w-4 text-[#0052A5]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">소규모 세미나</h4>
                      <p className="text-sm text-muted-foreground">
                        교수 1인당 소수 학생 지도로 밀착 교육 실현
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="h-4 w-4 text-[#FF6B35]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">산학협력</h4>
                      <p className="text-sm text-muted-foreground">
                        국내외 IT 기업과의 협력을 통한 현장 중심 교육
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0052A5]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="h-4 w-4 text-[#0052A5]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">연구 지원</h4>
                      <p className="text-sm text-muted-foreground">
                        학회 논문 발표, 학술대회 참여 적극 지원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">석사과정</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 수업연한: 2년 (4학기)</li>
                  <li>• 졸업학점: 24학점 이상</li>
                  <li>• 졸업요건: 학위논문 또는 연구보고서</li>
                  <li>• 종합시험: 전공 2과목</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">박사과정</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 수업연한: 3년 (6학기)</li>
                  <li>• 졸업학점: 36학점 이상</li>
                  <li>• 졸업요건: 학위논문</li>
                  <li>• 종합시험: 전공 3과목, 외국어 1과목</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
