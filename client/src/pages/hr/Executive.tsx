import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Scale, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Building2,
  UserCheck,
  Calendar,
  BookOpen
} from "lucide-react";

const commercialLawContent = [
  {
    title: "이사 선임 및 해임",
    icon: UserCheck,
    content: [
      "이사는 주주총회에서 선임합니다 (상법 제382조)",
      "이사의 임기는 3년을 초과하지 못합니다 (상법 제383조)",
      "이사는 언제든지 주주총회 결의로 해임할 수 있습니다",
      "정당한 이유 없이 임기 중 해임된 이사는 회사에 손해배상 청구 가능",
    ],
  },
  {
    title: "이사의 의무",
    icon: Scale,
    content: [
      "선관주의의무: 이사는 선량한 관리자의 주의로써 직무를 수행해야 합니다 (상법 제382조의3)",
      "충실의무: 이사는 법령과 정관의 규정에 따라 회사를 위하여 그 직무를 충실하게 수행해야 합니다 (상법 제382조의3)",
      "경업금지의무: 이사는 이사회의 승인 없이 동종 영업을 할 수 없습니다 (상법 제397조)",
      "자기거래 제한: 이사는 이사회의 승인 없이 회사와 거래할 수 없습니다 (상법 제398조)",
    ],
  },
  {
    title: "이사회 운영",
    icon: Building2,
    content: [
      "이사회는 이사 전원으로 구성됩니다 (상법 제390조)",
      "이사회 결의는 이사 과반수 출석과 출석이사 과반수로 의결합니다",
      "이사회는 회사의 업무집행에 관한 의사를 결정합니다",
      "대표이사는 이사회에서 선임합니다",
    ],
  },
  {
    title: "감사/감사위원회",
    icon: FileText,
    content: [
      "감사는 주주총회에서 선임합니다 (상법 제409조)",
      "감사의 임기는 취임 후 3년 내의 최종 결산기에 관한 정기총회 종결시까지",
      "상장회사는 감사위원회를 설치해야 합니다 (상법 제415조의2)",
      "감사위원회는 3인 이상의 이사로 구성되며, 2/3 이상이 사외이사여야 합니다",
    ],
  },
];

const civilLawContent = [
  {
    title: "위임계약의 원칙",
    icon: BookOpen,
    content: [
      "이사와 회사의 관계는 위임에 관한 규정을 적용합니다 (상법 제382조제2항)",
      "수임인(이사)은 위임사무를 처리함에 선량한 관리자의 주의의무가 있습니다 (민법 제681조)",
      "수임인은 위임인의 청구가 있는 때에는 언제든지 위임사무의 처리상황을 보고해야 합니다 (민법 제683조)",
      "위임계약은 각 당사자가 언제든지 해지할 수 있습니다 (민법 제689조)",
    ],
  },
  {
    title: "보수청구권",
    icon: Scale,
    content: [
      "이사의 보수는 정관에 그 액을 정하지 아니한 때에는 주주총회의 결의로 정합니다 (상법 제388조)",
      "특별한 약정이 없으면 수임인은 보수를 청구하지 못합니다 (민법 제686조)",
      "보수약정이 있는 경우 위임사무 완료 후 보수를 청구할 수 있습니다",
      "이사 보수의 적정성은 경영판단의 원칙에 따라 판단됩니다",
    ],
  },
  {
    title: "손해배상책임",
    icon: AlertCircle,
    content: [
      "이사가 임무를 게을리한 때에는 회사에 대하여 연대하여 손해를 배상할 책임이 있습니다 (상법 제399조)",
      "이사가 고의 또는 중대한 과실로 그 임무를 게을리한 때에는 제3자에 대하여도 연대하여 손해를 배상할 책임이 있습니다 (상법 제401조)",
      "채무불이행에 따른 손해배상책임 (민법 제390조)",
      "불법행위에 따른 손해배상책임 (민법 제750조)",
    ],
  },
];

const executiveTypes = [
  { 
    title: "사내이사", 
    description: "회사 내부에서 상근하며 업무를 집행하는 이사",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
  },
  { 
    title: "사외이사", 
    description: "회사의 상무에 종사하지 않는 독립적인 이사",
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
  },
  { 
    title: "기타비상무이사", 
    description: "상근하지 않지만 사외이사가 아닌 이사",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
  },
  { 
    title: "대표이사", 
    description: "회사를 대표하고 업무를 집행하는 이사",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
  },
  { 
    title: "감사", 
    description: "이사의 직무집행을 감사하는 기관",
    color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
  },
];

const appointmentProcess = [
  { step: 1, title: "후보자 선정", description: "이사회 또는 이사후보추천위원회에서 후보자를 선정합니다" },
  { step: 2, title: "주주총회 소집", description: "이사 선임 안건을 포함하여 주주총회를 소집합니다" },
  { step: 3, title: "주주총회 결의", description: "출석 주주 의결권의 과반수와 발행주식총수의 1/4 이상으로 선임합니다" },
  { step: 4, title: "등기", description: "이사 선임 후 2주 내에 법인등기부에 등기합니다" },
  { step: 5, title: "취임", description: "등기 완료 후 공식적으로 이사로 취임합니다" },
];

export default function Executive() {
  return (
    <div>
      <PageHeader 
        title="임원인사"
        subtitle="상법 및 민법에 기반한 임원 관리 규정"
        breadcrumb="인사제도"
        tabs={[
          { name: "HR 종합 가이드", href: "/hr/guide" },
          { name: "임원인사", href: "/hr/executive" },
          { name: "평가제도", href: "/hr/evaluation" },
          { name: "승진제도", href: "/hr/promotion" },
          { name: "복리후생", href: "/hr/benefits" },
          { name: "조직문화", href: "/hr/culture" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#0052A5]" />
                임원 유형
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {executiveTypes.map((type, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <Badge className={type.color}>{type.title}</Badge>
                    <p className="text-sm text-muted-foreground mt-2">{type.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#0052A5]" />
                임원 선임 절차
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                {appointmentProcess.map((process, index) => (
                  <div key={index} className="flex-1 relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#0052A5] text-white flex items-center justify-center font-bold text-sm">
                        {process.step}
                      </div>
                      <span className="font-semibold">{process.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">{process.description}</p>
                    {index < appointmentProcess.length - 1 && (
                      <div className="hidden md:block absolute top-4 left-[calc(100%-8px)] w-4 h-0.5 bg-muted" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="commercial" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="commercial" className="gap-2" data-testid="tab-commercial">
              <Scale className="h-4 w-4" />
              상법
            </TabsTrigger>
            <TabsTrigger value="civil" className="gap-2" data-testid="tab-civil">
              <BookOpen className="h-4 w-4" />
              민법
            </TabsTrigger>
          </TabsList>

          <TabsContent value="commercial" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {commercialLawContent.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <section.icon className="h-5 w-5 text-[#0052A5]" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="civil" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {civilLawContent.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <section.icon className="h-5 w-5 text-[#FF6B35]" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#FF6B35]" />
              주요 유의사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">상장회사 특례</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>자산총액 2조원 이상: 사외이사 3인 이상 및 이사 총수의 과반수</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>상장회사는 감사위원회를 반드시 설치</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>사외이사 후보추천위원회 설치 의무</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">결격사유</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>피성년후견인, 피한정후견인</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>파산선고를 받고 복권되지 않은 자</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>법률에 따라 자격이 정지 또는 상실된 자</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
