import { pgTable, text, integer, boolean, timestamp, serial, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  department: text("department"),
  position: text("position"),
  level: integer("level").default(1),
  role: text("role").default("user"),
  status: text("status").default("active"),
  createdAt: text("created_at"),
});

export const jobs = pgTable("jobs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  department: text("department"),
  location: text("location"),
  employmentType: text("employment_type"),
  experience: text("experience"),
  education: text("education"),
  salary: text("salary"),
  description: text("description"),
  requirements: text("requirements"),
  benefits: text("benefits"),
  deadline: text("deadline"),
  status: text("status").default("active"),
  views: integer("views").default(0),
  applicants: integer("applicants").default(0),
  createdAt: text("created_at"),
});

export const applications = pgTable("applications", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull(),
  userId: text("user_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  resumeUrl: text("resume_url"),
  coverLetter: text("cover_letter"),
  status: text("status").default("pending"),
  aiScore: integer("ai_score"),
  stage: text("stage").default("document"),
  notes: text("notes"),
  createdAt: text("created_at"),
});

export const courses = pgTable("courses", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category"),
  instructor: text("instructor"),
  duration: text("duration"),
  level: text("level"),
  description: text("description"),
  thumbnail: text("thumbnail"),
  price: integer("price").default(0),
  enrollments: integer("enrollments").default(0),
  rating: integer("rating").default(0),
  status: text("status").default("active"),
  createdAt: text("created_at"),
});

export const notices = pgTable("notices", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").default("general"),
  author: text("author"),
  important: boolean("important").default(false),
  views: integer("views").default(0),
  createdAt: text("created_at"),
});

export const faqs = pgTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"),
  order: integer("order").default(0),
});

export const inquiries = pgTable("inquiries", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  category: text("category"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  status: text("status").default("pending"),
  response: text("response"),
  respondedAt: text("responded_at"),
  respondedBy: text("responded_by"),
  pin: text("pin"),
  createdAt: text("created_at"),
});

export const resumes = pgTable("resumes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  position: text("position").notNull(),
  experience: text("experience"),
  education: text("education"),
  skills: text("skills"),
  introduction: text("introduction"),
  fileName: text("file_name"),
  fileUrl: text("file_url"),
  pin: text("pin").notNull(),
  status: text("status").default("pending"),
  createdAt: text("created_at"),
});

export const analyticsData = pgTable("analytics_data", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  fileName: text("file_name").notNull(),
  data: json("data"),
  uploadedBy: text("uploaded_by"),
  createdAt: text("created_at"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export const insertUserSchema = createInsertSchema(users).omit({ id: true });

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export const insertJobSchema = createInsertSchema(jobs).omit({ id: true });

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export const insertApplicationSchema = createInsertSchema(applications).omit({ id: true });

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true });

export type Notice = typeof notices.$inferSelect;
export type InsertNotice = z.infer<typeof insertNoticeSchema>;
export const insertNoticeSchema = createInsertSchema(notices).omit({ id: true });

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = z.infer<typeof insertFAQSchema>;
export const insertFAQSchema = createInsertSchema(faqs).omit({ id: true });

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true });

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export const insertResumeSchema = createInsertSchema(resumes).omit({ id: true });

export type AnalyticsData = typeof analyticsData.$inferSelect;
export type InsertAnalyticsData = z.infer<typeof insertAnalyticsDataSchema>;
export const insertAnalyticsDataSchema = createInsertSchema(analyticsData).omit({ id: true });

export const jobCategories = [
  { id: "it", name: "IT/개발" },
  { id: "data", name: "데이터분석" },
  { id: "hr", name: "HR" },
  { id: "finance", name: "재무/회계" },
  { id: "marketing", name: "마케팅" },
  { id: "sales", name: "영업" },
];

export const applicationStages = [
  { id: "document", name: "서류전형", color: "blue" },
  { id: "first-interview", name: "1차면접", color: "green" },
  { id: "second-interview", name: "2차면접", color: "purple" },
  { id: "final", name: "최종합격", color: "yellow" },
  { id: "rejected", name: "불합격", color: "red" },
];

export const noticeCategories = [
  { id: "system", name: "시스템" },
  { id: "recruit", name: "채용" },
  { id: "education", name: "교육" },
  { id: "hr", name: "HR" },
  { id: "general", name: "기타" },
];
