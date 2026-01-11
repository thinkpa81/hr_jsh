import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, TrendingUp, Target, Bot, Clock, GraduationCap, Award, Upload, Download, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Job, Application } from "@shared/schema";
import * as XLSX from "xlsx";

export default function Analytics() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const { data: stats, isLoading: statsLoading } = useQuery<{
    activeJobs: number;
    totalApplicants: number;
    aiAccuracy: number;
    satisfaction: number;
    employees: number;
  }>({
    queryKey: ["/api/stats"],
  });

  const { data: jobs } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const { data: applications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const uploadMutation = useMutation({
    mutationFn: async (data: any[]) => {
      const res = await apiRequest("POST", "/api/analytics/upload", { data, type: "analytics" });
      return res.json();
    },
    onSuccess: (data) => {
      setUploadStatus("success");
      toast({
        title: "업로드 완료",
        description: data.message,
      });
    },
    onError: () => {
      setUploadStatus("error");
      toast({
        title: "업로드 실패",
        description: "데이터 업로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        setUploadedData(jsonData);
        uploadMutation.mutate(jsonData);
      } catch (error) {
        toast({
          title: "파일 읽기 오류",
          description: "올바른 Excel 또는 CSV 파일인지 확인해주세요.",
          variant: "destructive",
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const templateData = [
      { 부서: "IT팀", 직원수: 50, 채용진행: 5, 교육완료: 45, 만족도: 4.5 },
      { 부서: "HR팀", 직원수: 20, 채용진행: 2, 교육완료: 18, 만족도: 4.7 },
      { 부서: "마케팅팀", 직원수: 30, 채용진행: 3, 교육완료: 25, 만족도: 4.3 },
    ];
    
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "HR데이터");
    XLSX.writeFile(wb, "HR_Analytics_Template.xlsx");
    
    toast({
      title: "템플릿 다운로드",
      description: "HR_Analytics_Template.xlsx 파일이 다운로드됩니다.",
    });
  };

  if (statsLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner />
      </div>
    );
  }

  const stageStats = {
    document: applications?.filter(a => a.stage === "document").length || 0,
    firstInterview: applications?.filter(a => a.stage === "first-interview").length || 0,
    secondInterview: applications?.filter(a => a.stage === "second-interview").length || 0,
    final: applications?.filter(a => a.stage === "final").length || 0,
  };

  return (
    <div>
      <PageHeader 
        title="HR Analytics"
        subtitle="JSH HR 데이터 분석 현황을 한눈에 확인하세요"
        breadcrumb="ANALYTICS"
        tabs={[
          { name: "대시보드", href: "/analytics" },
          { name: "채용 분석", href: "/recruit/analytics" },
          { name: "인력 현황", href: "/recruit/applicants" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        {isAdmin && (
          <Card className="mb-8 border-dashed border-2 border-[#0052A5]/30 bg-[#0052A5]/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-[#0052A5]">
                    <FileSpreadsheet className="h-5 w-5" />
                    데이터 업로드 (관리자 전용)
                  </CardTitle>
                  <CardDescription className="mt-1">
                    xlsx 또는 csv 파일을 업로드하여 대시보드에 반영하세요
                  </CardDescription>
                </div>
                <Badge className="bg-[#FF6B35]">Admin</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  className="gap-2 border-[#0052A5] text-[#0052A5] hover:bg-[#0052A5] hover:text-white"
                  onClick={downloadTemplate}
                  data-testid="button-download-template"
                >
                  <Download className="h-4 w-4" />
                  템플릿 다운로드
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  data-testid="input-file-upload"
                />
                <Button 
                  className="gap-2 bg-[#0052A5] hover:bg-[#003d7a]"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                  data-testid="button-upload-file"
                >
                  <Upload className="h-4 w-4" />
                  {uploadMutation.isPending ? "업로드 중..." : "파일 업로드"}
                </Button>
                {uploadStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">{uploadedData?.length}개 레코드 업로드됨</span>
                  </div>
                )}
                {uploadStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">업로드 실패</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="hover-elevate border-l-4 border-l-[#0052A5]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0052A5]/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#0052A5]" />
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-100">+5%</Badge>
              </div>
              <p className="text-3xl font-bold mb-1">{stats?.employees || 1200}+</p>
              <p className="text-sm text-muted-foreground">전체 임직원</p>
            </CardContent>
          </Card>
          <Card className="hover-elevate border-l-4 border-l-[#FF6B35]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-[#FF6B35]" />
                </div>
                <Badge variant="secondary" className="text-blue-600 bg-blue-100">진행중</Badge>
              </div>
              <p className="text-3xl font-bold mb-1">{stats?.activeJobs || jobs?.length || 5}</p>
              <p className="text-sm text-muted-foreground">진행중인 채용</p>
            </CardContent>
          </Card>
          <Card className="hover-elevate border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-green-500" />
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-100">High</Badge>
              </div>
              <p className="text-3xl font-bold mb-1">{stats?.aiAccuracy || 95}%</p>
              <p className="text-sm text-muted-foreground">AI 채용 정확도</p>
            </CardContent>
          </Card>
          <Card className="hover-elevate border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-100">+2%</Badge>
              </div>
              <p className="text-3xl font-bold mb-1">{stats?.satisfaction || 87}%</p>
              <p className="text-sm text-muted-foreground">직원 만족도</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#0052A5]" />
                채용 파이프라인 현황
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      서류전형
                    </span>
                    <span className="text-sm font-semibold">{stageStats.document}명</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all" style={{ width: `${Math.min((stageStats.document / 10) * 100, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      1차 면접
                    </span>
                    <span className="text-sm font-semibold">{stageStats.firstInterview}명</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all" style={{ width: `${Math.min((stageStats.firstInterview / 10) * 100, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      2차 면접
                    </span>
                    <span className="text-sm font-semibold">{stageStats.secondInterview}명</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all" style={{ width: `${Math.min((stageStats.secondInterview / 10) * 100, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
                      최종 합격
                    </span>
                    <span className="text-sm font-semibold">{stageStats.final}명</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF6B35] to-orange-600 rounded-full transition-all" style={{ width: `${Math.min((stageStats.final / 10) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#0052A5]" />
                부서별 채용 현황
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {jobs?.slice(0, 5).map((job, index) => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl border hover-elevate">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0052A5]/10 flex items-center justify-center text-sm font-bold text-[#0052A5]">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#0052A5]">{job.applicants}</p>
                      <p className="text-xs text-muted-foreground">지원자</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#0052A5]" />
                평균 채용 소요시간
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-white">23</span>
                </div>
                <p className="text-muted-foreground">일 (평균)</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-[#0052A5]">14일</p>
                  <p className="text-xs text-muted-foreground">서류~1차면접</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xl font-bold text-[#FF6B35]">9일</p>
                  <p className="text-xs text-muted-foreground">1차면접~최종</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#0052A5]" />
                교육 현황
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">진행중 교육과정</span>
                  <Badge className="bg-[#0052A5]">3개</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">총 수강자</span>
                  <Badge variant="secondary">479명</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">평균 만족도</span>
                  <Badge variant="outline">4.7/5.0</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">수료율</span>
                  <Badge className="bg-green-500">92%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#0052A5]" />
                인력 변동 현황
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <span className="text-sm">신규 입사</span>
                  <span className="text-green-600 font-bold text-lg">+15명</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                  <span className="text-sm">퇴사</span>
                  <span className="text-red-600 font-bold text-lg">-3명</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">이직률</span>
                  <span className="font-bold text-lg">2.8%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">평균 근속기간</span>
                  <span className="font-bold text-lg">4.2년</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
