import { useRole } from "../context/RoleContext";
import type { Role } from "../context/RoleContext";
import { Button } from "./ui/button";
import { Moon, Sun, Bell, UserCircle2, ArrowLeft, Globe, ChevronDown, User, GraduationCap, School, Briefcase, Heart, Landmark } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const { role, setRole, isDark, toggleTheme } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleDetails: { [key in Role]: { label: string; icon: any; color: string } } = {
    Citizen: { label: "Citizen", icon: <User className="w-4 h-4 text-emerald-500" />, color: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5" },
    Student: { label: "Student", icon: <GraduationCap className="w-4 h-4 text-blue-500" />, color: "border-blue-500/30 text-blue-500 bg-blue-500/5" },
    University: { label: "University", icon: <School className="w-4 h-4 text-amber-500" />, color: "border-amber-500/30 text-amber-500 bg-amber-500/5" },
    Industry: { label: "Industry", icon: <Briefcase className="w-4 h-4 text-purple-500" />, color: "border-purple-500/30 text-purple-500 bg-purple-500/5" },
    NGO: { label: "NGO", icon: <Heart className="w-4 h-4 text-rose-500" />, color: "border-rose-500/30 text-rose-500 bg-rose-500/5" },
    Government: { label: "Government", icon: <Landmark className="w-4 h-4 text-cyan-500" />, color: "border-cyan-500/30 text-cyan-500 bg-cyan-500/5" }
  };

  const roles: Role[] = ["Citizen", "Student", "University", "Industry", "NGO", "Government"];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
        
        {location.pathname !== "/" && (
          <Button variant="ghost" size="icon" className="mr-2 shrink-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
              {t('app_title')} <span className="text-primary text-sm bg-primary/10 px-2 py-0.5 rounded-full ml-1">AI</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('home')}</Link>
            <Link to="/problems" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('report_problem')}</Link>
            <Link to="/collaboration" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('collaboration')}</Link>
            <Link to="/impact" className="transition-colors hover:text-foreground/80 text-foreground/60">{t('impact')}</Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          
          <div className="hidden lg:flex items-center mr-2 relative" ref={dropdownRef}>
            <span className="text-xs text-muted-foreground mr-2 font-medium">Role:</span>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition-all hover:bg-secondary/50 outline-none ${roleDetails[role].color}`}
            >
              {roleDetails[role].icon}
              <span>{roleDetails[role].label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg p-1.5 z-50 flex flex-col gap-0.5 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-secondary/60 ${role === r ? 'bg-secondary/90 text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    {roleDetails[r].icon}
                    <span>{roleDetails[r].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} title={t('language')}>
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle2 className="h-6 w-6" />
            </Button>
            <Link to="/report">
              <Button className="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                {t('report_problem')}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
