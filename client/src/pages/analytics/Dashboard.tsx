import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PageHeader } from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Users, Briefcase, TrendingUp, Clock, Target, Award, UserCheck, Building2, Upload, Download, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

interface DashboardData {
  stats: { label: string; value: string; change: string }[];
  departments: { name: string; employees: number; growth: string }[];
  monthlyHiring: number[];
}

const defaultStats = [
  { label: "총 직원 수", value: "1,247", change: "+12%" },
  { label: "신규 채용", value: "48", change: "+8%" },
  { label: "평균 근속연수", value: "4.2년", change: "+0.3" },
  { label: "이직률", value: "8.5%", change: "-2.1%" },
];

const defaultDepartments = [
  { name: "개발팀", employees: 342, growth: "+15%" },
  { name: "영업팀", employees: 256, growth: "+8%" },
  { name: "마케팅팀", employees: 128, growth: "+12%" },
  { name: "인사팀", employees: 86, growth: "+5%" },
  { name: "재무팀", employees: 94, growth: "+3%" },
  { name: "운영팀", employees: 178, growth: "+10%" },
];

const defaultMonthlyHiring = [35, 42, 28, 56, 48, 62, 45, 38, 52, 68, 58, 48];

const statIcons = [Users, UserCheck, Clock, TrendingUp];
const statColors = ["text-blue-600", "text-green-600", "text-purple-600", "text-orange-600"];

export default function Dashboard() {
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadType, setUploadType] = useState<"stats" | "departments" | "monthly">("stats");

  const { data: analyticsData } = useQuery({
    queryKey: ["/api/analytics-data/latest", "dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/analytics-data/latest/dashboard");
      if (!res.ok) return null;
      return res.json();
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (data: { type: string; fileName: string; data: any }) =>
      apiRequest("POST", "/api/analytics-data", { ...data, uploadedBy: user?.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/analytics-data/latest", "dashboard"] });
      toast({ title: "데이터가 업로드되었습니다." });
      setUploadDialog(false);
    },
  });

  const parsedData: DashboardData = analyticsData?.data 
    ? (typeof analyticsData.data === 'string' ? JSON.parse(analyticsData.data) : analyticsData.data)
    : null;

  const stats = parsedData?.stats || defaultStats;
  const departments = parsedData?.departments || defaultDepartments;
  const monthlyHiring = parsedData?.monthlyHiring || defaultMonthlyHiring;

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
              change: String(row["변동"] || row["change"] || "0%"),
            })),
            departments,
            monthlyHiring,
          };
        } else if (uploadType === "departments") {
          processedData = {
            stats,
            departments: jsonData.map((row: any) => ({
              name: row["부서"] || row["name"] || "",
              employees: Number(row["인원"] || row["employees"] || 0),
              growth: String(row["증가율"] || row["growth"] || "0%"),
            })),
            monthlyHiring,
          };
        } else if (uploadType === "monthly") {
          const values = jsonData.map((row: any) => Number(row["채용수"] || row["value"] || row["hires"] || 0));
          processedData = {
            stats,
            departments,
            monthlyHiring: values.length === 12 ? values : defaultMonthlyHiring,
          };
        }

        uploadMutation.mutate({
          type: "dashboard",
          fileName: file.name,
          data: JSON.stringify(processedData),
        });
      } catch (error) {
        toast({ title: "파일 처리 중 오류가 발생했습니다.", variant: "destructive" });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadSample = (type: "stats" | "departments" | "monthly") => {
    let data: any[] = [];
    let filename = "";

    if (type === "stats") {
      data = [
        { 지표: "총 직원 수", 값: "1,247", 변동: "+12%" },
        { 지표: "신규 채용", 값: "48", 변동: "+8%" },
        { 지표: "평균 근속연수", 값: "4.2년", 변동: "+0.3" },
        { 지표: "이직률", 값: "8.5%", 변동: "-2.1%" },
      ];
      filename = "hr_stats_sample.xlsx";
    } else if (type === "departments") {
      data = [
        { 부서: "개발팀", 인원: 342, 증가율: "+15%" },
        { 부서: "영업팀", 인원: 256, 증가율: "+8%" },
        { 부서: "마케팅팀", 인원: 128, 증가율: "+12%" },
      ];
      filename = "departments_sample.xlsx";
    } else {
      data = Array.from({ length: 12 }, (_, i) => ({
        월: `${i + 1}월`,
        채용수: defaultMonthlyHiring[i],
      }));
      filename = "monthly_hiring_sample.xlsx";
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };

  return (
    <div>
      <PageHeader 
        title="HR 대시보드"
        subtitle="조직의 인력 현황을 한눈에 파악하세요"
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
            <Button variant="outline" className="gap-2" onClick={() => { setUploadType("stats"); setUploadDialog(true); }} data-testid="button-upload-stats">
              <Upload className="h-4 w-4" />
              HR 지표 업로드
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => { setUploadType("departments"); setUploadDialog(true); }} data-testid="button-upload-departments">
              <Upload className="h-4 w-4" />
              부서 데이터 업로드
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.change?.startsWith('+') ? 'text-green-600' : stat.change?.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {stat.change} 전월 대비
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-muted ${color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#0052A5]" />
                부서별 인원 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#0052A5]" />
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold">{dept.employees}명</span>
                      <span className="text-sm text-green-600">{dept.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#FF6B35]" />
                주요 HR 지표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">채용 목표 달성률</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#0052A5] rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">직원 만족도</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">교육 이수율</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">성과 평가 완료율</span>
                    <span className="font-bold">67%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#0052A5]" />
              월별 채용 현황
            </CardTitle>
            {isAdmin && (
              <Button size="sm" variant="outline" className="gap-2" onClick={() => { setUploadType("monthly"); setUploadDialog(true); }} data-testid="button-upload-monthly">
                <Upload className="h-4 w-4" />
                데이터 업로드
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-12 gap-2 h-48">
              {monthlyHiring.map((value: number, index: number) => (
                <div key={index} className="flex flex-col items-center justify-end">
                  <div 
                    className="w-full bg-gradient-to-t from-[#0052A5] to-[#0052A5]/60 rounded-t-md transition-all hover:from-[#FF6B35] hover:to-[#FF6B35]/60"
                    style={{ height: `${Math.min(value * 2, 160)}px` }}
                  />
                  <span className="text-xs text-muted-foreground mt-2">{index + 1}월</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
                id="file-upload"
                data-testid="input-file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
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
