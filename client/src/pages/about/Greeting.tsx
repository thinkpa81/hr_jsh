import { PageHeader } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const tabs = [
  { name: "일반소개", href: "/about" },
  { name: "인사말", href: "/about/greeting" },
  { name: "연혁", href: "/about/history" },
  { name: "조직도", href: "/about/organization" },
  { name: "오시는 길", href: "/about/location" },
];

export default function Greeting() {
  return (
    <div>
      <PageHeader 
        title="인사말" 
        subtitle="데이터지식서비스공학과를 방문해 주셔서 감사합니다"
        breadcrumb="대학원소개"
        tabs={tabs}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#0052A5] to-[#003d7a] rounded-lg flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">학</span>
                  </div>
                  <div className="text-center mt-4">
                    <p className="font-bold text-lg">홍길동</p>
                    <p className="text-muted-foreground text-sm">데이터지식서비스공학과 학과장</p>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <div className="flex items-start gap-2 mb-6">
                    <Quote className="h-8 w-8 text-[#FF6B35] flex-shrink-0" />
                    <h2 className="text-2xl font-bold text-[#0052A5]">
                      데이터 시대를 이끌어갈 미래 인재를 양성합니다
                    </h2>
                  </div>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      안녕하십니까, 단국대학교 대학원 데이터지식서비스공학과를 
                      방문해 주신 여러분을 진심으로 환영합니다.
                    </p>
                    <p>
                      4차 산업혁명 시대를 맞아 데이터는 새로운 원유(Oil)로 불리며, 
                      모든 산업 분야에서 핵심 자원으로 자리잡고 있습니다. 이러한 
                      시대적 요구에 부응하여 본 학과는 데이터 분석, 인공지능, 
                      지식서비스 분야의 전문 인력 양성에 힘쓰고 있습니다.
                    </p>
                    <p>
                      본 학과는 이론과 실무의 균형 잡힌 교육을 통해 창의적이고 
                      실무 능력을 갖춘 인재를 양성하고자 합니다. 또한, 
                      산학협력을 강화하여 현장에서 필요로 하는 실질적인 기술과 
                      지식을 교육하고 있습니다.
                    </p>
                    <p>
                      데이터 과학과 지식서비스 분야에서 새로운 도전을 꿈꾸시는 
                      모든 분들의 참여를 환영합니다. 함께 미래를 만들어 가겠습니다.
                    </p>
                    <p className="font-medium text-foreground">
                      감사합니다.
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t text-right">
                    <p className="text-lg font-bold text-[#0052A5]">
                      데이터지식서비스공학과 학과장 홍길동
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
