import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PageHeader } from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Users, Clock, Target, TrendingUp, FileText, CheckCircle, XCircle, Hourglass, Upload, Download, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

interface RecruitData {
  stats: { label: string; value: string }[];
  positions: { position: string; applicants: number; interviews: number; hired: number; status: string }[];
  sources: { source: string; applicants: number; percentage: number }[];
}

const defaultStats = [
  { label: "진행중 채용", value: "23" },
  { label: "이번 달 지원자", value: "847" },
  { label: "평균 채용 소요일", value: "32일" },
  { label: "채용 전환율", value: "12.4%" },
];

const defaultPositions = [
  { position: "프론트엔드 개발자", applicants: 156, interviews: 42, hired: 8, status: "진행중" },
  { position: "백엔드 개발자", applicants: 234, interviews: 58, hired: 12, status: "진행중" },
  { position: "UI/UX 디자이너", applicants: 89, interviews: 28, hired: 4, status: "마감" },
  { position: "데이터 분석가", applicants: 112, interviews: 35, hired: 6, status: "진행중" },
  { position: "프로젝트 매니저", applicants: 67, interviews: 22, hired: 3, status: "마감" },
  { position: "마케팅 매니저", applicants: 98, interviews: 31, hired: 5, status: "진행중" },
];

const defaultSources = [
  { source: "사람인", applicants: 342, percentage: 40 },
  { source: "잡코리아", applicants: 256, percentage: 30 },
  { source: "링크드인", applicants: 128, percentage: 15 },
  { source: "자사 홈페이지", applicants: 86, percentage: 10 },
  { source: "추천 채용", applicants: 35, percentage: 5 },
];

const statIcons = [Hourglass, Users, Clock, Target];
const statColors = ["bg-blue-100 text-blue-600", "bg-green-100 text-green-600", "bg-orange-100 text-orange-600", "bg-purple-100 text-purple-600"];

export default function RecruitAnalytics() {
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadType, setUploadType] = useState<"stats" | "positions" | "sources">("positions");

  const { data: analyticsData } = useQuery({
    queryKey: ["/api/analytics-data/latest", "recruit"],
    queryFn: async () => {
      const res = await fetch("/api/analytics-data/latest/recruit");
      if (!res.ok) return null;
      return res.json();
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (data: { type: string; fileName: string; data: any }) =>
      apiRequest("POST", "/api/analytics-data", { ...data, uploadedBy: user?.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/analytics-data/latest", "recruit"] });
      toast({ title: "데이터가 업로드되었습니다." });
      setUploadDialog(false);
    },
  });

  const parsedData: RecruitData = analyticsData?.data 
    ? (typeof analyticsData.data === 'string' ? JSON.parse(analyticsData.data) : analyticsData.data)
    : null;

  const stats = parsedData?.stats || defaultStats;
  const positions = parsedData?.positions || defaultPositions;
  const sources = parsedData?.sources || defaultSources;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        let processedData: any = {};
        
        if (uploadType === "stats") {
          processedData = {
            stats: jsonData.slice(0, 4).map((row: any) => ({
              label: row["지표"] || row["label"] || "",
              value: String(row["값"] || row["value"] || "0"),
            })),
            positions,
            sources,
          };
        } else if (uploadType === "positions") {
          processedData = {
            stats,
            positions: jsonData.map((row: any) => ({
              position: row["포지션"] || row["position"] || "",
              applicants: Number(row["지원자"] || row["applicants"] || 0),
              interviews: Number(row["면접"] || row["interviews"] || 0),
              hired: Number(row["채용"] || row["hired"] || 0),
              status: row["상태"] || row["status"] || "진행중",
            })),
            sources,
          };
        } else if (uploadType === "sources") {
          const totalApplicants = jsonData.reduce((sum: number, row: any) => sum + Number(row["지원자수"] || row["applicants"] || 0), 0);
          processedData = {
            stats,
            positions,
            sources: jsonData.map((row: any) => {
              const applicants = Number(row["지원자수"] || row["applicants"] || 0);
              return {
                source: row["채용소스"] || row["source"] || "",
                applicants,
                percentage: totalApplicants > 0 ? Math.round((applicants / totalApplicants) * 100) : 0,
              };
            }),
          };
        }

        uploadMutation.mutate({
          type: "recruit",
          fileName: file.name,
          data: JSON.stringify(processedData),
        });
      } catch (error) {
        toast({ title: "파일 처리 중 오류가 발생했습니다.", variant: "destructive" });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadSample = (type: "stats" | "positions" | "sources") => {
    let data: any[] = [];
    let filename = "";

    if (type === "stats") {
      data = defaultStats.map(s => ({ 지표: s.label, 값: s.value }));
      filename = "recruit_stats_sample.xlsx";
    } else if (type === "positions") {
      data = defaultPositions.map(p => ({
        포지션: p.position,
        지원자: p.applicants,
        면접: p.interviews,
        채용: p.hired,
        상태: p.status,
      }));
      filename = "positions_sample.xlsx";
    } else {
      data = defaultSources.map(s => ({
        채용소스: s.source,
        지원자수: s.applicants,
      }));
      filename = "sources_sample.xlsx";
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };

  return (
    <div>
      <PageHeader 
        title="채용 분석"
        subtitle="채용 프로세스의 효율성을 분석하세요"
        breadcrumb="HR 분석"
        tabs={[
          { name: "대시보드", href: "/analytics/dashboard" },
          { name: "채용 분석", href: "/analytics/recruit" },
          { name: "인력 현황", href: "/analytics/workforce" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        {isAdmin && (
          <div className="flex justify-end gap-2 mb-6">
            <Button variant="outline" className="gap-2" onClick={() => { setUploadType("positions"); setUploadDialog(true); }} data-testid="button-upload-positions">
              <Upload className="h-4 w-4" />
              포지션 데이터 업로드
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => { setUploadType("sources"); setUploadDialog(true); }} data-testid="button-upload-sources">
              <Upload className="h-4 w-4" />
              채용소스 데이터 업로드
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat: any, index: number) => {
            const Icon = statIcons[index % statIcons.length];
            const color = statColors[index % statColors.length];
            return (
              <Card key={index} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#0052A5]" />
                포지션별 채용 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">포지션</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">지원자</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">면접</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">채용</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos: any, index: number) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{pos.position}</td>
                        <td className="py-3 px-4 text-center">{pos.applicants}</td>
                        <td className="py-3 px-4 text-center">{pos.interviews}</td>
                        <td className="py-3 px-4 text-center text-green-600 font-bold">{pos.hired}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            pos.status === '진행중' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {pos.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#FF6B35]" />
                채용 소스 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sources.map((source: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-sm text-muted-foreground">{source.applicants}명</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#0052A5] to-[#FF6B35] rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                채용 완료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-5xl font-bold text-green-600">38</p>
                <p className="text-muted-foreground mt-2">이번 분기 채용 완료</p>
                <p className="text-sm text-green-600 mt-1">목표 대비 95% 달성</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hourglass className="h-5 w-5 text-orange-600" />
                면접 진행중
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-5xl font-bold text-orange-600">127</p>
                <p className="text-muted-foreground mt-2">현재 면접 진행중</p>
                <p className="text-sm text-muted-foreground mt-1">1차: 78명 / 2차: 49명</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                이탈 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-5xl font-bold text-red-600">23%</p>
                <p className="text-muted-foreground mt-2">오퍼 거절률</p>
                <p className="text-sm text-muted-foreground mt-1">주요 사유: 연봉 협상</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-[#0052A5]" />
              데이터 업로드
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              엑셀(.xlsx) 또는 CSV 파일을 업로드하세요. 샘플 파일을 다운로드하여 형식을 확인할 수 있습니다.
            </p>
            <Button variant="outline" className="gap-2 w-full" onClick={() => downloadSample(uploadType)} data-testid="button-download-sample">
              <Download className="h-4 w-4" />
              샘플 파일 다운로드
            </Button>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="recruit-file-upload"
                data-testid="input-file-upload"
              />
              <label htmlFor="recruit-file-upload" className="cursor-pointer">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">클릭하여 파일 선택</p>
                <p className="text-xs text-muted-foreground mt-1">XLSX, XLS, CSV 지원</p>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialog(false)}>취소</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
