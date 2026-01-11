import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, User, LogOut, Bell, Briefcase, BarChart3, Users, GraduationCap, FileText, HelpCircle, Settings, LayoutDashboard, Upload, Mail, TrendingUp, BookOpen, Star, Gift, Building2, ClipboardList, Clock, UserCheck, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  name: string;
  href: string;
  icon: any;
}

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  hasDropdown: boolean;
  items?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { 
    name: "채용", 
    href: "/recruit",
    icon: Briefcase,
    hasDropdown: true,
    items: [
      { name: "직무소개", href: "/recruit/positions", icon: UserCheck },
      { name: "채용 프로세스", href: "/recruit/process", icon: ClipboardList },
      { name: "채용공고", href: "/recruit/jobs", icon: Briefcase },
      { name: "진행중인 채용", href: "/recruit/ongoing", icon: Clock },
      { name: "채용 FAQ", href: "/recruit/faq", icon: HelpCircle },
      { name: "이력서 업로드", href: "/recruit/resume", icon: Upload },
      { name: "지원자 관리", href: "/recruit/applicants", icon: Users },
      { name: "이메일 관리", href: "/recruit/email", icon: Mail },
      { name: "통계 분석", href: "/recruit/analytics", icon: TrendingUp },
    ],
  },
  { 
    name: "HR 분석", 
    href: "/analytics",
    icon: BarChart3,
    hasDropdown: true,
    items: [
      { name: "대시보드", href: "/analytics/dashboard", icon: LayoutDashboard },
      { name: "채용 분석", href: "/analytics/recruit", icon: TrendingUp },
      { name: "인력 현황", href: "/analytics/workforce", icon: Users },
    ],
  },
  { 
    name: "인사제도", 
    href: "/hr",
    icon: Users,
    hasDropdown: true,
    items: [
      { name: "HR 종합 가이드", href: "/hr/guide", icon: BookOpen },
      { name: "임원인사", href: "/hr/executive", icon: UserCheck },
      { name: "평가제도", href: "/hr/evaluation", icon: Star },
      { name: "승진제도", href: "/hr/promotion", icon: TrendingUp },
      { name: "복리후생", href: "/hr/benefits", icon: Gift },
      { name: "조직문화", href: "/hr/culture", icon: Building2 },
    ],
  },
  { 
    name: "교육/개발", 
    href: "/education",
    icon: GraduationCap,
    hasDropdown: true,
    items: [
      { name: "교육과정 안내", href: "/education/courses", icon: BookOpen },
      { name: "수강신청", href: "/education/enroll", icon: ClipboardList },
      { name: "나의 학습이력", href: "/education/history", icon: FileText },
      { name: "교육자료실", href: "/education/materials", icon: FolderOpen },
      { name: "수료증 발급", href: "/education/certificate", icon: FileText },
    ],
  },
  { 
    name: "공지사항", 
    href: "/notices",
    icon: Bell,
    hasDropdown: false,
  },
  { 
    name: "고객지원", 
    href: "/support",
    icon: HelpCircle,
    hasDropdown: true,
    items: [
      { name: "FAQ", href: "/support/faq", icon: HelpCircle },
      { name: "1:1 문의", href: "/support/inquiry", icon: Mail },
      { name: "자료실", href: "/support/archive", icon: FolderOpen },
    ],
  },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setExpandedMenu(null);
  }, [location]);

  const toggleMenu = (name: string) => {
    setExpandedMenu(expandedMenu === name ? null : name);
  };

  const activeSubmenu = menuItems.find(m => m.name === expandedMenu);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300",
        isScrolled && "shadow-lg"
      )}
      data-testid="header"
    >
      <div className="border-b">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" data-testid="link-logo">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052A5] to-[#003d7a] flex items-center justify-center shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-[#0052A5] to-[#003d7a] bg-clip-text text-transparent">HR 통합포털</span>
                <p className="text-[10px] text-muted-foreground -mt-1">JSH Human Resources</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2",
                        expandedMenu === item.name
                          ? "border-[#0052A5] text-[#0052A5] bg-[#0052A5]/5"
                          : "border-transparent text-foreground/80 hover:text-[#0052A5] hover:border-[#0052A5]/50"
                      )}
                      aria-expanded={expandedMenu === item.name}
                      data-testid={`nav-${item.name}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        expandedMenu === item.name && "rotate-180"
                      )} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2",
                        location === item.href || location.startsWith(item.href + "/")
                          ? "border-[#0052A5] text-[#0052A5] bg-[#0052A5]/5"
                          : "border-transparent text-foreground/80 hover:text-[#0052A5] hover:border-[#0052A5]/50"
                      )}
                      data-testid={`nav-${item.name}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              
              {user ? (
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="gap-2 border-[#0052A5] text-[#0052A5] hover:bg-[#0052A5] hover:text-white" data-testid="link-admin">
                        <Settings className="h-4 w-4" />
                        관리자
                      </Button>
                    </Link>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0052A5] to-[#003d7a] text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} data-testid="button-logout">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="gap-2 bg-[#0052A5] hover:bg-[#003d7a]" data-testid="link-login">
                    <User className="h-4 w-4" />
                    로그인
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 rounded-lg hover:bg-muted"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={cn(
          "hidden lg:block overflow-hidden transition-all duration-300 ease-in-out border-b bg-muted/50",
          expandedMenu && activeSubmenu?.items ? "max-h-24 opacity-100" : "max-h-0 opacity-0 border-b-0"
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {activeSubmenu?.items?.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors",
                  location === subItem.href
                    ? "bg-[#FF6B35] text-white"
                    : "hover:bg-background text-foreground/80 hover:text-foreground border border-transparent hover:border-border"
                )}
                onClick={() => setExpandedMenu(null)}
                data-testid={`subnav-${subItem.name}`}
              >
                <subItem.icon className={cn(
                  "h-4 w-4",
                  location === subItem.href ? "text-white" : "text-[#0052A5]"
                )} />
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        expandedMenu === item.name ? "bg-[#0052A5]/10 text-[#0052A5]" : "hover:bg-muted"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-[#0052A5]" />
                        {item.name}
                      </span>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        expandedMenu === item.name && "rotate-180"
                      )} />
                    </button>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      expandedMenu === item.name ? "max-h-96" : "max-h-0"
                    )}>
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#0052A5]/20 pl-4">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors",
                              location === subItem.href
                                ? "bg-[#FF6B35] text-white"
                                : "hover:bg-muted"
                            )}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setExpandedMenu(null);
                            }}
                          >
                            <subItem.icon className={cn(
                              "h-4 w-4",
                              location === subItem.href ? "text-white" : "text-[#0052A5]"
                            )} />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      location === item.href
                        ? "bg-[#0052A5] text-white"
                        : "hover:bg-muted"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      location === item.href ? "text-white" : "text-[#0052A5]"
                    )} />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t mt-4">
              {user ? (
                <div className="space-y-2">
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full gap-2 border-[#0052A5] text-[#0052A5]">
                        <Settings className="h-4 w-4" />
                        관리자 페이지
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full gap-2" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full gap-2 bg-[#0052A5] hover:bg-[#003d7a]">
                    <User className="h-4 w-4" />
                    로그인
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function PageHeader({ 
  title, 
  subtitle, 
  breadcrumb,
  tabs 
}: { 
  title: string; 
  subtitle?: string;
  breadcrumb?: string;
  tabs?: { name: string; href: string; active?: boolean }[];
}) {
  const [location] = useLocation();
  
  return (
    <div className="bg-gradient-to-br from-[#0052A5] via-[#003d7a] to-[#002952] text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {breadcrumb && (
          <p className="text-sm text-[#FF6B35] font-medium mb-2 uppercase tracking-wider">{breadcrumb}</p>
        )}
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="text-white/80 text-lg">{subtitle}</p>
        )}
      </div>
      {tabs && tabs.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "px-5 py-3 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap",
                    (tab.active || location === tab.href)
                      ? "bg-[#FF6B35] text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
