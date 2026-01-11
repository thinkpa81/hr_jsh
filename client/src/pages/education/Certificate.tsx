import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, Clock, Printer, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const mockCertificates = [
  { id: 1, title: "리더십 역량 개발", completedDate: "2024-08-15", duration: "16시간", score: 92, certificateNo: "CERT-2024-0815-001" },
  { id: 2, title: "커뮤니케이션 스킬", completedDate: "2024-07-20", duration: "8시간", score: 88, certificateNo: "CERT-2024-0720-002" },
  { id: 3, title: "프로젝트 관리", completedDate: "2024-06-10", duration: "12시간", score: 95, certificateNo: "CERT-2024-0610-003" },
];

export default function Certificate() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDownload = (title: string) => {
    toast({
      title: "수료증 다운로드",
      description: `"${title}" 수료증이 다운로드됩니다.`,
    });
  };

  const handlePrint = (title: string) => {
    toast({
      title: "수료증 인쇄",
      description: `"${title}" 수료증 인쇄 페이지가 열립니다.`,
    });
  };

  return (
    <div>
      <PageHeader 
        title="수료증 발급"
        subtitle="완료한 교육과정의 수료증을 발급받으세요"
        breadcrumb="CERTIFICATE"
        tabs={[
          { name: "교육과정 안내", href: "/education/courses" },
          { name: "수강신청", href: "/education/enroll" },
          { name: "나의 학습이력", href: "/education/history" },
          { name: "교육자료실", href: "/education/materials" },
          { name: "수료증 발급", href: "/education/certificate" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        {!user ? (
          <Card className="shadow-lg">
            <CardContent className="py-20 text-center">
              <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground mb-4">로그인 후 수료증을 발급받을 수 있습니다</p>
              <Link href="/login">
                <Button className="bg-[#0052A5] hover:bg-[#003d7a]">로그인</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  발급 가능한 수료증
                </h2>
                <div className="space-y-4">
                  {mockCertificates.map((cert) => (
                    <Card key={cert.id} className="shadow-lg hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center flex-shrink-0">
                            <Award className="h-12 w-12 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-500">발급가능</Badge>
                            </div>
                            <h3 className="font-bold text-xl mb-3">{cert.title}</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                              <div>
                                <p className="text-muted-foreground">수료일</p>
                                <p className="font-medium flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-[#0052A5]" />
                                  {cert.completedDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">교육시간</p>
                                <p className="font-medium flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-[#0052A5]" />
                                  {cert.duration}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">취득점수</p>
                                <p className="font-medium text-[#FF6B35]">{cert.score}점</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">수료증 번호</p>
                                <p className="font-medium text-xs">{cert.certificateNo}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleDownload(cert.title)}
                                className="bg-[#0052A5] hover:bg-[#003d7a] gap-2"
                              >
                                <Download className="h-4 w-4" />
                                PDF 다운로드
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handlePrint(cert.title)}
                                className="gap-2"
                              >
                                <Printer className="h-4 w-4" />
                                인쇄
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg border-t-4 border-t-[#0052A5]">
                  <CardHeader>
                    <CardTitle className="text-lg">수료증 안내</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    <p className="text-muted-foreground">
                      교육과정을 성공적으로 이수하면 수료증이 자동으로 발급됩니다.
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium">수료 기준</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          출석률 80% 이상
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          평가 점수 60점 이상
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          과제 제출 완료
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-muted/30">
                  <CardContent className="p-5">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#0052A5]/10 flex items-center justify-center">
                        <Award className="h-8 w-8 text-[#0052A5]" />
                      </div>
                      <p className="text-2xl font-bold text-[#0052A5]">{mockCertificates.length}</p>
                      <p className="text-sm text-muted-foreground">총 취득 수료증</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
