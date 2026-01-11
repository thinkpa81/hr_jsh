import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { Shield, Lock, Eye, FileText, UserCheck, AlertCircle } from "lucide-react";

export default function Privacy() {
  return (
    <div>
      <PageHeader 
        title="개인정보처리방침"
        subtitle="JSH HR 통합 포털 개인정보 보호 정책"
        breadcrumb="정책"
      />
      
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#0052A5]" />
              개인정보처리방침
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-muted-foreground mb-6">
              JSH HR 통합 포털(이하 "회사")은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하고 있습니다.
            </p>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <FileText className="h-5 w-5 text-[#0052A5]" />
                1. 수집하는 개인정보 항목
              </h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>이름, 이메일, 연락처, 지원 포지션</li>
                <li>학력 및 경력 사항</li>
                <li>이력서 첨부 파일</li>
                <li>서비스 이용 기록, 접속 로그, IP 주소</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <Eye className="h-5 w-5 text-[#0052A5]" />
                2. 개인정보의 수집 및 이용 목적
              </h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>채용 전형 진행 및 입사 지원자 관리</li>
                <li>서비스 제공 및 운영</li>
                <li>고객 문의 응대 및 불만 처리</li>
                <li>서비스 개선을 위한 통계 분석</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <Lock className="h-5 w-5 text-[#0052A5]" />
                3. 개인정보의 보유 및 이용 기간
              </h3>
              <p className="text-muted-foreground ml-4">
                원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mt-2">
                <li>채용 지원 정보: 채용 절차 종료 후 3년</li>
                <li>서비스 이용 기록: 3개월</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <UserCheck className="h-5 w-5 text-[#0052A5]" />
                4. 개인정보의 제3자 제공
              </h3>
              <p className="text-muted-foreground ml-4">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                다만, 법령의 규정에 의거하거나, 이용자의 동의가 있는 경우에는 예외로 합니다.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <Shield className="h-5 w-5 text-[#0052A5]" />
                5. 개인정보의 안전성 확보 조치
              </h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>개인정보 암호화</li>
                <li>해킹 등에 대비한 보안 시스템 구축</li>
                <li>개인정보 접근 권한 관리</li>
                <li>개인정보 처리 직원 교육</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <AlertCircle className="h-5 w-5 text-[#0052A5]" />
                6. 이용자의 권리와 행사 방법
              </h3>
              <p className="text-muted-foreground ml-4">
                이용자는 언제든지 개인정보의 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.
                권리 행사는 서면, 이메일 등을 통해 하실 수 있으며, 회사는 지체 없이 조치하겠습니다.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                7. 개인정보 보호책임자
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg ml-4">
                <p className="text-muted-foreground">
                  <strong>담당부서:</strong> 시스템관리팀<br />
                  <strong>담당자:</strong> 장순호<br />
                  <strong>연락처:</strong> thinkpa@naver.com
                </p>
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                8. 개인정보처리방침 변경
              </h3>
              <p className="text-muted-foreground ml-4">
                이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.
                변경 시 웹사이트를 통해 공지합니다.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
