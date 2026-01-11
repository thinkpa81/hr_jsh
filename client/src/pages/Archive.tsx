import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, FolderOpen, ExternalLink, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/Header";
import { apiRequest } from "@/lib/queryClient";

export default function Archive() {
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [driveUrl, setDriveUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest("POST", "/api/archive/verify", { password });
      const data = await response.json();
      
      if (data.success) {
        setIsVerified(true);
        setDriveUrl(data.url);
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      setError("비밀번호가 올바르지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDrive = () => {
    if (driveUrl) {
      window.open(driveUrl, "_blank");
    }
  };

  return (
    <div>
      <PageHeader 
        title="자료실"
        subtitle="JSH HR 관련 자료를 확인하세요"
        breadcrumb="ARCHIVE"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-gradient-to-b from-background to-muted/30">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center shadow-lg">
                {isVerified ? (
                  <FolderOpen className="h-10 w-10 text-white" />
                ) : (
                  <Lock className="h-10 w-10 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {isVerified ? "자료실 접근 완료" : "자료실 접근"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {isVerified ? (
                <div className="text-center space-y-6">
                  <p className="text-muted-foreground">
                    비밀번호가 확인되었습니다.<br />
                    구글 드라이브 자료실에 접근할 수 있습니다.
                  </p>
                  <Button 
                    onClick={handleOpenDrive}
                    size="lg"
                    className="w-full gap-2 bg-[#0052A5] hover:bg-[#003d7a]"
                    data-testid="button-open-drive"
                  >
                    <ExternalLink className="h-5 w-5" />
                    자료실 열기
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-sm text-muted-foreground text-center">
                    자료실에 접근하려면 비밀번호를 입력하세요.
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호 입력"
                      className="text-center text-lg tracking-widest h-12"
                      data-testid="input-archive-password"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-[#0052A5] hover:bg-[#003d7a]"
                    disabled={isLoading || !password}
                    data-testid="button-verify-password"
                  >
                    {isLoading ? "확인 중..." : "확인"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
