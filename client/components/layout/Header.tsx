import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Globe2, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
];

export const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t("home"), to: "/" },
    { label: t("liveTracking"), to: "/live-tracking" },
    { label: t("routeInfo"), to: "/route-info" },
    { label: t("contact"), to: "/contact" },
    { label: t("about"), to: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-white/85 shadow-soft-card border-b border-border/70 dark:bg-black/75"
          : "backdrop-blur-lg bg-white/70 dark:bg-black/60",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:h-20 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo-removebg-preview.png" 
            alt="Saral Yatra Logo" 
            className="h-60 w-60 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white/60 px-3 py-1.5 text-sm font-medium text-foreground shadow-[0_12px_28px_-16px_rgba(15,35,75,0.35)] backdrop-blur">
            <Globe2 className="h-4 w-4 text-foreground/70" />
            <select
              className="bg-transparent text-sm font-medium text-foreground focus:outline-none"
              value={language}
              onChange={(event) => setLanguage(event.target.value as any)}
              aria-label="Select language"
            >
              {languages.map((option) => (
                <option key={option.value} value={option.value} className="text-foreground">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            asChild
            className="rounded-full border-0 bg-gradient-to-br from-primary to-[#ff4d4f] px-6 py-2 text-sm font-semibold shadow-floating transition-transform duration-200 hover:translate-y-[-1px] hover:shadow-[0_18px_38px_-18px_rgba(59,130,246,0.55)]"
          >
            <Link to="/login">{t("loginSignup")}</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-white/70 text-foreground shadow-[0_12px_32px_-16px_rgba(8,12,24,0.5)] transition-colors duration-200 hover:border-transparent hover:bg-primary hover:text-primary-foreground lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 transition-all duration-300",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-4 pt-2 pb-6">
          <div className="rounded-3xl border border-border/70 bg-white/95 p-6 shadow-soft-card backdrop-blur">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "text-base font-medium",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-border/70 bg-secondary/60 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Globe2 className="h-4 w-4 text-foreground/70" />
                <span>Language</span>
              </div>
              <select
                className="bg-transparent text-sm font-medium text-foreground focus:outline-none"
                value={language}
                onChange={(event) => setLanguage(event.target.value as any)}
                aria-label="Select language"
              >
                {languages.map((option) => (
                  <option key={option.value} value={option.value} className="text-foreground">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              asChild
              className="mt-6 w-full rounded-full border-0 bg-gradient-to-br from-primary to-[#ff4d4f] px-6 py-2 text-base font-semibold shadow-floating"
            >
              <Link to="/login">{t("loginSignup")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
