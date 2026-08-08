import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Users, Zap, ShieldCheck } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Sold" },
  { value: "200+", label: "Verified Sellers" },
  { value: "24/7", label: "Customer Support" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To make genuine, next-gen electronics accessible to everyone — without compromise on quality or trust.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Quality",
    desc: "Every seller is vetted and every product checked for authenticity before it reaches our catalog.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "From browsing to delivery to support — every decision we make starts with the customer experience.",
  },
  {
    icon: Zap,
    title: "Always Innovating",
    desc: "We're constantly improving the platform so shopping for tech feels effortless and exciting.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            Our Story
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-6">
            Building the store{" "}
            <span className="gradient-text">we always wished existed.</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Voltrix started with a simple frustration: buying electronics online
            shouldn't feel like a gamble. So we built a marketplace where every
            product is genuine, every seller is verified, and every order is
            tracked from checkout to doorstep.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            Why we <span className="gradient-text">started</span>
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We noticed the same pattern everywhere — grey-market imports, fake
            reviews, sellers who disappeared after a sale. Voltrix exists to
            flip that experience on its head.
          </p>
          <p className="text-muted leading-relaxed">
            Today, we work with verified sellers across electronics and gadgets,
            backed by real customer reviews, live order tracking, and a support
            team that actually responds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card p-10 overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent-violet/20 blur-[80px] rounded-full" />
          <p className="relative font-display text-xl leading-relaxed text-white">
            "Tech that feels alive — curated for people who don't settle."
          </p>
          <p className="relative text-muted text-sm mt-4">— The Voltrix Team</p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <p className="font-display text-3xl font-semibold gradient-text mb-1">
                {s.value}
              </p>
              <p className="text-muted text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10 text-center"
        >
          What we <span className="gradient-text">stand for</span>
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-lime/10 flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5 text-accent-lime" />
              </div>
              <h3 className="font-display font-semibold mb-2">{v.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-card p-12 text-center overflow-hidden"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-64 bg-accent-violet/20 blur-[100px] rounded-full" />
          <h2 className="relative font-display text-3xl md:text-4xl font-semibold mb-4">
            Ready to explore Voltrix?
          </h2>
          <p className="relative text-muted mb-8 max-w-md mx-auto">
            Browse our full catalog of genuine, next-gen electronics.
          </p>
          <Link to="/products">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="relative"
            >
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
