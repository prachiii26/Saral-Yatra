import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="container space-y-16 py-16 pt-20">
      <div className="text-center space-y-4">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
          Get in Touch
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
{t("contact")} Saral Yatra
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-foreground/70">
          Have questions about our bus tracking service? Need support? We're here to help make your commute smoother.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-border/70 bg-white/80 p-8 shadow-soft-card">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-primary" />
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="bug">Report a Bug</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-white/80 p-6 text-center shadow-soft-card">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-3">Mon-Sat, 8AM-8PM IST</p>
              <a href="tel:+919876543210" className="text-primary font-semibold hover:text-primary/80">
                +91 98765 43210
              </a>
            </div>

            <div className="rounded-2xl border border-border/70 bg-white/80 p-6 text-center shadow-soft-card">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-3">24/7 Response</p>
              <a href="mailto:support@saralyatra.app" className="text-primary font-semibold hover:text-primary/80">
                support@saralyatra.app
              </a>
            </div>

            <div className="rounded-2xl border border-border/70 bg-white/80 p-6 text-center shadow-soft-card">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-3">Instant Help</p>
              <button className="text-primary font-semibold hover:text-primary/80">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border/70 bg-white/80 p-6 shadow-soft-card">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              Our Office
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Headquarters</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Tech Hub, Sector 18<br />
                  Gurugram, Haryana 122015<br />
                  India
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Office Hours
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-white/80 p-6 shadow-soft-card">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="/faq" className="block text-gray-600 hover:text-primary transition-colors">
                Frequently Asked Questions
              </a>
              <a href="/help" className="block text-gray-600 hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="/status" className="block text-gray-600 hover:text-primary transition-colors">
                Service Status
              </a>
              <a href="/feedback" className="block text-gray-600 hover:text-primary transition-colors">
                Submit Feedback
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary to-blue-600 p-6 text-white shadow-soft-card">
            <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
            <p className="text-white/90 text-sm mb-4">
              For urgent issues or real-time support, reach out to us directly.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Emergency Hotline
              </a>
              <a 
                href="mailto:urgent@saralyatra.app" 
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Priority Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}