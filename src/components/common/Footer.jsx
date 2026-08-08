import { motion } from "framer-motion";
import { Zap, Mail } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const footerLinks = {
  Shop: [
    { label: "Laptops", to: "/products?category=laptops" },
    { label: "Smartphones", to: "/products?category=smartphones" },
    { label: "Audio", to: "/products?category=headphones" },
    { label: "Accessories", to: "/products?category=accessories" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Careers", to: "/careers" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ],
  Support: [
    { label: "Track Order", to: "/track-order" },
    { label: "Returns", to: "/returns" },
    { label: "FAQs", to: "/faqs" },
    { label: "Warranty", to: "/warranty" },
  ],
};

const socials = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/farhan_ali_062?igsh=MXc2dmNpdWdxcGt4MQ==",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/farhan-ali-59a863373",
  },
  { icon: FaFacebookF, href: "https://www.facebook.com/share/199BM9tLLx/" },
  { icon: Mail, href: "mailto:farhan314567@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-soft mt-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-violet/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-accent-lime" fill="currentColor" />
              <span className="font-display text-xl font-semibold">
                Volt<span className="gradient-text">rix</span>
              </span>
            </Link>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Next-gen electronics, curated for people who expect more from
              their tech.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full glass-card hover:border-accent-lime/50 hover:text-accent-lime transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-4 text-white">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted text-sm hover:text-accent-lime transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Voltrix. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
