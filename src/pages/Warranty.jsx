import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Wrench,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const coverage = [
  {
    icon: ShieldCheck,
    title: "12-Month Coverage",
    desc: "All products include at least a 12-month manufacturer warranty.",
  },
  {
    icon: Wrench,
    title: "Repair or Replace",
    desc: "Faulty items are repaired or replaced at no extra cost.",
  },
  {
    icon: FileText,
    title: "Proof of Purchase",
    desc: "Keep your order number handy — it's all you need to claim.",
  },
];

const claimSteps = [
  {
    title: "Contact support",
    desc: "Reach out with your order number and a description of the issue.",
  },
  {
    title: "Share details",
    desc: "Send photos or videos of the fault if requested by our team.",
  },
  {
    title: "Get a resolution",
    desc: "We'll arrange a repair, replacement, or refund based on the issue.",
  },
];

const notCovered = [
  "Accidental damage or misuse",
  "Normal wear and tear",
  "Unauthorized repairs or modifications",
  "Products without proof of purchase",
];

const Warranty = () => {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            Peace of Mind
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-6">
            Warranty <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Every product on Voltrix is backed by a manufacturer warranty, so
            you can shop with confidence.
          </p>
        </motion.div>
      </section>

      {/* COVERAGE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10 text-center"
        >
          What's <span className="gradient-text">covered</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {coverage.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-lime/10 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-accent-lime" />
              </div>
              <h3 className="font-display font-semibold mb-2">{c.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLAIM STEPS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10"
        >
          How to <span className="gradient-text">file a claim</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {claimSteps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-8 h-8 rounded-full bg-accent-lime/10 flex items-center justify-center text-accent-lime text-sm font-semibold mb-4">
                {i + 1}
              </div>
              <h3 className="font-display font-semibold mb-2">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NOT COVERED */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="font-display font-semibold">Not covered</h3>
          </div>
          <ul className="space-y-2">
            {notCovered.map((item) => (
              <li key={item} className="text-muted text-sm flex gap-2">
                <span className="text-red-400">•</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>
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
            Need to file a claim?
          </h2>
          <p className="relative text-muted mb-8 max-w-md mx-auto">
            Reach out and our team will guide you through the process.
          </p>
          <Link to="/contact">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="relative"
            >
              Contact Support
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Warranty;
