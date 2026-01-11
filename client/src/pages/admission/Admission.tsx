import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Users, CheckCircle, ExternalLink } from "lucide-react";

const tabs = [
  { name: "모집요강", href: "/admission" },
  { name: "입학절차", href: "/admission/process" },
  { name: "장학안내", href: "/admission/scholarship" },
  { name: "등록금 안내", href: "/admission/tuition" },
  { name: "FAQ", href: "/admission/faq" },
];

export default function Admission() {
  return (
    <div>
      <PageHeader 
        title="모집요강" 
        subtitle="2026학년도 전기 대학원 신입생 모집"
        breadcrumb="입학안내"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 bg-gradient-to-r from-[#0052A5] to-[#003d7a] text-white">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">2026학년도 전기 신입생 모집</h2>
                  <p className="text-white/80">접수기간: 2025.12.29(월) ~ 2026.01.14(수)</p>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-[#FF6B35] hover:bg-[#e55a2a]">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    원서접수
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <FileText className="h-4 w-4 mr-2" />
                    모집요강 다운로드
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0052A5]">
                  <Calendar className="h-5 w-5" />
                  주요 일정
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>원서접수</span>
                    <span className="font-medium text-[#FF6B35]">12.29 ~ 01.14</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>면접고사</span>
                    <span className="font-medium text-[#FF6B35]">01.21(수) 13시</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>합격자 발표</span>
                    <span className="font-medium text-[#FF6B35]">01.26(월) 13시</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>등록기간</span>
                    <span className="font-medium text-[#FF6B35]">02.03 ~ 02.07</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0052A5]">
                  <Users className="h-5 w-5" />
                  모집과정 및 인원
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">석사과정</span>
                      <span className="text-[#FF6B35] font-bold">00명</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      데이터사이언스, 인공지능, 지식서비스공학
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">박사과정</span>
                      <span className="text-[#FF6B35] font-bold">00명</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      데이터사이언스, 인공지능, 지식서비스공학
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-4 text-[#0052A5]">지원자격</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FF6B35]" />
                    석사과정
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• 국내외 4년제 대학 졸업(예정)자</li>
                    <li>• 법령에 의해 동등 학력 인정자</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FF6B35]" />
                    박사과정
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• 석사학위 취득(예정)자</li>
                    <li>• 법령에 의해 동등 학력 인정자</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-4 text-[#0052A5]">전형방법</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">전형구분</th>
                      <th className="text-center py-3 px-4 font-medium">서류전형</th>
                      <th className="text-center py-3 px-4 font-medium">면접전형</th>
                      <th className="text-center py-3 px-4 font-medium">합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">일반전형</td>
                      <td className="text-center py-3 px-4">50%</td>
                      <td className="text-center py-3 px-4">50%</td>
                      <td className="text-center py-3 px-4 font-bold text-[#0052A5]">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                ※ 서류전형: 학부성적 + 직장경력 / 면접전형: 전공지식, 연구계획 등 종합평가
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
