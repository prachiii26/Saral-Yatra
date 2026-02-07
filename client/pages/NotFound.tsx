import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,33,40,0.18),transparent_65%)]" />
      <div className="container relative flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <span className="rounded-full border border-primary/40 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          404 Error
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Lost in transit?
        </h1>
        <p className="max-w-2xl text-base text-foreground/70 sm:text-lg">
          We couldn’t find the stop you were looking for. Let’s guide you back to the main hub and keep your journey on track.
        </p>
        <Button
          asChild
          className="rounded-full border-0 bg-gradient-to-br from-primary to-[#ff4d4f] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-floating"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
