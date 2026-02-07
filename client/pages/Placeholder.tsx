import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

const PlaceholderPage = ({
  title,
  description,
  actionLabel = "Go to Home",
  actionHref = "/",
}: PlaceholderPageProps) => {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,33,40,0.18),transparent_65%)]" />
      <div className="container relative flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <span className="rounded-full border border-primary/40 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          Coming Soon
        </span>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg">
          {description}
        </p>
        <Button
          asChild
          className="rounded-full border-0 bg-gradient-to-br from-primary to-[#ff4d4f] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-floating"
        >
          <Link to={actionHref}>{actionLabel}</Link>
        </Button>
      </div>
    </section>
  );
};

export default PlaceholderPage;
