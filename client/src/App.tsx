import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Notices from "@/pages/Notices";
import Support from "@/pages/Support";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Archive from "@/pages/Archive";
import Privacy from "@/pages/Privacy";
import ComingSoon from "@/pages/ComingSoon";
import ArchiveProtected from "@/pages/ArchiveProtected";

import Dashboard from "@/pages/analytics/Dashboard";
import RecruitAnalytics from "@/pages/analytics/RecruitAnalytics";
import Workforce from "@/pages/analytics/Workforce";

import JobListings from "@/pages/recruit/JobListings";
import OngoingRecruit from "@/pages/recruit/OngoingRecruit";
import Positions from "@/pages/recruit/Positions";
import RecruitProcess from "@/pages/recruit/RecruitProcess";
import RecruitFaq from "@/pages/recruit/RecruitFaq";
import Resume from "@/pages/recruit/Resume";
import Applicants from "@/pages/recruit/Applicants";
import EmailManage from "@/pages/recruit/EmailManage";
import RecruitStats from "@/pages/recruit/RecruitStats";

import HRGuidePage from "@/pages/hr/HRGuide";
import Executive from "@/pages/hr/Executive";
import Evaluation from "@/pages/hr/Evaluation";
import Promotion from "@/pages/hr/Promotion";
import Benefits from "@/pages/hr/Benefits";
import Culture from "@/pages/hr/Culture";

import CoursesCatalog from "@/pages/education/CoursesCatalog";
import Enrollment from "@/pages/education/Enrollment";
import LearningHistory from "@/pages/education/LearningHistory";
import Materials from "@/pages/education/Materials";
import Certificate from "@/pages/education/Certificate";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      <Route path="/analytics" component={Dashboard} />
      <Route path="/analytics/dashboard" component={Dashboard} />
      <Route path="/analytics/recruit" component={RecruitAnalytics} />
      <Route path="/analytics/workforce" component={Workforce} />
      
      <Route path="/recruit" component={JobListings} />
      <Route path="/recruit/jobs" component={JobListings} />
      <Route path="/recruit/ongoing" component={OngoingRecruit} />
      <Route path="/recruit/positions" component={Positions} />
      <Route path="/recruit/process" component={RecruitProcess} />
      <Route path="/recruit/faq" component={RecruitFaq} />
      <Route path="/recruit/resume" component={Resume} />
      <Route path="/recruit/applicants" component={Applicants} />
      <Route path="/recruit/email" component={EmailManage} />
      <Route path="/recruit/analytics" component={RecruitStats} />
      
      <Route path="/hr" component={HRGuidePage} />
      <Route path="/hr/guide" component={HRGuidePage} />
      <Route path="/hr/executive" component={Executive} />
      <Route path="/hr/evaluation" component={Evaluation} />
      <Route path="/hr/promotion" component={Promotion} />
      <Route path="/hr/benefits" component={Benefits} />
      <Route path="/hr/culture" component={Culture} />
      
      <Route path="/education" component={CoursesCatalog} />
      <Route path="/education/courses" component={CoursesCatalog} />
      <Route path="/education/enroll" component={Enrollment} />
      <Route path="/education/history" component={LearningHistory} />
      <Route path="/education/materials" component={Materials} />
      <Route path="/education/certificate" component={Certificate} />
      
      <Route path="/notices" component={Notices} />
      <Route path="/notices/:id" component={Notices} />
      
      <Route path="/support" component={Support} />
      <Route path="/support/faq" component={Support} />
      <Route path="/support/inquiry" component={Support} />
      <Route path="/support/archive" component={ArchiveProtected} />
      
      <Route path="/archive" component={Archive} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={ComingSoon} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <AppLayout>
              <Router />
            </AppLayout>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
