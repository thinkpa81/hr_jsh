import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "이메일과 비밀번호를 입력해 주세요." });
      }

      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "이메일 또는 비밀번호가 올바르지 않습니다." });
      }

      (req as any).session.user = { id: user.id, email: user.email, name: user.name, role: user.role };
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ error: "로그인 처리 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "채용공고 목록을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "채용공고를 찾을 수 없습니다." });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "채용공고를 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const job = await storage.createJob(req.body);
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ error: "채용공고 등록 중 오류가 발생했습니다." });
    }
  });

  app.put("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.updateJob(req.params.id, req.body);
      if (!job) {
        return res.status(404).json({ error: "채용공고를 찾을 수 없습니다." });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "채용공고 수정 중 오류가 발생했습니다." });
    }
  });

  app.delete("/api/jobs/:id", async (req, res) => {
    try {
      const success = await storage.deleteJob(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "채용공고를 찾을 수 없습니다." });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "채용공고 삭제 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "지원서 목록을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const application = await storage.createApplication(req.body);
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: "지원서 등록 중 오류가 발생했습니다." });
    }
  });

  app.put("/api/applications/:id", async (req, res) => {
    try {
      const application = await storage.updateApplication(req.params.id, req.body);
      if (!application) {
        return res.status(404).json({ error: "지원서를 찾을 수 없습니다." });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "지원서 수정 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "교육과정 목록을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/notices", async (req, res) => {
    try {
      const notices = await storage.getNotices();
      res.json(notices);
    } catch (error) {
      res.status(500).json({ error: "공지사항 목록을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/notices/:id", async (req, res) => {
    try {
      const notice = await storage.getNotice(req.params.id);
      if (!notice) {
        return res.status(404).json({ error: "공지사항을 찾을 수 없습니다." });
      }
      res.json(notice);
    } catch (error) {
      res.status(500).json({ error: "공지사항을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/notices", async (req, res) => {
    try {
      const notice = await storage.createNotice(req.body);
      res.status(201).json(notice);
    } catch (error) {
      res.status(500).json({ error: "공지사항 등록 중 오류가 발생했습니다." });
    }
  });

  app.put("/api/notices/:id", async (req, res) => {
    try {
      const notice = await storage.updateNotice(req.params.id, req.body);
      if (!notice) {
        return res.status(404).json({ error: "공지사항을 찾을 수 없습니다." });
      }
      res.json(notice);
    } catch (error) {
      res.status(500).json({ error: "공지사항 수정 중 오류가 발생했습니다." });
    }
  });

  app.delete("/api/notices/:id", async (req, res) => {
    try {
      const success = await storage.deleteNotice(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "공지사항을 찾을 수 없습니다." });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "공지사항 삭제 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "FAQ 목록을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      const applications = await storage.getApplications();
      res.json({
        activeJobs: jobs.length,
        totalApplicants: applications.length,
        aiAccuracy: 95,
        satisfaction: 87,
        employees: 1200,
      });
    } catch (error) {
      res.status(500).json({ error: "통계를 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/archive/verify", async (req, res) => {
    try {
      const { password } = req.body;
      const correctPassword = process.env.ARCHIVE_PASSWORD || "2001";
      
      if (password === correctPassword) {
        res.json({ 
          success: true, 
          url: process.env.ARCHIVE_URL || "https://drive.google.com/drive/folders/1xr5ErO971Jy0pVM-hRMTHzHIoiXpWgNj?usp=drive_link" 
        });
      } else {
        res.status(401).json({ error: "비밀번호가 올바르지 않습니다." });
      }
    } catch (error) {
      res.status(500).json({ error: "인증 처리 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/analytics/upload", async (req, res) => {
    try {
      const { data, type } = req.body;
      
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({ error: "유효한 데이터가 필요합니다." });
      }
      
      res.json({ 
        success: true, 
        message: `${data.length}개의 레코드가 업로드되었습니다.`,
        recordCount: data.length
      });
    } catch (error) {
      res.status(500).json({ error: "데이터 업로드 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      const sanitized = inquiries.map(({ pin, ...rest }) => rest);
      res.json(sanitized);
    } catch (error) {
      res.status(500).json({ error: "문의 목록을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/inquiries/my", async (req, res) => {
    try {
      const email = req.query.email as string;
      const inquiries = await storage.getInquiries();
      if (email) {
        const myInquiries = inquiries.filter(i => i.email === email).map(({ pin, ...rest }) => rest);
        res.json(myInquiries);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ error: "문의 내역을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiry = await storage.createInquiry(req.body);
      const { pin, ...sanitized } = inquiry;
      res.status(201).json(sanitized);
    } catch (error) {
      res.status(500).json({ error: "문의 등록 중 오류가 발생했습니다." });
    }
  });

  app.put("/api/inquiries/:id", async (req, res) => {
    try {
      const { pin: inputPin } = req.body;
      const existing = await storage.getInquiry(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "문의를 찾을 수 없습니다." });
      }
      const isSessionAdmin = (req as any).session?.user?.role === "admin";
      if (!isSessionAdmin && existing.pin !== inputPin) {
        return res.status(401).json({ error: "PIN이 올바르지 않습니다." });
      }
      const inquiry = await storage.updateInquiry(req.params.id, req.body);
      if (!inquiry) {
        return res.status(404).json({ error: "문의를 찾을 수 없습니다." });
      }
      const { pin, ...sanitized } = inquiry;
      res.json(sanitized);
    } catch (error) {
      res.status(500).json({ error: "문의 수정 중 오류가 발생했습니다." });
    }
  });

  app.delete("/api/inquiries/:id", async (req, res) => {
    try {
      const { pin: inputPin } = req.body || {};
      const existing = await storage.getInquiry(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "문의를 찾을 수 없습니다." });
      }
      const isSessionAdmin = (req as any).session?.user?.role === "admin";
      if (!isSessionAdmin && existing.pin !== inputPin) {
        return res.status(401).json({ error: "PIN이 올바르지 않습니다." });
      }
      await storage.deleteInquiry(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "문의 삭제 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/inquiries/:id/verify-pin", async (req, res) => {
    try {
      const { pin } = req.body;
      const inquiry = await storage.getInquiry(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ error: "문의를 찾을 수 없습니다." });
      }
      if (inquiry.pin !== pin) {
        return res.status(401).json({ error: "PIN이 올바르지 않습니다." });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "PIN 인증 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/inquiries/:id/respond", async (req, res) => {
    try {
      const isSessionAdmin = (req as any).session?.user?.role === "admin";
      if (!isSessionAdmin) {
        return res.status(403).json({ error: "관리자 권한이 필요합니다." });
      }
      const { response, respondedBy } = req.body;
      const inquiry = await storage.updateInquiry(req.params.id, { 
        response, 
        respondedBy,
        respondedAt: new Date().toISOString().split('T')[0],
        status: "answered"
      });
      if (!inquiry) {
        return res.status(404).json({ error: "문의를 찾을 수 없습니다." });
      }
      const { pin, ...sanitized } = inquiry;
      res.json(sanitized);
    } catch (error) {
      res.status(500).json({ error: "답변 등록 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getResumes();
      const sanitizedResumes = resumes.map(({ pin, ...rest }) => rest);
      res.json(sanitizedResumes);
    } catch (error) {
      res.status(500).json({ error: "이력서 목록을 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/resumes/:id", async (req, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ error: "이력서를 찾을 수 없습니다." });
      }
      const { pin, ...sanitized } = resume;
      res.json(sanitized);
    } catch (error) {
      res.status(500).json({ error: "이력서를 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/resumes", upload.single("file"), async (req, res) => {
    try {
      const { name, email, phone, position, experience, education, skills, introduction, pin } = req.body;
      const file = req.file;
      
      const resume = await storage.createResume({
        name,
        email,
        phone,
        position,
        experience: experience || null,
        education: education || null,
        skills: skills || null,
        introduction: introduction || null,
        fileName: file?.originalname || null,
        fileUrl: file ? `/uploads/${file.filename}` : null,
        pin,
        status: "pending",
        createdAt: new Date().toISOString().split('T')[0],
      });
      const { pin: _, ...sanitized } = resume;
      res.status(201).json(sanitized);
    } catch (error) {
      res.status(500).json({ error: "이력서 등록 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/resumes/:id/verify-pin", async (req, res) => {
    try {
      const { pin } = req.body;
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ error: "이력서를 찾을 수 없습니다." });
      }
      if (resume.pin !== pin) {
        return res.status(401).json({ error: "PIN이 올바르지 않습니다." });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "PIN 인증 중 오류가 발생했습니다." });
    }
  });

  app.put("/api/resumes/:id", upload.single("file"), async (req, res) => {
    try {
      const { name, email, phone, position, experience, education, skills, introduction, pin } = req.body;
      const resume = await storage.getResume(req.params.id);
      
      if (!resume) {
        return res.status(404).json({ error: "이력서를 찾을 수 없습니다." });
      }

      const isSessionAdmin = (req as any).session?.user?.role === "admin";
      if (!isSessionAdmin && resume.pin !== pin) {
        return res.status(401).json({ error: "PIN이 올바르지 않습니다." });
      }

      const file = req.file;
      const updated = await storage.updateResume(req.params.id, {
        name,
        email,
        phone,
        position,
        experience: experience || null,
        education: education || null,
        skills: skills || null,
        introduction: introduction || null,
        ...(file && { fileName: file.originalname, fileUrl: `/uploads/${file.filename}` })
      });
      if (updated) {
        const { pin: _, ...sanitized } = updated;
        res.json(sanitized);
      } else {
        res.status(404).json({ error: "업데이트 실패" });
      }
    } catch (error) {
      res.status(500).json({ error: "이력서 수정 중 오류가 발생했습니다." });
    }
  });

  app.delete("/api/resumes/:id", async (req, res) => {
    try {
      const { pin } = req.body;
      const resume = await storage.getResume(req.params.id);
      
      if (!resume) {
        return res.status(404).json({ error: "이력서를 찾을 수 없습니다." });
      }

      const isSessionAdmin = (req as any).session?.user?.role === "admin";
      if (!isSessionAdmin && resume.pin !== pin) {
        return res.status(401).json({ error: "PIN이 올바르지 않습니다." });
      }

      await storage.deleteResume(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "이력서 삭제 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/analytics-data", async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      const data = await storage.getAnalyticsData(type);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "분석 데이터를 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.get("/api/analytics-data/latest/:type", async (req, res) => {
    try {
      const data = await storage.getLatestAnalyticsData(req.params.type);
      res.json(data || null);
    } catch (error) {
      res.status(500).json({ error: "분석 데이터를 불러오는 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/analytics-data", async (req, res) => {
    try {
      const isSessionAdmin = (req as any).session?.user?.role === "admin";
      if (!isSessionAdmin) {
        return res.status(403).json({ error: "관리자 권한이 필요합니다." });
      }
      const { type, fileName, data, uploadedBy } = req.body;
      if (!type || !data) {
        return res.status(400).json({ error: "type과 data가 필요합니다." });
      }
      const analyticsData = await storage.createAnalyticsData({
        type,
        fileName: fileName || null,
        data,
        uploadedBy: uploadedBy || null,
        createdAt: new Date().toISOString(),
      });
      res.status(201).json(analyticsData);
    } catch (error) {
      res.status(500).json({ error: "분석 데이터 저장 중 오류가 발생했습니다." });
    }
  });

  app.use("/uploads", (req, res, next) => {
    res.sendFile(path.join(uploadDir, req.path));
  });

  return httpServer;
}
