import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BellRing,
  LocateFixed,
  MapPinned,
  Navigation2,
  Route as RouteIcon,
  Smartphone,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeroMapContainer from "@/components/maps/HeroMapContainer";
import { useLanguage } from "@/contexts/LanguageContext";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const featureItems = [
  {
    title: "Real-Time Tracking",
    description: "See live bus locations with second-by-second updates across every depot.",
    icon: Navigation2,
  },
  {
    title: "Live Passenger Count",
    description: "Know the crowd levels inside every bus so you can plan a comfortable ride.",
    icon: UsersRound,
  },
  {
    title: "Comprehensive Route Info",
    description: "Explore stop-wise timings, interchanges, and smart route suggestions.",
    icon: MapPinned,
  },
  {
    title: "Smart Alerts",
    description: "Stay ahead with intelligent alerts for delays, diversions, and crowded buses.",
    icon: BellRing,
  },
];

const routeHighlights = [
  { id: "102", label: "Bus #102", eta: "3 min" },
  { id: "24A", label: "Route 24A", eta: "6 min" },
  { id: "Metro Link", label: "Metro Link Shuttle", eta: "12 min" },
  { id: "Airport", label: "Airport Express", eta: "18 min" },
];

const testimonials = [
  {
    name: "Ananya Patel",
    role: "Student, Mumbai",
    quote:
      "Saral Yatra is my pocket navigator. I never miss classes because I know exactly when my next bus arrives.",
  },
  {
    name: "Rajat Mehra",
    role: "Product Manager, Pune",
    quote:
      "Passenger count insights are a game changer. I skip crowded buses and reach the office stress-free every day.",
  },
  {
    name: "Sunita Rao",
    role: "Teacher, Nashik",
    quote:
      "Smart alerts keep me informed during monsoon delays. Saral Yatra truly understands commuters.",
  },
];

const impactMetrics = [
  { label: "+10K daily users", description: "Commuters planning seamless rides" },
  { label: "50+ cities covered", description: "Expanding across India" },
  { label: "98% live accuracy", description: "Powered by IoT beacons" },
];

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Index = () => {
  const [mapMode, setMapMode] = useState<"day" | "night">("night");
  const { t } = useLanguage();

  return (
    <div className="space-y-24 pb-24">
      <section className="relative isolate overflow-hidden pt-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,33,40,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(11,13,17,0.25),transparent_65%)]" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-10 space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
              Reliable · Real-Time · Ready
            </span>
            <div className="space-y-6">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {t("heroTitle")} <span className="text-primary">Saral Yatra</span>
              </h1>
              <p className="max-w-xl text-lg text-foreground/80">
                “Suffer nahi, Yatra kariye!” Experience intelligent public transport with live bus positions, occupancy insights, and personalized commute alerts.
              </p>
            </div>
            <form className="w-full max-w-xl rounded-[28px] border border-border/80 bg-white/80 p-2.5 shadow-soft-card backdrop-blur">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex flex-1 items-center gap-3 rounded-[22px] bg-white/90 px-4 py-3 shadow-[0_10px_30px_-18px_rgba(8,12,24,0.35)]">
                  <LocateFixed className="h-5 w-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Search by bus number or route"
                    className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/40 focus:outline-none"
                    aria-label="Search bus number or route"
                  />
                </div>
                <Button className="h-12 rounded-[22px] bg-gradient-to-br from-primary to-[#ff4d4f] px-6 text-sm font-semibold uppercase tracking-wide shadow-floating">
                  Search
                </Button>
              </div>
            </form>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="rounded-full border-0 bg-gradient-to-br from-primary to-[#ff4d4f] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide shadow-floating"
                >
                  <Link to="/live-tracking">{t("liveTrackingFeature")}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border border-primary/40 bg-transparent px-6 py-2.5 text-sm font-semibold text-primary shadow-[0_14px_32px_-24px_rgba(216,33,40,0.55)] transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Link to="/route-info">{t("viewNearbyStopsBtn")}</Link>
                </Button>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-primary/30 blur"></span>
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    10K+
                  </span>
                </div>
                Trusted daily by commuters across 50+ cities
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { label: "Average wait", value: "4 mins" },
                { label: "Crowd comfort", value: "82% buses" },
                { label: "Alerts triggered", value: "1.2M" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-border/70 bg-white/75 p-4 shadow-[0_16px_40px_-24px_rgba(8,12,24,0.55)] backdrop-blur"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-6 top-6 hidden h-24 w-24 rounded-3xl border border-white/20 bg-white/10 blur-2xl md:block" />
            <div className="relative rounded-[36px] border border-white/20 bg-[#0b0d11] p-6 text-white shadow-[0_40px_70px_-40px_rgba(8,12,24,0.8)]">
              <div className="text-sm font-medium uppercase tracking-[0.35em] text-white/50">
                Jaipur Central Depot
              </div>
              <p className="mt-1 text-2xl font-semibold">Live Map Overview</p>
              <HeroMapContainer className="aspect-[4/5] w-full rounded-[28px] border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
              {t("platformCapabilities")}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("smarterCommutes")}
            </h2>
            <p className="max-w-2xl text-base text-foreground/70">
              {t("platformDescription")}
            </p>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Discover the platform story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featureItems.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[28px] border border-border/80 bg-white/85 p-6 shadow-[0_30px_60px_-36px_rgba(8,12,24,0.7)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-floating"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="relative mt-6 text-xl font-semibold text-foreground">{title}</h3>
              <p className="relative mt-3 text-sm text-foreground/70">{description}</p>
              <div className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(216,33,40,0.12),transparent_65%)]" />
        <div className="container relative grid gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
              Interactive Map Preview
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Visualise your route before you step out
            </h2>
            <p className="max-w-xl text-base text-foreground/70">
              Toggle between day and night modes, watch buses glide in motion, and view accurate arrival predictions tailored to your favourite stops.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {routeHighlights.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary"
                >
                  <RouteIcon className="h-4 w-4" />
                  {route.label}
                  <span className="text-primary/70">· {route.eta}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {(["day", "night"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setMapMode(mode)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition-all",
                    mapMode === mode
                      ? "border-transparent bg-gradient-to-br from-primary to-[#ff4d4f] text-white shadow-floating"
                      : "border-border/80 bg-white/70 text-foreground/70 hover:text-foreground",
                  )}
                >
                  {mode === "day" ? "Light Map" : "Dark Map"}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div
              className={cn(
                "relative overflow-hidden rounded-[36px] border p-1 shadow-soft-card transition-all",
                mapMode === "night"
                  ? "border-white/15 bg-[#0b0d11]"
                  : "border-border/60 bg-white",
              )}
            >
              <div
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-[32px] border",
                  mapMode === "night"
                    ? "border-white/15 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.12),rgba(11,13,23,1))]"
                    : "border-border/50 bg-[radial-gradient(circle_at_35%_25%,rgba(216,33,40,0.08),rgba(255,255,255,0.96))]",
                )}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "46px 46px",
                  }}
                />
                <div className="absolute inset-0">
                  <span className="absolute left-[18%] top-[22%] h-px w-[64%] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                  <span className="absolute left-[22%] top-[28%] h-[62%] w-px bg-gradient-to-b from-transparent via-white/80 to-transparent" />
                  <span className="absolute left-[32%] top-[55%] h-[35%] w-px rotate-12 bg-gradient-to-b from-transparent via-white/65 to-transparent" />
                  <span className="absolute left-[12%] top-[48%] h-px w-[58%] rotate-[22deg] bg-gradient-to-r from-transparent via-white/65 to-transparent" />
                  <span className="absolute left-[45%] top-[18%] h-[40%] w-px rotate-[-18deg] bg-gradient-to-b from-transparent via-white/65 to-transparent" />
                </div>
                <div className="animate-bus-one absolute left-[10%] top-[58%] flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-1 text-xs font-semibold text-[#0b0d11]">
                  <Smartphone className="h-4 w-4 text-primary" />
                  Bus #102
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">3 min</span>
                </div>
                <div className="animate-bus-two absolute left-[46%] top-[38%] flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-1 text-xs font-semibold text-[#0b0d11]">
                  <Activity className="h-4 w-4 text-[#ff6f3d]" />
                  Route 24A
                  <span className="rounded-full bg-[#ff6f3d]/15 px-2 py-0.5 text-[10px] font-semibold text-[#ff6f3d]">
                    6 min
                  </span>
                </div>
                <div className="animate-bus-three absolute left-[58%] top-[70%] flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-1 text-xs font-semibold text-[#0b0d11]">
                  <BellRing className="h-4 w-4 text-[#00c6b1]" />
                  Smart Alert
                  <span className="rounded-full bg-[#00c6b1]/15 px-2 py-0.5 text-[10px] font-semibold text-[#00c6b1]">
                    Low crowd
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
              {t("commuterStories")}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("transformingTravel")}
            </h2>
            <p className="max-w-xl text-base text-foreground/70">
              Our intelligent platform powers smart decisions for students, office-goers, and families who depend on public transport every day.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[28px] border border-primary/20 bg-primary/5 p-5 text-primary"
                >
                  <p className="text-2xl font-semibold">{metric.label}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="relative overflow-hidden rounded-[28px] border border-border/80 bg-white/85 p-6 shadow-[0_28px_60px_-36px_rgba(8,12,24,0.6)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-sm font-semibold text-primary">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
                <p className="relative mt-5 text-sm text-foreground/80">“{testimonial.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="relative overflow-hidden rounded-[40px] border border-primary/20 bg-gradient-to-r from-primary to-[#ff4d4f] px-8 py-16 text-white shadow-[0_42px_80px_-38px_rgba(216,33,40,0.55)] sm:px-12 md:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-white/80">
                Ready to ride smarter?
              </span>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("smarterToday")}
              </h2>
              <p className="max-w-2xl text-sm text-white/75">
                {t("downloadApp")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-full border-0 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary shadow-[0_28px_60px_-30px_rgba(255,255,255,0.8)]"
              >
                <Link to="/download">{t("downloadAppBtn")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white hover:text-primary"
              >
                <Link to="/live-tracking">{t("startTracking")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
