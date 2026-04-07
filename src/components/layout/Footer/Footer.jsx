import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  RefreshCw,
  Truck,
  Headphones,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const navColumns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/products" },
      { label: "New Arrivals", to: "/products?sort=newest" },
      { label: "Best Sellers", to: "/products?sort=popular" },
      { label: "Offers & Bundles", to: "/products?sale=true" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Your Order", to: "/orders" },
      { label: "Return & Refund Policy", to: "/returns" },
      { label: "Delivery Information", to: "/delivery" },
      { label: "Payment Methods", to: "/payment" },
      { label: "FAQs", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Careers", to: "/careers" },
    ],
  },
];

const socialLinks = [
  {
    Icon: Instagram,
    label: "Instagram",
    href: "#",
    color: "hover:text-pink-500",
  },
  {
    Icon: Facebook,
    label: "Facebook",
    href: "#",
    color: "hover:text-blue-500",
  },
  {
    Icon: Twitter,
    label: "X / Twitter",
    href: "#",
    color: "hover:text-sky-400",
  },
  { Icon: Youtube, label: "YouTube", href: "#", color: "hover:text-red-500" },
];

const trustBadges = [
  { Icon: Truck, label: "Free Delivery", sub: "On orders over Rs 2,000" },
  { Icon: RefreshCw, label: "Easy Returns", sub: "7-day hassle-free returns" },
  { Icon: Shield, label: "Secure Payments", sub: "100% encrypted checkout" },
  { Icon: Headphones, label: "24/7 Support", sub: "We're always here for you" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gray-950/90 text-white overflow-hidden">
      {/* ── Atmospheric background orbs ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ══════════════════════════════════════
          TRUST BADGES STRIP
      ══════════════════════════════════════ */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map(({ Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-purple-500/15 group-hover:border-purple-500/30 transition-all duration-300">
                  <Icon size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white/90 leading-tight">
                    {label}
                  </p>
                  <p className="text-[11px] text-white/40 mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN FOOTER BODY
      ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo / Brand */}
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <span className="text-xl font-black tracking-tight font-montserrat">
                  Tipu<span className="text-purple-400"> Mobiles</span>
                </span>
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed max-w-xs mt-3">
                Pakistan's premier destination for curated mobile accessories.
                From flagship cases to fast chargers — crafted for those who
                demand the best.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2.5">
              {[
                { Icon: Phone, text: "+92 300 1234567" },
                { Icon: Mail, text: "support@tipumobiles.com" },
                { Icon: MapPin, text: "Lahore, Punjab, Pakistan" },
              ].map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-[13px] text-white/50 hover:text-white/80 transition-colors group"
                >
                  <Icon size={14} className="text-purple-400 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/30 mb-3">
                Follow Us
              </p>
              <div className="flex gap-2">
                {socialLinks.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 ${color} hover:border-white/20 hover:bg-white/10 transition-all duration-300`}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Nav Columns ── */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map((col, ci) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.4 }}
              >
                <h3 className="text-[11px] font-black uppercase tracking-[0.12em] text-white/30 mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-[13px] text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                          {label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Newsletter Column ── */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.12em] text-white/30 mb-4">
              Stay in the Loop
            </h3>
            <p className="text-[13px] text-white/50 leading-relaxed mb-5">
              Get exclusive deals, new arrivals, and insider offers — straight
              to your inbox.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 rounded-xl px-4 py-3"
              >
                <Sparkles size={14} className="text-purple-400" />
                <p className="text-[13px] text-purple-300 font-semibold">
                  You're on the list! 🎉
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-[13px] font-bold rounded-xl py-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.45)]"
                >
                  <Send size={13} />
                  Subscribe
                </button>
              </form>
            )}

            {/* App badge placeholder */}
            <div className="mt-6 p-3.5 bg-white/4 border border-white/8 rounded-xl">
              <p className="text-[11px] text-white/30 mb-2 uppercase tracking-wider font-bold">
                Payment Methods
              </p>
              <div className="flex flex-wrap gap-2">
                {["JazzCash", "EasyPaisa", "COD", "Bank Transfer"].map((pm) => (
                  <span
                    key={pm}
                    className="px-2.5 py-1 rounded-lg bg-white/8 text-[11px] text-white/60 font-semibold border border-white/8"
                  >
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════ */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} Tipu Mobiles. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] text-white/30 hover:text-white/60 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
