import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, Star, Users, FileText } from "lucide-react";

const tabs = [
  { name: "모집요강", href: "/admission" },
  { name: "입학절차", href: "/admission/process" },
  { name: "장학안내", href: "/admission/scholarship" },
  { name: "등록금 안내", href: "/admission/tuition" },
  { name: "FAQ", href: "/admission/faq" },
];

const scholarships = [
  {
    name: "성적우수장학금",
    amount: "등록금의 50~100%",
    criteria: "직전학기 성적 상위자",
    note: "GPA 4.0 이상 / 학과 추천",
  },
  {
    name: "연구조교장학금",
    amount: "등록금의 50~100%",
    criteria: "연구 참여 대학원생",
    note: "지도교수 연구과제 참여자",
  },
  {
    name: "신입생장학금",
    amount: "등록금의 30~50%",
    criteria: "입학성적 우수자",
    note: "입학 첫 학기 지급",
  },
  {
    name: "근로장학금",
    amount: "월 30~50만원",
    criteria: "학과 행정 보조",
    note: "주 10시간 이내 근무",
  },
  {
    name: "국가장학금",
    amount: "소득분위별 차등",
    criteria: "한국장학재단 기준 충족",
    note: "별도 신청 필요",
  },
  {
    name: "BK21사업장학금",
    amount: "월 70~150만원",
    criteria: "BK21 참여 대학원생",
    note: "연구 성과 연계",
  },
];

export default function Scholarship() {
  return (
    <div>
      <PageHeader 
        title="장학안내" 
        subtitle="다양한 장학제도로 학업을 지원합니다"
        breadcrumb="입학안내"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-[#FF6B35]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">장학금 지원 안내</h2>
            <p className="text-muted-foreground">
              데이터지식서비스공학과는 학업에 전념할 수 있도록 다양한 장학 혜택을 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {scholarships.map((scholarship, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-[#FF6B35]" />
                    <h3 className="font-bold">{scholarship.name}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">지원금액</span>
                      <span className="font-medium text-[#0052A5]">{scholarship.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">지원기준</span>
                      <span>{scholarship.criteria}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    {scholarship.note}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0052A5]">
                <FileText className="h-5 w-5" />
                장학금 신청 절차
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#0052A5] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                  <p className="text-sm font-medium">신청서 작성</p>
                  <p className="text-xs text-muted-foreground mt-1">학과 양식 다운로드</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#0052A5] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                  <p className="text-sm font-medium">서류 제출</p>
                  <p className="text-xs text-muted-foreground mt-1">학과 사무실 제출</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#0052A5] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                  <p className="text-sm font-medium">심사</p>
                  <p className="text-xs text-muted-foreground mt-1">학과 장학위원회</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
                  <p className="text-sm font-medium">결과 통보</p>
                  <p className="text-xs text-muted-foreground mt-1">개별 안내</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0052A5]/5 border-[#0052A5]/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-[#0052A5]" />
                <h3 className="font-bold text-[#0052A5]">신청 문의</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>장학금 관련 문의사항은 교학행정팀으로 연락주시기 바랍니다.</p>
                <p className="mt-2">전화: 031-8005-2262~3 / 이메일: datakse@dankook.ac.kr</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
