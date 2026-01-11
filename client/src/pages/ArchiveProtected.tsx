import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/Header";
import { FolderOpen, Lock, ExternalLink, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ARCHIVE_PASSWORD = "2001";
const ARCHIVE_LINK = "https://drive.google.com/drive/folders/1xr5ErO971Jy0pVM-hRMTHzHIoiXpWgNj?usp=drive_link";

export default function ArchiveProtected() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ARCHIVE_PASSWORD) {
      setIsUnlocked(true);
      toast({
        title: "인증 성공",
        description: "자료실에 접근할 수 있습니다.",
      });
    } else {
      toast({
        title: "인증 실패",
        description: "비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <PageHeader 
        title="자료실"
        subtitle="JSH HR 자료 보관소"
        breadcrumb="고객지원"
        tabs={[
          { name: "FAQ", href: "/support/faq" },
          { name: "1:1 문의", href: "/support/inquiry" },
          { name: "자료실", href: "/support/archive" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {!isUnlocked ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[#0052A5]" />
                  자료실 접근
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호를 입력하세요</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호"
                      data-testid="input-archive-password"
                    />
                    <p className="text-xs text-muted-foreground">
                      자료실 접근 권한이 있는 분만 이용 가능합니다.
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0052A5] hover:bg-[#003d7a]"
                    data-testid="button-archive-submit"
                  >
                    확인
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-[#0052A5]" />
                  자료실
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-400">인증되었습니다</span>
                </div>
                
                <p className="text-muted-foreground">
                  아래 버튼을 클릭하여 자료실에 접근하세요.
                </p>
                
                <Button 
                  className="w-full gap-2 bg-[#0052A5] hover:bg-[#003d7a]"
                  onClick={() => window.open(ARCHIVE_LINK, "_blank")}
                  data-testid="button-archive-link"
                >
                  <ExternalLink className="h-4 w-4" />
                  자료실 열기 (Google Drive)
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  새 창에서 Google Drive가 열립니다.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
