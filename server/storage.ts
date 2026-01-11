import { 
  type User, type InsertUser,
  type Job, type InsertJob,
  type Application, type InsertApplication,
  type Course, type InsertCourse,
  type Notice, type InsertNotice,
  type FAQ, type InsertFAQ,
  type Inquiry, type InsertInquiry,
  type Resume, type InsertResume,
  type AnalyticsData, type InsertAnalyticsData
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;

  getApplications(): Promise<Application[]>;
  getApplication(id: string): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: string, application: Partial<InsertApplication>): Promise<Application | undefined>;
  deleteApplication(id: string): Promise<boolean>;

  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;

  getNotices(): Promise<Notice[]>;
  getNotice(id: string): Promise<Notice | undefined>;
  createNotice(notice: InsertNotice): Promise<Notice>;
  updateNotice(id: string, notice: Partial<InsertNotice>): Promise<Notice | undefined>;
  deleteNotice(id: string): Promise<boolean>;

  getFAQs(): Promise<FAQ[]>;
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiry(id: string, inquiry: Partial<InsertInquiry>): Promise<Inquiry | undefined>;
  deleteInquiry(id: string): Promise<boolean>;

  getResumes(): Promise<Resume[]>;
  getResume(id: string): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;

  getAnalyticsData(type?: string): Promise<AnalyticsData[]>;
  getLatestAnalyticsData(type: string): Promise<AnalyticsData | undefined>;
  createAnalyticsData(data: InsertAnalyticsData): Promise<AnalyticsData>;
  deleteAnalyticsData(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private jobs: Map<string, Job>;
  private applications: Map<string, Application>;
  private courses: Map<string, Course>;
  private notices: Map<string, Notice>;
  private faqs: Map<string, FAQ>;
  private inquiries: Map<string, Inquiry>;
  private resumes: Map<string, Resume>;
  private analyticsData: Map<string, AnalyticsData>;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.applications = new Map();
    this.courses = new Map();
    this.notices = new Map();
    this.faqs = new Map();
    this.inquiries = new Map();
    this.resumes = new Map();
    this.analyticsData = new Map();
    this.initializeData();
  }

  private initializeData() {
    const adminUser: User = {
      id: randomUUID(),
      email: "thinkpa@naver.com",
      password: "audghk99**",
      name: "장순호",
      phone: "031-8005-3500",
      department: "시스템관리",
      position: "관리자",
      level: 5,
      role: "admin",
      status: "active",
      createdAt: "2024-01-01",
    };
    this.users.set(adminUser.id, adminUser);

    const sampleJobs: InsertJob[] = [
      {
        title: "데이터 엔지니어",
        company: "JSH 제조",
        department: "데이터팀",
        location: "용인시 수지구",
        employmentType: "정규직",
        experience: "경력 3년 이상",
        education: "학사 이상",
        salary: "협의 후 결정",
        description: "빅데이터 플랫폼 구축 및 운영, 데이터 파이프라인 개발",
        requirements: "Python, Spark, Hadoop 경험자 우대",
        benefits: "4대보험, 연차, 성과급",
        deadline: "2024-12-31",
        status: "active",
        views: 245,
        applicants: 12,
        createdAt: "2024-09-01",
      },
      {
        title: "AI/ML 엔지니어",
        company: "JSH 반도체",
        department: "AI연구소",
        location: "용인시 수지구",
        employmentType: "정규직",
        experience: "경력 5년 이상",
        education: "석사 이상",
        salary: "8,000만원 이상",
        description: "AI 모델 개발 및 최적화, MLOps 구축",
        requirements: "TensorFlow, PyTorch 필수, LLM 경험자 우대",
        benefits: "4대보험, 연차, 스톡옵션",
        deadline: "2024-12-25",
        status: "active",
        views: 189,
        applicants: 8,
        createdAt: "2024-09-05",
      },
      {
        title: "HR 매니저",
        company: "JSH 지주",
        department: "인사팀",
        location: "서울 강남구",
        employmentType: "정규직",
        experience: "경력 7년 이상",
        education: "학사 이상",
        salary: "협의 후 결정",
        description: "채용 전략 수립, 인재 육성 프로그램 기획",
        requirements: "채용 경력 5년 이상, HRBP 경험자 우대",
        benefits: "4대보험, 연차, 복지포인트",
        deadline: "2024-12-20",
        status: "active",
        views: 156,
        applicants: 5,
        createdAt: "2024-09-10",
      },
      {
        title: "프론트엔드 개발자",
        company: "JSH IT",
        department: "개발팀",
        location: "용인시 수지구",
        employmentType: "정규직",
        experience: "경력 2년 이상",
        education: "학사 이상",
        salary: "5,000~7,000만원",
        description: "웹 프론트엔드 개발, UI/UX 개선",
        requirements: "React, TypeScript 필수, Next.js 우대",
        benefits: "4대보험, 연차, 재택근무",
        deadline: "2024-12-15",
        status: "active",
        views: 312,
        applicants: 18,
        createdAt: "2024-09-12",
      },
      {
        title: "투자분석 애널리스트",
        company: "JSH 투자",
        department: "투자팀",
        location: "서울 여의도",
        employmentType: "정규직",
        experience: "경력 3년 이상",
        education: "학사 이상",
        salary: "협의 후 결정",
        description: "투자 대상 기업 분석, 실사 수행",
        requirements: "CFA 자격증 보유자 우대, 재무분석 경험 필수",
        benefits: "4대보험, 연차, 성과급",
        deadline: "2024-12-18",
        status: "active",
        views: 98,
        applicants: 3,
        createdAt: "2024-09-15",
      },
    ];

    sampleJobs.forEach((job) => {
      const id = randomUUID();
      this.jobs.set(id, { ...job, id } as Job);
    });

    const sampleApplications: InsertApplication[] = [
      {
        jobId: Array.from(this.jobs.keys())[0],
        name: "김민수",
        email: "minsu.kim@email.com",
        phone: "010-1234-5678",
        status: "pending",
        aiScore: 92,
        stage: "first-interview",
        createdAt: "2024-09-20",
      },
      {
        jobId: Array.from(this.jobs.keys())[0],
        name: "이서연",
        email: "seoyeon.lee@email.com",
        phone: "010-2345-6789",
        status: "pending",
        aiScore: 88,
        stage: "second-interview",
        createdAt: "2024-09-21",
      },
      {
        jobId: Array.from(this.jobs.keys())[1],
        name: "박준혁",
        email: "junhyuk.park@email.com",
        phone: "010-3456-7890",
        status: "pending",
        aiScore: 95,
        stage: "document",
        createdAt: "2024-09-22",
      },
      {
        jobId: Array.from(this.jobs.keys())[2],
        name: "최유진",
        email: "yujin.choi@email.com",
        phone: "010-4567-8901",
        status: "accepted",
        aiScore: 91,
        stage: "final",
        createdAt: "2024-09-18",
      },
    ];

    sampleApplications.forEach((app) => {
      const id = randomUUID();
      this.applications.set(id, { ...app, id } as Application);
    });

    const sampleNotices: InsertNotice[] = [
      {
        title: "2024년 하반기 채용 일정 안내",
        content: "2024년 하반기 공개채용 일정을 안내드립니다.\n\n접수기간: 10월 1일 ~ 10월 31일\n서류발표: 11월 10일\n면접: 11월 15일 ~ 25일\n최종발표: 12월 1일",
        category: "recruit",
        author: "인사팀",
        important: true,
        views: 1523,
        createdAt: "2024-09-25",
      },
      {
        title: "시스템 정기점검 안내",
        content: "매월 첫째 주 일요일 02:00 ~ 06:00 시스템 정기점검이 진행됩니다.",
        category: "system",
        author: "시스템관리팀",
        important: false,
        views: 342,
        createdAt: "2024-09-20",
      },
      {
        title: "신입사원 필수 교육과정 안내",
        content: "2024년 신입사원 필수 교육과정 일정을 안내드립니다.\n\n1. 온보딩 교육: 입사 후 1주\n2. 직무 교육: 입사 후 1개월\n3. 멘토링: 입사 후 3개월",
        category: "education",
        author: "교육팀",
        important: true,
        views: 856,
        createdAt: "2024-09-15",
      },
    ];

    sampleNotices.forEach((notice) => {
      const id = randomUUID();
      this.notices.set(id, { ...notice, id } as Notice);
    });

    const sampleCourses: InsertCourse[] = [
      {
        title: "AI 기초 과정",
        category: "기술",
        instructor: "김철수 교수",
        duration: "40시간",
        level: "초급",
        description: "AI와 머신러닝의 기초 개념을 학습합니다.",
        enrollments: 156,
        rating: 45,
        status: "active",
        createdAt: "2024-01-01",
      },
      {
        title: "데이터 분석 실무",
        category: "기술",
        instructor: "이영희 박사",
        duration: "60시간",
        level: "중급",
        description: "Python과 SQL을 활용한 데이터 분석 실무를 다룹니다.",
        enrollments: 234,
        rating: 48,
        status: "active",
        createdAt: "2024-02-01",
      },
      {
        title: "리더십 역량 강화",
        category: "경영",
        instructor: "박민수 팀장",
        duration: "24시간",
        level: "고급",
        description: "팀 리더를 위한 리더십 역량 강화 과정입니다.",
        enrollments: 89,
        rating: 47,
        status: "active",
        createdAt: "2024-03-01",
      },
    ];

    sampleCourses.forEach((course) => {
      const id = randomUUID();
      this.courses.set(id, { ...course, id } as Course);
    });

    const sampleFAQs: InsertFAQ[] = [
      { question: "지원서 수정이 가능한가요?", answer: "접수 마감 전까지 지원서 수정이 가능합니다. 마이페이지에서 수정할 수 있습니다.", category: "채용", order: 1 },
      { question: "면접 일정 변경이 가능한가요?", answer: "면접 일정 변경은 채용담당자에게 연락 주시면 가능 여부를 안내드립니다.", category: "채용", order: 2 },
      { question: "수강신청은 어떻게 하나요?", answer: "교육/개발 메뉴의 수강신청 페이지에서 원하는 과정을 선택하여 신청할 수 있습니다.", category: "교육", order: 1 },
      { question: "수료증 발급은 어떻게 받나요?", answer: "교육 이수 후 마이페이지 > 수료증 발급 메뉴에서 다운로드 가능합니다.", category: "교육", order: 2 },
    ];

    sampleFAQs.forEach((faq) => {
      const id = randomUUID();
      this.faqs.set(id, { ...faq, id } as FAQ);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id,
      email: insertUser.email,
      password: insertUser.password,
      name: insertUser.name,
      phone: insertUser.phone ?? null,
      department: insertUser.department ?? null,
      position: insertUser.position ?? null,
      level: insertUser.level ?? null,
      role: insertUser.role ?? null,
      status: insertUser.status ?? null,
      createdAt: insertUser.createdAt ?? null,
    };
    this.users.set(id, user);
    return user;
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(j => j.status === "active");
  }

  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(job: InsertJob): Promise<Job> {
    const id = randomUUID();
    const newJob: Job = { ...job, id } as Job;
    this.jobs.set(id, newJob);
    return newJob;
  }

  async updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined> {
    const existing = this.jobs.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...job };
    this.jobs.set(id, updated);
    return updated;
  }

  async deleteJob(id: string): Promise<boolean> {
    return this.jobs.delete(id);
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const newApp: Application = { ...application, id } as Application;
    this.applications.set(id, newApp);
    return newApp;
  }

  async updateApplication(id: string, application: Partial<InsertApplication>): Promise<Application | undefined> {
    const existing = this.applications.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...application };
    this.applications.set(id, updated);
    return updated;
  }

  async deleteApplication(id: string): Promise<boolean> {
    return this.applications.delete(id);
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getNotices(): Promise<Notice[]> {
    return Array.from(this.notices.values()).sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
    });
  }

  async getNotice(id: string): Promise<Notice | undefined> {
    return this.notices.get(id);
  }

  async createNotice(notice: InsertNotice): Promise<Notice> {
    const id = randomUUID();
    const newNotice: Notice = { ...notice, id } as Notice;
    this.notices.set(id, newNotice);
    return newNotice;
  }

  async updateNotice(id: string, notice: Partial<InsertNotice>): Promise<Notice | undefined> {
    const existing = this.notices.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...notice };
    this.notices.set(id, updated);
    return updated;
  }

  async deleteNotice(id: string): Promise<boolean> {
    return this.notices.delete(id);
  }

  async getFAQs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const newInquiry: Inquiry = { 
      ...inquiry, 
      id,
      createdAt: new Date().toISOString().split('T')[0]
    } as Inquiry;
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }

  async updateInquiry(id: string, inquiry: Partial<InsertInquiry>): Promise<Inquiry | undefined> {
    const existing = this.inquiries.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...inquiry };
    this.inquiries.set(id, updated);
    return updated;
  }

  async deleteInquiry(id: string): Promise<boolean> {
    return this.inquiries.delete(id);
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async getResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values()).sort((a, b) => 
      new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
    );
  }

  async getResume(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const id = randomUUID();
    const newResume: Resume = { 
      ...resume, 
      id,
      createdAt: new Date().toISOString().split('T')[0]
    } as Resume;
    this.resumes.set(id, newResume);
    return newResume;
  }

  async updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume | undefined> {
    const existing = this.resumes.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...resume };
    this.resumes.set(id, updated);
    return updated;
  }

  async deleteResume(id: string): Promise<boolean> {
    return this.resumes.delete(id);
  }

  async getAnalyticsData(type?: string): Promise<AnalyticsData[]> {
    const data = Array.from(this.analyticsData.values());
    if (type) {
      return data.filter(d => d.type === type);
    }
    return data;
  }

  async getLatestAnalyticsData(type: string): Promise<AnalyticsData | undefined> {
    const data = Array.from(this.analyticsData.values())
      .filter(d => d.type === type)
      .sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
    return data[0];
  }

  async createAnalyticsData(data: InsertAnalyticsData): Promise<AnalyticsData> {
    const id = randomUUID();
    const newData: AnalyticsData = { 
      ...data, 
      id,
      createdAt: new Date().toISOString()
    } as AnalyticsData;
    this.analyticsData.set(id, newData);
    return newData;
  }

  async deleteAnalyticsData(id: string): Promise<boolean> {
    return this.analyticsData.delete(id);
  }
}

export const storage = new MemStorage();
