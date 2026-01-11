import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Upload, FileText, CheckCircle, User, Mail, Phone, Briefcase, GraduationCap, Award, Paperclip, Eye, Pencil, Trash2, Lock, Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import type { Resume } from "@shared/schema";

export default function ResumePage() {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showList, setShowList] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [pinDialog, setPinDialog] = useState<{ open: boolean; resumeId: string; action: "edit" | "delete" | "view"; resume?: Resume }>({ open: false, resumeId: "", action: "view" });
  const [pinInput, setPinInput] = useState("");
  const [editDialog, setEditDialog] = useState<{ open: boolean; resume: Resume | null }>({ open: false, resume: null });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    skills: "",
    introduction: "",
    pin: "",
    pinConfirm: "",
  });

  const { data: resumes = [], isLoading } = useQuery<Resume[]>({
    queryKey: ["/api/resumes"],
    enabled: showList || isAdmin,
  });

  const createResumeMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/resumes", {
        method: "POST",
        body: data,
      });
      if (!response.ok) throw new Error("Failed to create resume");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "이력서 제출 완료",
        description: "이력서가 성공적으로 제출되었습니다. 검토 후 연락드리겠습니다.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "오류",
        description: "이력서 제출 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: async ({ id, pin }: { id: string; pin: string }) => {
      return apiRequest("DELETE", `/api/resumes/${id}`, { pin });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({ title: "삭제 완료", description: "이력서가 삭제되었습니다." });
      setPinDialog({ open: false, resumeId: "", action: "view" });
      setPinInput("");
    },
    onError: () => {
      toast({ title: "삭제 실패", description: "이력서 삭제에 실패했습니다.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      education: "",
      skills: "",
      introduction: "",
      pin: "",
      pinConfirm: "",
    });
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.pin.length !== 4 || !/^\d{4}$/.test(formData.pin)) {
      toast({
        title: "PIN 오류",
        description: "PIN은 4자리 숫자여야 합니다.",
        variant: "destructive",
      });
      return;
    }

    if (formData.pin !== formData.pinConfirm) {
      toast({
        title: "PIN 오류",
        description: "PIN이 일치하지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("position", formData.position);
    data.append("experience", formData.experience);
    data.append("education", formData.education);
    data.append("skills", formData.skills);
    data.append("introduction", formData.introduction);
    data.append("pin", formData.pin);
    if (selectedFile) {
      data.append("file", selectedFile);
    }

    createResumeMutation.mutate(data);
    setIsSubmitting(false);
  };

  const handlePinVerify = async () => {
    if (isAdmin) {
      if (pinDialog.action === "delete") {
        deleteResumeMutation.mutate({ id: pinDialog.resumeId, pin: "" });
      } else if (pinDialog.action === "edit" && pinDialog.resume) {
        setEditDialog({ open: true, resume: pinDialog.resume });
        setPinDialog({ open: false, resumeId: "", action: "view" });
      }
      setPinInput("");
      return;
    }

    try {
      const response = await apiRequest("POST", `/api/resumes/${pinDialog.resumeId}/verify-pin`, { pin: pinInput });
      if (response.ok) {
        if (pinDialog.action === "delete") {
          deleteResumeMutation.mutate({ id: pinDialog.resumeId, pin: pinInput });
        } else if (pinDialog.action === "edit" && pinDialog.resume) {
          setEditDialog({ open: true, resume: pinDialog.resume });
          setPinDialog({ open: false, resumeId: "", action: "view" });
        }
      }
    } catch (error) {
      toast({
        title: "인증 실패",
        description: "PIN이 올바르지 않습니다.",
        variant: "destructive",
      });
    }
    setPinInput("");
  };

  const filteredResumes = resumes.filter(r => 
    !searchEmail || r.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700">검토중</Badge>;
      case "reviewed": return <Badge className="bg-blue-100 text-blue-700">검토완료</Badge>;
      case "accepted": return <Badge className="bg-green-100 text-green-700">합격</Badge>;
      case "rejected": return <Badge className="bg-red-100 text-red-700">불합격</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <PageHeader 
        title="이력서 업로드"
        subtitle="JSH에 지원하실 분은 이력서를 제출해주세요"
        breadcrumb="채용"
        tabs={[
          { name: "직무소개", href: "/recruit/positions" },
          { name: "채용 프로세스", href: "/recruit/process" },
          { name: "채용공고", href: "/recruit/jobs" },
          { name: "진행중인 채용", href: "/recruit/ongoing" },
          { name: "채용 FAQ", href: "/recruit/faq" },
          { name: "이력서 업로드", href: "/recruit/resume" },
          { name: "지원자 관리", href: "/recruit/applicants" },
          { name: "이메일 관리", href: "/recruit/email" },
          { name: "통계 분석", href: "/recruit/analytics" },
        ]}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-[#0052A5]" />
                  이력서 작성
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        이름 *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="홍길동"
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        이메일 *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="example@email.com"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        연락처 *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="010-1234-5678"
                        required
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        지원 포지션 *
                      </Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        placeholder="프론트엔드 개발자"
                        required
                        data-testid="input-position"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        경력사항
                      </Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        placeholder="회사명, 직책, 기간 등"
                        rows={3}
                        data-testid="input-experience"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        학력
                      </Label>
                      <Textarea
                        id="education"
                        value={formData.education}
                        onChange={(e) => setFormData({...formData, education: e.target.value})}
                        placeholder="학교명, 전공, 졸업년도 등"
                        rows={3}
                        data-testid="input-education"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">보유 기술/역량</Label>
                    <Input
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                      placeholder="React, TypeScript, Node.js 등"
                      data-testid="input-skills"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="introduction">자기소개</Label>
                    <Textarea
                      id="introduction"
                      value={formData.introduction}
                      onChange={(e) => setFormData({...formData, introduction: e.target.value})}
                      placeholder="간략한 자기소개를 작성해주세요"
                      rows={4}
                      data-testid="input-introduction"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      이력서 파일 첨부
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-[#0052A5] transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.hwp"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="hidden"
                        data-testid="input-file"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        {selectedFile ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="h-8 w-8 text-[#0052A5]" />
                            <div className="text-left">
                              <p className="font-medium">{selectedFile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={(e) => { e.preventDefault(); setSelectedFile(null); }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              클릭하여 파일 선택 (PDF, DOC, DOCX, HWP)
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">최대 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pin" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        보안 PIN (4자리) *
                      </Label>
                      <Input
                        id="pin"
                        type="password"
                        maxLength={4}
                        value={formData.pin}
                        onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, "")})}
                        placeholder="4자리 숫자"
                        required
                        data-testid="input-pin"
                      />
                      <p className="text-xs text-muted-foreground">수정/삭제 시 필요한 PIN입니다</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pinConfirm" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        PIN 확인 *
                      </Label>
                      <Input
                        id="pinConfirm"
                        type="password"
                        maxLength={4}
                        value={formData.pinConfirm}
                        onChange={(e) => setFormData({...formData, pinConfirm: e.target.value.replace(/\D/g, "")})}
                        placeholder="PIN 재입력"
                        required
                        data-testid="input-pin-confirm"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#0052A5] hover:bg-[#003d7a] gap-2"
                    disabled={isSubmitting || createResumeMutation.isPending}
                    data-testid="button-submit"
                  >
                    {isSubmitting || createResumeMutation.isPending ? (
                      "제출 중..."
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        이력서 제출
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-[#0052A5]" />
                  내 이력서 조회
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>이메일로 조회</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="가입한 이메일"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      data-testid="input-search-email"
                    />
                    <Button onClick={() => setShowList(true)} data-testid="button-search">
                      조회
                    </Button>
                  </div>
                </div>

                {(showList || isAdmin) && (
                  <div className="space-y-3 mt-4">
                    {isLoading ? (
                      <p className="text-sm text-muted-foreground">로딩중...</p>
                    ) : filteredResumes.length === 0 ? (
                      <p className="text-sm text-muted-foreground">등록된 이력서가 없습니다.</p>
                    ) : (
                      filteredResumes.map((resume) => (
                        <Card key={resume.id} className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{resume.name}</p>
                              <p className="text-xs text-muted-foreground">{resume.position}</p>
                              <p className="text-xs text-muted-foreground">{resume.createdAt}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {getStatusBadge(resume.status || "pending")}
                            </div>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {resume.fileUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-3 w-3 mr-1" />
                                  파일
                                </a>
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setPinDialog({ open: true, resumeId: resume.id, action: "edit", resume })}
                              data-testid={`button-edit-${resume.id}`}
                            >
                              <Pencil className="h-3 w-3 mr-1" />
                              수정
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => setPinDialog({ open: true, resumeId: resume.id, action: "delete", resume })}
                              data-testid={`button-delete-${resume.id}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">제출 안내</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    이력서는 PDF, DOC, DOCX, HWP 형식으로 첨부해주세요.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    4자리 PIN을 반드시 기억해 주세요. 수정/삭제 시 필요합니다.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    제출된 이력서는 검토 후 개별 연락드립니다.
                  </li>
                </ul>
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
              <p className="text-sm text-muted-foreground">
                관리자 권한으로 {pinDialog.action === "delete" ? "삭제" : "수정"}하시겠습니까?
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  이력서 {pinDialog.action === "delete" ? "삭제" : "수정"}을 위해 등록 시 설정한 PIN을 입력해주세요.
                </p>
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
            <Button variant="outline" onClick={() => { setPinDialog({ open: false, resumeId: "", action: "view" }); setPinInput(""); }}>
              취소
            </Button>
            <Button 
              onClick={handlePinVerify}
              className={pinDialog.action === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-[#0052A5] hover:bg-[#003d7a]"}
              disabled={!isAdmin && pinInput.length !== 4}
              data-testid="button-pin-confirm"
            >
              {pinDialog.action === "delete" ? "삭제" : "수정"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
