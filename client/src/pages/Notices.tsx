import { useState } from "react";
import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search, Pin, Calendar, User, ArrowLeft, Eye, Bell, Plus, Pencil, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Notice } from "@shared/schema";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "system", name: "시스템" },
  { id: "recruit", name: "채용" },
  { id: "education", name: "교육" },
  { id: "hr", name: "HR" },
  { id: "general", name: "기타" },
];

function NoticeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [editDialog, setEditDialog] = useState<{ open: boolean; notice: Notice | null }>({ open: false, notice: null });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; noticeId: string }>({ open: false, noticeId: "" });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    author: user?.name || "관리자",
    important: false,
  });

  const { data: notices, isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/notices", {
      ...data,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({ title: "공지사항이 등록되었습니다." });
      setEditDialog({ open: false, notice: null });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<typeof formData> }) => 
      apiRequest("PUT", `/api/notices/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({ title: "공지사항이 수정되었습니다." });
      setEditDialog({ open: false, notice: null });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/notices/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({ title: "공지사항이 삭제되었습니다." });
      setDeleteDialog({ open: false, noticeId: "" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      author: user?.name || "관리자",
      important: false,
    });
  };

  const openEditDialog = (notice?: Notice) => {
    if (notice) {
      setFormData({
        title: notice.title,
        content: notice.content,
        category: notice.category || "general",
        author: notice.author || user?.name || "관리자",
        important: notice.important || false,
      });
      setEditDialog({ open: true, notice });
    } else {
      resetForm();
      setEditDialog({ open: true, notice: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editDialog.notice) {
      updateMutation.mutate({ id: editDialog.notice.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredNotices = notices?.filter((notice) =>
    searchQuery === "" ||
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const importantNotices = filteredNotices.filter((n) => n.important);
  const regularNotices = filteredNotices.filter((n) => !n.important);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="공지사항"
        subtitle="JSH HR 포털의 주요 공지사항을 확인하세요"
        breadcrumb="NOTICES"
      />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="공지사항 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
              data-testid="input-search"
            />
          </div>
          {isAdmin && (
            <Button 
              className="gap-2 bg-[#0052A5] hover:bg-[#003d7a]"
              onClick={() => openEditDialog()}
              data-testid="button-add-notice"
            >
              <Plus className="h-4 w-4" />
              공지 등록
            </Button>
          )}
        </div>

        {filteredNotices.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-20 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">
                {searchQuery ? "검색 조건에 맞는 공지사항이 없습니다." : "등록된 공지사항이 없습니다."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {importantNotices.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Pin className="h-4 w-4 text-[#FF6B35]" />
                  중요 공지
                </h2>
                {importantNotices.map((notice) => (
                  <Card key={notice.id} className="hover-elevate cursor-pointer border-l-4 border-l-[#FF6B35] bg-[#FF6B35]/5 shadow-md" data-testid={`notice-important-${notice.id}`}>
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <Link href={`/notices/${notice.id}`} className="flex-1">
                          <Badge className="w-fit bg-[#FF6B35] mb-2">중요</Badge>
                          <h3 className="font-semibold mb-1 line-clamp-1">{notice.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            {notice.category && (
                              <Badge variant="outline" className="text-xs">{notice.category}</Badge>
                            )}
                            <span className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" />
                              {notice.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {notice.createdAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              {notice.views}
                            </span>
                          </div>
                        </Link>
                        {isAdmin && (
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" onClick={() => openEditDialog(notice)} data-testid={`button-edit-${notice.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-red-500" onClick={() => setDeleteDialog({ open: true, noticeId: notice.id })} data-testid={`button-delete-${notice.id}`}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-semibold text-foreground">{regularNotices.length}</span>건의 공지사항
              </p>
              {regularNotices.map((notice) => (
                <Card key={notice.id} className="hover-elevate shadow-md" data-testid={`notice-${notice.id}`}>
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <Link href={`/notices/${notice.id}`} className="flex-1 cursor-pointer">
                        <h3 className="font-semibold mb-2 line-clamp-1">{notice.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          {notice.category && (
                            <Badge variant="outline" className="text-xs">{notice.category}</Badge>
                          )}
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {notice.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {notice.createdAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {notice.views}
                          </span>
                        </div>
                      </Link>
                      {isAdmin && (
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => openEditDialog(notice)} data-testid={`button-edit-${notice.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-red-500" onClick={() => setDeleteDialog({ open: true, noticeId: notice.id })} data-testid={`button-delete-${notice.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({ ...editDialog, open })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editDialog.notice ? "공지사항 수정" : "공지사항 등록"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>카테고리</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>작성자</Label>
                <Input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} data-testid="input-author" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>제목</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required data-testid="input-title" />
            </div>
            <div className="space-y-2">
              <Label>내용</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={8} required data-testid="input-content" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.important} onCheckedChange={(checked) => setFormData({ ...formData, important: checked })} data-testid="switch-important" />
              <Label>중요 공지</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialog({ open: false, notice: null })}>취소</Button>
              <Button type="submit" className="bg-[#0052A5] hover:bg-[#003d7a]" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit">
                {editDialog.notice ? "수정" : "등록"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공지사항 삭제</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">이 공지사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, noticeId: "" })}>취소</Button>
            <Button variant="destructive" onClick={() => deleteMutation.mutate(deleteDialog.noticeId)} disabled={deleteMutation.isPending} data-testid="button-confirm-delete">
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NoticeDetail() {
  const [, params] = useRoute("/notices/:id");
  const noticeId = params?.id;

  const { data: notices, isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const notice = notices?.find((n) => n.id === noticeId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground mb-4">공지사항을 찾을 수 없습니다.</p>
        <Link href="/notices">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="공지사항"
        subtitle={notice.title}
        breadcrumb="NOTICES"
      />
      
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6">
          <Link href="/notices">
            <Button variant="outline" className="gap-2 border-[#0052A5] text-[#0052A5]">
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {notice.important && <Badge className="bg-[#FF6B35]">중요</Badge>}
              {notice.category && <Badge variant="outline">{notice.category}</Badge>}
            </div>
            <h1 className="text-2xl font-bold mb-4">{notice.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {notice.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {notice.createdAt}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                조회 {notice.views}
              </span>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap">{notice.content}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Notices() {
  const [isDetail] = useRoute("/notices/:id");
  
  return isDetail ? <NoticeDetail /> : <NoticeList />;
}
