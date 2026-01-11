import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, FolderOpen, File, Video, Image, FileSpreadsheet, Calendar, Eye } from "lucide-react";
import { PageHeader } from "@/components/Header";
import { useState } from "react";

const mockMaterials = [
  { id: 1, title: "리더십 역량 개발 교재", category: "리더십", type: "pdf", size: "2.5MB", downloads: 156, date: "2024-09-01" },
  { id: 2, title: "데이터 분석 실습 자료", category: "IT/디지털", type: "xlsx", size: "1.2MB", downloads: 89, date: "2024-08-25" },
  { id: 3, title: "커뮤니케이션 워크샵 영상", category: "소프트스킬", type: "video", size: "150MB", downloads: 234, date: "2024-08-20" },
  { id: 4, title: "프로젝트 관리 템플릿", category: "비즈니스", type: "docx", size: "850KB", downloads: 312, date: "2024-08-15" },
  { id: 5, title: "HR Analytics 사례 연구", category: "HR", type: "pdf", size: "3.1MB", downloads: 178, date: "2024-08-10" },
  { id: 6, title: "신입사원 온보딩 가이드", category: "온보딩", type: "pdf", size: "1.8MB", downloads: 445, date: "2024-07-30" },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf": return FileText;
    case "xlsx": return FileSpreadsheet;
    case "video": return Video;
    case "image": return Image;
    default: return File;
  }
};

export default function Materials() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMaterials = mockMaterials.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="교육자료실"
        subtitle="교육 관련 자료를 검색하고 다운로드하세요"
        breadcrumb="MATERIALS"
        tabs={[
          { name: "교육과정 안내", href: "/education/courses" },
          { name: "수강신청", href: "/education/enroll" },
          { name: "나의 학습이력", href: "/education/history" },
          { name: "교육자료실", href: "/education/materials" },
          { name: "수료증 발급", href: "/education/certificate" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="자료 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{filteredMaterials.length}</span>개의 자료
        </div>

        <div className="space-y-4">
          {filteredMaterials.map((material) => {
            const FileIcon = getFileIcon(material.type);
            return (
              <Card key={material.id} className="hover-elevate shadow-md">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#0052A5]/10 flex items-center justify-center flex-shrink-0">
                      <FileIcon className="h-7 w-7 text-[#0052A5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{material.category}</Badge>
                        <Badge variant="secondary" className="uppercase text-xs">{material.type}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 truncate">{material.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {material.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FolderOpen className="h-4 w-4" />
                          {material.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {material.downloads}회 다운로드
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button className="bg-[#0052A5] hover:bg-[#003d7a] gap-2">
                        <Download className="h-4 w-4" />
                        다운로드
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredMaterials.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="py-20 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
