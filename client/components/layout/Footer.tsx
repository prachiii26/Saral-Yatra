import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-blue-900 pt-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.35),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.25),transparent_60%)]" />
      <div className="relative container grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Link to="/" className="inline-flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Saral Yatra Logo" 
              className="h-40 w-40 rounded-2xl object-cover"
            />

          </Link>
          <p className="max-w-sm text-sm text-white/70">
            Empowering commuters with reliable live bus tracking, crowd updates, and intelligent alerts so that every journey feels effortless.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
            Quick Links
          </h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link className="transition-colors hover:text-white" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
            Connect
          </h3>
          <div className="mt-5 flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-white transition-all hover:-translate-y-1 hover:border-white/50 hover:bg-white/10"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-5 text-sm text-white/75">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
            Contact
          </h3>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 text-white/60" />
            <a className="hover:text-white" href="mailto:support@saralyatra.app">
              support@saralyatra.app
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 text-white/60" />
            <a className="hover:text-white" href="tel:+919876543210">
              +91 98765 43210
            </a>
          </div>
          <p className="text-xs text-white/50">
            Office Hours: Mon – Sat, 8:00 AM – 8:00 PM IST
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/15">
        <div className="container flex flex-col items-start justify-between gap-4 py-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Saral Yatra. All rights reserved.</p>
          <p className="text-white/40">Designed for seamless, smarter commuting.</p>
        </div>
      </div>
    </footer>
  );
};
