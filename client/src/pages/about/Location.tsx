import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Bus, Car } from "lucide-react";

const tabs = [
  { name: "일반소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "연혁", href: "/about/history" },
  { name: "조직도", href: "/about/organization" },
  { name: "오시는 길", href: "/about/location" },
];

export default function Location() {
  return (
    <div>
      <PageHeader 
        title="오시는 길" 
        subtitle="데이터지식서비스공학과 위치 및 연락처 안내"
        breadcrumb="대학원소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-[#0052A5]">
                  <MapPin className="h-5 w-5" />
                  위치 정보
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium mb-1">주소</p>
                    <p className="text-muted-foreground">
                      (우) 16890 경기도 용인시 수지구 죽전로 152<br />
                      단국대학교 죽전캠퍼스 대학원동 511호
                    </p>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <Phone className="h-5 w-5 text-[#0052A5]" />
                    <div>
                      <p className="font-medium">전화번호</p>
                      <p className="text-muted-foreground">031-8005-2262~3</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-[#FF6B35]" />
                    <div>
                      <p className="font-medium">이메일</p>
                      <p className="text-muted-foreground">datakse@dankook.ac.kr</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-[#0052A5]" />
                    <div>
                      <p className="font-medium">업무시간</p>
                      <p className="text-muted-foreground">
                        평일 09:00 ~ 17:30 (점심시간 12:00 ~ 13:00)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-6 text-[#0052A5]">교통 안내</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Bus className="h-5 w-5 text-[#FF6B35]" />
                      <h4 className="font-medium">대중교통 이용 시</h4>
                    </div>
                    <div className="pl-7 space-y-2 text-sm text-muted-foreground">
                      <p><strong>지하철:</strong> 분당선 죽전역 하차 → 셔틀버스 이용</p>
                      <p><strong>버스:</strong> 720-2, 820, 5600번 → 단국대 정문 하차</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Car className="h-5 w-5 text-[#0052A5]" />
                      <h4 className="font-medium">자가용 이용 시</h4>
                    </div>
                    <div className="pl-7 space-y-2 text-sm text-muted-foreground">
                      <p><strong>경부고속도로:</strong> 수원IC → 죽전방향 → 단국대</p>
                      <p><strong>용인서울고속도로:</strong> 죽전IC → 단국대방향</p>
                      <p className="text-[#FF6B35]">* 방문자 주차장 이용 가능 (사전 신청 필요)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-xl mb-4 text-[#0052A5]">캠퍼스 약도</h3>
              <div className="aspect-video bg-gradient-to-br from-[#0052A5]/5 to-[#FF6B35]/5 rounded-lg flex items-center justify-center border-2 border-dashed border-[#0052A5]/30">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[#0052A5]/50 mx-auto mb-2" />
                  <p className="text-muted-foreground">단국대학교 죽전캠퍼스</p>
                  <p className="text-sm text-muted-foreground">대학원동 511호</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
