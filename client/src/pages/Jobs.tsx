import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Briefcase, Search, Filter, ArrowRight, Building2 } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/Header";
import type { Job } from "@shared/schema";
import { useState } from "react";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ["/api/jobs"],
  });

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    return matchesSearch && job.employmentType === filterType;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="채용공고"
        subtitle="JSH의 다양한 채용 기회를 확인하세요"
        breadcrumb="JOBS"
        tabs={[
          { name: "채용공고", href: "/recruit/jobs" },
          { name: "채용 대시보드", href: "/recruit/dashboard" },
          { name: "진행중인 채용", href: "/recruit/ongoing" },
          { name: "직무소개", href: "/recruit/positions" },
          { name: "채용 프로세스", href: "/recruit/process" },
        ]}
      />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="직무, 회사, 부서 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base"
              data-testid="input-search"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-48 h-12" data-testid="select-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="고용형태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="정규직">정규직</SelectItem>
              <SelectItem value="계약직">계약직</SelectItem>
              <SelectItem value="인턴">인턴</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{filteredJobs?.length || 0}</span>개의 채용공고
        </div>

        <div className="grid gap-4">
          {filteredJobs?.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-20 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs?.map((job) => (
              <Card key={job.id} className="hover-elevate shadow-md group" data-testid={`job-card-${job.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="hidden lg:flex w-16 h-16 rounded-xl bg-gradient-to-br from-[#0052A5]/10 to-[#0052A5]/5 items-center justify-center flex-shrink-0">
                      <Building2 className="h-8 w-8 text-[#0052A5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className="bg-[#0052A5]">{job.company}</Badge>
                        <Badge variant="outline">{job.employmentType}</Badge>
                        {job.status === "active" && (
                          <Badge className="bg-green-500">채용중</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-[#0052A5] transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-[#0052A5]" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4 text-[#0052A5]" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-[#FF6B35]" />
                          <span>마감: {job.deadline}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-green-500" />
                          <span>지원자 {job.applicants}명</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:flex-col items-center gap-3 lg:items-end">
                      <Link href={`/recruit/jobs/${job.id}`}>
                        <Button className="gap-2 bg-[#0052A5] hover:bg-[#003d7a]" data-testid={`button-apply-${job.id}`}>
                          상세보기 <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <span className="text-xs text-muted-foreground">조회 {job.views}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
