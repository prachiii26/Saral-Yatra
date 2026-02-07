import { Outlet } from "react-router-dom";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const MainLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(8,12,24,0.17),transparent_70%)]" />
      <Header />
      <main className="relative z-10 flex-1 pt-24 md:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
