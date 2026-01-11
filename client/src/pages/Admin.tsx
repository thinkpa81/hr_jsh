import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Bell, Briefcase, Settings, Save, ArrowLeft, LayoutDashboard, Users, Clock, MapPin, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import type { Job, Notice, Application, Inquiry } from "@shared/schema";
import { LoadingSpinner } from "@/components/LoadingSpinner";

function JobsAdmin() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "JSH",
    department: "",
    location: "용인시 수지구",
    employmentType: "정규직",
    experience: "경력 무관",
    education: "학사 이상",
    salary: "협의 후 결정",
    description: "",
    requirements: "",
    benefits: "4대보험, 연차, 성과급",
    deadline: "",
    status: "active",
  });

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/jobs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({ title: "채용공고가 등록되었습니다." });
      resetForm();
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) =>
      apiRequest("PUT", `/api/jobs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({ title: "채용공고가 수정되었습니다." });
      resetForm();
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/jobs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({ title: "채용공고가 삭제되었습니다." });
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      company: "JSH",
      department: "",
      location: "용인시 수지구",
      employmentType: "정규직",
      experience: "경력 무관",
      education: "학사 이상",
      salary: "협의 후 결정",
      description: "",
      requirements: "",
      benefits: "4대보험, 연차, 성과급",
      deadline: "",
      status: "active",
    });
    setEditingJob(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company || "JSH",
      department: job.department || "",
      location: job.location || "",
      employmentType: job.employmentType || "정규직",
      experience: job.experience || "",
      education: job.education || "",
      salary: job.salary || "",
      description: job.description || "",
      requirements: job.requirements || "",
      benefits: job.benefits || "",
      deadline: job.deadline || "",
      status: job.status || "active",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      updateMutation.mutate({ id: editingJob.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">채용공고 관리</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()} data-testid="button-add-job">
              <Plus className="h-4 w-4" />
              채용공고 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? "채용공고 수정" : "새 채용공고 등록"}</DialogTitle>
              <DialogDescription>
                채용공고 정보를 입력해 주세요.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">직무명 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-job-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">회사명</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">부서</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">근무지</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentType">고용형태</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="정규직">정규직</SelectItem>
                      <SelectItem value="계약직">계약직</SelectItem>
                      <SelectItem value="인턴">인턴</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">마감일</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">직무 설명</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">자격 요건</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={3}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-job"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {createMutation.isPending || updateMutation.isPending ? "저장 중..." : "저장"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : jobs?.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">등록된 채용공고가 없습니다</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs?.map((job) => (
            <Card key={job.id} data-testid={`admin-job-${job.id}`}>
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">{job.company}</Badge>
                    <Badge variant="outline" className="text-xs">{job.employmentType}</Badge>
                    <Badge className={`${job.status === "active" ? "bg-green-500" : "bg-gray-500"} text-xs`}>
                      {job.status === "active" ? "채용중" : "마감"}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{job.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      마감: {job.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      지원자: {job.applicants}명
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>채용공고 삭제</AlertDialogTitle>
                        <AlertDialogDescription>
                          정말로 이 채용공고를 삭제하시겠습니까?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(job.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          삭제
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function NoticesAdmin() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "관리자",
    category: "general",
    important: false,
    createdAt: new Date().toISOString().split("T")[0],
  });

  const { data: notices, isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/notices", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({ title: "공지사항이 등록되었습니다." });
      resetForm();
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) =>
      apiRequest("PUT", `/api/notices/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({ title: "공지사항이 수정되었습니다." });
      resetForm();
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/notices/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({ title: "공지사항이 삭제되었습니다." });
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      author: "관리자",
      category: "general",
      important: false,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setEditingNotice(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      author: notice.author || "관리자",
      category: notice.category || "general",
      important: notice.important || false,
      createdAt: notice.createdAt || new Date().toISOString().split("T")[0],
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotice) {
      updateMutation.mutate({ id: editingNotice.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">공지사항 관리</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()} data-testid="button-add-notice">
              <Plus className="h-4 w-4" />
              공지 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNotice ? "공지사항 수정" : "새 공지사항 등록"}</DialogTitle>
              <DialogDescription>
                공지사항 내용을 입력해 주세요.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notice-title">제목 *</Label>
                <Input
                  id="notice-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-notice-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notice-content">내용 *</Label>
                <Textarea
                  id="notice-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  required
                  data-testid="input-notice-content"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="notice-category">카테고리</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">시스템</SelectItem>
                      <SelectItem value="recruit">채용</SelectItem>
                      <SelectItem value="education">교육</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="general">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notice-date">작성일</Label>
                  <Input
                    id="notice-date"
                    type="date"
                    value={formData.createdAt}
                    onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notice-important"
                  checked={formData.important}
                  onCheckedChange={(checked) => setFormData({ ...formData, important: checked })}
                />
                <Label htmlFor="notice-important">중요 공지로 설정</Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-notice"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {createMutation.isPending || updateMutation.isPending ? "저장 중..." : "저장"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : notices?.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">등록된 공지사항이 없습니다</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notices?.map((notice) => (
            <Card key={notice.id} data-testid={`admin-notice-${notice.id}`}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {notice.important && <Badge variant="default" className="text-xs">중요</Badge>}
                    <Badge variant="outline" className="text-xs">{notice.category}</Badge>
                    <span className="text-sm text-muted-foreground">{notice.createdAt}</span>
                  </div>
                  <h3 className="font-medium line-clamp-1">{notice.title}</h3>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(notice)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>공지사항 삭제</AlertDialogTitle>
                        <AlertDialogDescription>
                          정말로 이 공지사항을 삭제하시겠습니까?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(notice.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          삭제
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ApplicantsView() {
  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const { data: jobs } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const getJobTitle = (jobId: string) => {
    return jobs?.find(j => j.id === jobId)?.title || "알 수 없음";
  };

  const getStageColor = (stage: string | null) => {
    switch (stage) {
      case "document": return "bg-blue-500";
      case "first-interview": return "bg-green-500";
      case "second-interview": return "bg-purple-500";
      case "final": return "bg-orange-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStageName = (stage: string | null) => {
    switch (stage) {
      case "document": return "서류전형";
      case "first-interview": return "1차면접";
      case "second-interview": return "2차면접";
      case "final": return "최종합격";
      case "rejected": return "불합격";
      default: return "대기";
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">지원자 관리</h2>
      
      {applications?.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">등록된 지원자가 없습니다</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {applications?.map((app) => (
            <Card key={app.id} data-testid={`admin-applicant-${app.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{app.name}</span>
                      <Badge className={`${getStageColor(app.stage)} text-xs`}>
                        {getStageName(app.stage)}
                      </Badge>
                      {app.aiScore && (
                        <Badge variant="outline" className="text-xs">
                          AI점수: {app.aiScore}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{getJobTitle(app.jobId)}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{app.email}</span>
                      {app.phone && <span>{app.phone}</span>}
                      <span>{app.createdAt}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function InquiriesAdmin() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [responseText, setResponseText] = useState("");

  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const respondMutation = useMutation({
    mutationFn: ({ id, response }: { id: string; response: string }) =>
      apiRequest("PUT", `/api/inquiries/${id}`, { response, status: "answered" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({ title: "답변이 등록되었습니다." });
      setDialogOpen(false);
      setSelectedInquiry(null);
      setResponseText("");
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/inquiries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({ title: "문의가 삭제되었습니다." });
    },
    onError: () => {
      toast({ title: "오류가 발생했습니다.", variant: "destructive" });
    },
  });

  const openRespondDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setResponseText("");
    setDialogOpen(true);
  };

  const closeRespondDialog = () => {
    setDialogOpen(false);
    setSelectedInquiry(null);
    setResponseText("");
  };

  const handleRespond = () => {
    if (selectedInquiry && responseText.trim()) {
      respondMutation.mutate({ id: selectedInquiry.id, response: responseText });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">문의 관리</h2>

      {inquiries?.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">등록된 문의가 없습니다</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {inquiries?.map((inquiry) => (
            <Card key={inquiry.id} data-testid={`admin-inquiry-${inquiry.id}`}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{inquiry.title}</span>
                        {inquiry.status === "pending" ? (
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            대기중
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            답변완료
                          </Badge>
                        )}
                        {inquiry.category && (
                          <Badge variant="outline" className="text-xs">{inquiry.category}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{inquiry.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{inquiry.name}</span>
                        <span>{inquiry.email}</span>
                        <span>{inquiry.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {inquiry.status === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => openRespondDialog(inquiry)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          답변
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>문의 삭제</AlertDialogTitle>
                            <AlertDialogDescription>
                              이 문의를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(inquiry.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              삭제
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  {inquiry.response && (
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">답변:</p>
                      <p className="text-sm text-green-700 dark:text-green-300">{inquiry.response}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeRespondDialog(); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>문의 답변</DialogTitle>
            <DialogDescription>
              {selectedInquiry?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">문의 내용:</p>
              <p className="text-sm text-muted-foreground">{selectedInquiry?.content}</p>
            </div>
            <div>
              <Label>답변</Label>
              <Textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="답변을 입력하세요"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleRespond}
              disabled={respondMutation.isPending || !responseText.trim()}
            >
              {respondMutation.isPending ? "등록 중..." : "답변 등록"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">접근 권한이 없습니다</h1>
        <p className="text-muted-foreground mb-6">관리자 계정으로 로그인해 주세요.</p>
        <Link href="/login">
          <Button>로그인 페이지로 이동</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            홈으로
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">관리자 페이지</h1>
            <p className="text-muted-foreground">{user.name} ({user.email})</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="mb-8">
          <TabsTrigger value="jobs" className="gap-2">
            <Briefcase className="h-4 w-4" />
            채용공고
          </TabsTrigger>
          <TabsTrigger value="applicants" className="gap-2">
            <Users className="h-4 w-4" />
            지원자
          </TabsTrigger>
          <TabsTrigger value="notices" className="gap-2">
            <Bell className="h-4 w-4" />
            공지사항
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            문의관리
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <JobsAdmin />
        </TabsContent>
        <TabsContent value="applicants">
          <ApplicantsView />
        </TabsContent>
        <TabsContent value="notices">
          <NoticesAdmin />
        </TabsContent>
        <TabsContent value="inquiries">
          <InquiriesAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}
