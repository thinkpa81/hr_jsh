import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { HelpCircle, Mail, Send, MessageSquare, CheckCircle2, Clock, FileText, Lock, Pencil, Trash2 } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/Header";
import type { FAQ, Inquiry } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";

function FAQPage() {
  const { data: faqs, isLoading } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner />
      </div>
    );
  }

  const faqCategories = Array.from(new Set(faqs?.map((f) => f.category) || [])).filter((c): c is string => c !== null);

  return (
    <div>
      <PageHeader 
        title="FAQ"
        subtitle="자주 묻는 질문을 확인하세요"
        breadcrumb="SUPPORT"
        tabs={[
          { name: "FAQ", href: "/support/faq" },
          { name: "1:1 문의", href: "/support/inquiry" },
          { name: "자료실", href: "/support/archive" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#0052A5]" />
                  자주 묻는 질문
                </CardTitle>
              </CardHeader>
              <CardContent>
                {faqs && faqs.length > 0 ? (
                  <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={`item-${index}`}>
                        <AccordionTrigger className="text-left" data-testid={`faq-${index}`}>
                          <span className="flex items-center gap-2">
                            <Badge variant="outline" className="mr-2">{faq.category}</Badge>
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground pl-6">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground text-center py-8">등록된 FAQ가 없습니다.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">카테고리</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">전체</Button>
                  {faqCategories.map((category) => (
                    <Button key={category} variant="ghost" className="w-full justify-start">
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function InquiryPage() {
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const [inquiryForm, setInquiryForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    category: "general",
    title: "",
    content: "",
    pin: "",
    pinConfirm: "",
  });
  const [pinDialog, setPinDialog] = useState<{ open: boolean; inquiryId: string; action: "edit" | "delete" }>({ open: false, inquiryId: "", action: "edit" });
  const [pinInput, setPinInput] = useState("");
  const [editDialog, setEditDialog] = useState<{ open: boolean; inquiry: Inquiry | null }>({ open: false, inquiry: null });
  const [responseDialog, setResponseDialog] = useState<{ open: boolean; inquiry: Inquiry | null }>({ open: false, inquiry: null });
  const [responseText, setResponseText] = useState("");

  const { data: myInquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries/my", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await fetch(`/api/inquiries/my?email=${encodeURIComponent(user.email)}`);
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      return res.json();
    },
    enabled: !!user,
  });

  const { data: allInquiries } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
    enabled: isAdmin,
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof inquiryForm) => apiRequest("POST", "/api/inquiries", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: data.category,
      title: data.title,
      content: data.content,
      pin: data.pin,
      status: "pending",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries/my"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({
        title: "문의가 접수되었습니다",
        description: "담당자가 확인 후 답변드리겠습니다.",
      });
      setInquiryForm({ ...inquiryForm, title: "", content: "", category: "general", pin: "", pinConfirm: "", phone: "" });
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof inquiryForm> }) => 
      apiRequest("PUT", `/api/inquiries/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries/my"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({ title: "문의가 수정되었습니다." });
      setEditDialog({ open: false, inquiry: null });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, pin }: { id: string; pin: string }) => 
      apiRequest("DELETE", `/api/inquiries/${id}`, { pin }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries/my"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({ title: "문의가 삭제되었습니다." });
      setPinDialog({ open: false, inquiryId: "", action: "edit" });
      setPinInput("");
    },
    onError: () => {
      toast({ title: "삭제 실패", variant: "destructive" });
    },
  });

  const respondMutation = useMutation({
    mutationFn: ({ id, response }: { id: string; response: string }) => 
      apiRequest("POST", `/api/inquiries/${id}/respond`, { response, respondedBy: user?.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({ title: "답변이 등록되었습니다." });
      setResponseDialog({ open: false, inquiry: null });
      setResponseText("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryForm.pin.length !== 4 || !/^\d{4}$/.test(inquiryForm.pin)) {
      toast({ title: "PIN은 4자리 숫자여야 합니다.", variant: "destructive" });
      return;
    }
    if (inquiryForm.pin !== inquiryForm.pinConfirm) {
      toast({ title: "PIN이 일치하지 않습니다.", variant: "destructive" });
      return;
    }
    createMutation.mutate(inquiryForm);
  };

  const handlePinVerify = async () => {
    try {
      const response = await apiRequest("POST", `/api/inquiries/${pinDialog.inquiryId}/verify-pin`, { pin: pinInput });
      if (response.ok) {
        if (pinDialog.action === "delete") {
          deleteMutation.mutate({ id: pinDialog.inquiryId, pin: pinInput });
        }
      }
    } catch (error) {
      toast({ title: "PIN이 올바르지 않습니다.", variant: "destructive" });
      setPinInput("");
    }
  };

  const displayInquiries = isAdmin ? allInquiries : myInquiries;

  return (
    <div>
      <PageHeader 
        title="1:1 문의"
        subtitle="궁금한 사항을 문의해 주세요"
        breadcrumb="SUPPORT"
        tabs={[
          { name: "FAQ", href: "/support/faq" },
          { name: "1:1 문의", href: "/support/inquiry" },
          { name: "자료실", href: "/support/archive" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#0052A5]" />
                  문의하기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">이름</Label>
                      <Input
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="이름"
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">이메일</Label>
                      <Input
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="이메일"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">연락처</Label>
                      <Input
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="010-1234-5678"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">카테고리</Label>
                      <Select 
                        value={inquiryForm.category} 
                        onValueChange={(value) => setInquiryForm({ ...inquiryForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">일반 문의</SelectItem>
                          <SelectItem value="recruit">채용 문의</SelectItem>
                          <SelectItem value="education">교육 문의</SelectItem>
                          <SelectItem value="system">시스템 문의</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">제목</Label>
                    <Input
                      value={inquiryForm.title}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, title: e.target.value })}
                      placeholder="문의 제목"
                      required
                      data-testid="input-title"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">내용</Label>
                    <Textarea
                      value={inquiryForm.content}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, content: e.target.value })}
                      placeholder="문의 내용을 입력하세요"
                      rows={6}
                      required
                      data-testid="input-content"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        보안 PIN (4자리)
                      </Label>
                      <Input
                        type="password"
                        maxLength={4}
                        value={inquiryForm.pin}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, pin: e.target.value.replace(/\D/g, "") })}
                        placeholder="4자리 숫자"
                        required
                        data-testid="input-pin"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">PIN 확인</Label>
                      <Input
                        type="password"
                        maxLength={4}
                        value={inquiryForm.pinConfirm}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, pinConfirm: e.target.value.replace(/\D/g, "") })}
                        placeholder="PIN 재입력"
                        required
                        data-testid="input-pin-confirm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">수정/삭제 시 필요한 PIN입니다. 반드시 기억해 주세요.</p>
                  <Button 
                    type="submit" 
                    className="w-full gap-2 bg-[#0052A5] hover:bg-[#003d7a]" 
                    disabled={createMutation.isPending}
                    data-testid="button-submit"
                  >
                    <Send className="h-4 w-4" />
                    {createMutation.isPending ? "제출 중..." : "문의하기"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-t-4 border-t-[#0052A5]">
              <CardHeader>
                <CardTitle className="text-lg">{isAdmin ? "전체 문의 내역" : "나의 문의 내역"}</CardTitle>
              </CardHeader>
              <CardContent>
                {!user ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    로그인 후 문의 내역을 확인할 수 있습니다.
                  </p>
                ) : isLoading ? (
                  <div className="py-4 text-center"><LoadingSpinner /></div>
                ) : displayInquiries && displayInquiries.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {displayInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            {inquiry.status === "pending" && (
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                대기중
                              </Badge>
                            )}
                            {inquiry.status === "answered" && (
                              <Badge className="bg-green-500 text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                답변완료
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {isAdmin && inquiry.status === "pending" && (
                              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => { setResponseDialog({ open: true, inquiry }); setResponseText(""); }}>
                                <MessageSquare className="h-3 w-3" />
                              </Button>
                            )}
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500" onClick={() => setPinDialog({ open: true, inquiryId: inquiry.id, action: "delete" })}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        {isAdmin && <p className="text-xs text-muted-foreground mb-1">{inquiry.name} ({inquiry.email})</p>}
                        <p className="font-medium text-sm truncate">{inquiry.title}</p>
                        <p className="text-xs text-muted-foreground">{inquiry.createdAt}</p>
                        {inquiry.response && (
                          <div className="mt-2 p-2 bg-muted rounded text-xs">
                            <p className="font-medium mb-1">답변:</p>
                            <p className="text-muted-foreground">{inquiry.response}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    문의 내역이 없습니다.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-[#0052A5]/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-[#0052A5] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">문의 처리 안내</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      문의는 접수 후 1~2영업일 내에 답변드립니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={pinDialog.open} onOpenChange={(open) => { setPinDialog({ ...pinDialog, open }); setPinInput(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {isAdmin ? "관리자 확인" : "PIN 인증"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isAdmin ? (
              <p className="text-sm text-muted-foreground">관리자 권한으로 삭제하시겠습니까?</p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">문의 삭제를 위해 등록 시 설정한 PIN을 입력해주세요.</p>
                <Input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="4자리 PIN"
                  data-testid="input-pin-verify"
                />
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setPinDialog({ open: false, inquiryId: "", action: "edit" }); setPinInput(""); }}>취소</Button>
            <Button 
              onClick={handlePinVerify}
              className="bg-red-500 hover:bg-red-600"
              disabled={!isAdmin && pinInput.length !== 4}
              data-testid="button-pin-confirm"
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={responseDialog.open} onOpenChange={(open) => setResponseDialog({ ...responseDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>답변 등록</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {responseDialog.inquiry && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-sm">{responseDialog.inquiry.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{responseDialog.inquiry.content}</p>
              </div>
            )}
            <Textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="답변 내용을 입력하세요"
              rows={4}
              data-testid="input-response"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialog({ open: false, inquiry: null })}>취소</Button>
            <Button 
              onClick={() => responseDialog.inquiry && respondMutation.mutate({ id: responseDialog.inquiry.id, response: responseText })}
              className="bg-[#0052A5] hover:bg-[#003d7a]"
              disabled={!responseText || respondMutation.isPending}
              data-testid="button-submit-response"
            >
              답변 등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ArchivePage() {
  return (
    <div>
      <PageHeader 
        title="자료실"
        subtitle="HR 관련 자료를 다운로드하세요"
        breadcrumb="SUPPORT"
        tabs={[
          { name: "FAQ", href: "/support/faq" },
          { name: "1:1 문의", href: "/support/inquiry" },
          { name: "자료실", href: "/support/archive" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <Card className="shadow-lg">
          <CardContent className="py-20 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">자료실 준비 중입니다.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Support() {
  const [location] = useLocation();

  if (location === "/support/inquiry") {
    return <InquiryPage />;
  }
  if (location === "/support/archive") {
    return <ArchivePage />;
  }
  return <FAQPage />;
}
