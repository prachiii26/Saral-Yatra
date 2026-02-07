import { CheckCircle2 } from "lucide-react";

export default function About() {
  const bullets = [
    "Real-time bus tracking with rich visuals",
    "Live passenger counts for comfort decisions",
    "Smart alerts for delays and diversions",
    "Route explorer with accurate ETAs",
  ];

  return (
    <section className="container space-y-10">
      <div className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-r from-primary to-[#ff4d4f] p-8 text-white shadow-[0_42px_80px_-38px_rgba(216,33,40,0.55)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_50%)]" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Saral Safar</h1>
        <p className="mt-2 max-w-2xl text-white/80">Transforming Public Transport with Real-Time Data & AI.</p>
        <div className="pt-4">
          <a href="/contact" className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary shadow-[0_28px_60px_-30px_rgba(255,255,255,0.8)]">Join the Smart Mobility Revolution</a>
        </div>
      </div>
      <div className="space-y-3">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
          About Saral Safar
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Smarter public transport for everyone</h1>
        <p className="max-w-3xl text-foreground/70">Saral Safar empowers commuters across India with reliable, privacy-first transport intelligence. We partner with government agencies to bring live data to your fingertips.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-white/80 p-6 shadow-soft-card">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="mt-3 text-foreground/70">Make daily travel stress-free by combining live location signals, predictive models, and human-centered design. We believe public transport should be dependable, comfortable, and transparent.</p>
          <ul className="mt-5 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border/70 bg-white/80 p-6 shadow-soft-card">
          <h2 className="text-xl font-semibold">What’s next</h2>
          <p className="mt-3 text-foreground/70">We’re building deeper integrations with state transport systems, multilingual experiences, and accessibility-first features so every citizen can benefit equally.</p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-primary">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">Coverage</div>
              <div className="mt-2 text-lg font-semibold">50+ cities</div>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-primary">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">Accuracy</div>
              <div className="mt-2 text-lg font-semibold">98% live</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
