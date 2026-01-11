import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, BookOpen, GraduationCap } from "lucide-react";

const tabs = [
  { name: "학과개요", href: "/department" },
  { name: "교수진", href: "/department/faculty" },
  { name: "교육목표", href: "/department/goals" },
  { name: "졸업 후 진로", href: "/department/career" },
];

const faculty = [
  {
    name: "홍길동",
    title: "학과장 / 교수",
    specialty: "빅데이터 분석, 데이터 마이닝",
    email: "hong@dankook.ac.kr",
    education: "서울대학교 컴퓨터공학 박사",
    lab: "데이터사이언스 연구실",
  },
  {
    name: "김철수",
    title: "교수",
    specialty: "인공지능, 딥러닝",
    email: "kim@dankook.ac.kr",
    education: "KAIST 전산학 박사",
    lab: "AI 융합 연구실",
  },
  {
    name: "이영희",
    title: "교수",
    specialty: "자연어처리, 정보검색",
    email: "lee@dankook.ac.kr",
    education: "Stanford University CS 박사",
    lab: "NLP 연구실",
  },
  {
    name: "박민수",
    title: "부교수",
    specialty: "클라우드 컴퓨팅, 분산시스템",
    email: "park@dankook.ac.kr",
    education: "POSTECH 컴퓨터공학 박사",
    lab: "클라우드 연구실",
  },
  {
    name: "정소영",
    title: "부교수",
    specialty: "지식관리, 서비스공학",
    email: "jung@dankook.ac.kr",
    education: "고려대학교 경영공학 박사",
    lab: "지식서비스 연구실",
  },
  {
    name: "최준호",
    title: "조교수",
    specialty: "컴퓨터 비전, 영상처리",
    email: "choi@dankook.ac.kr",
    education: "MIT EECS 박사",
    lab: "비전 AI 연구실",
  },
];

export default function Faculty() {
  return (
    <div>
      <PageHeader 
        title="교수진" 
        subtitle="데이터지식서비스공학과 교수진을 소개합니다"
        breadcrumb="학과소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((prof, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-white">{prof.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-lg">{prof.name}</h3>
                    <p className="text-sm text-[#FF6B35]">{prof.title}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground">{prof.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-[#0052A5] mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{prof.education}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#0052A5] flex-shrink-0" />
                      <a href={`mailto:${prof.email}`} className="text-[#0052A5] hover:underline">
                        {prof.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                      {prof.lab}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
