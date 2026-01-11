import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ComingSoon() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0052A5]/10 flex items-center justify-center mx-auto mb-6">
            <Construction className="h-8 w-8 text-[#0052A5]" />
          </div>
          <h1 className="text-2xl font-bold mb-2">준비중입니다</h1>
          <p className="text-muted-foreground mb-6">
            현재 해당 페이지는 준비중입니다.<br />
            빠른 시일 내에 서비스를 제공해 드리겠습니다.
          </p>
          <Link href="/">
            <Button className="gap-2 bg-[#0052A5] hover:bg-[#003d7a]" data-testid="button-go-home">
              <ArrowLeft className="h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
