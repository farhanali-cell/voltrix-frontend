import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, TrendingUp, Coffee, Globe } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const perks = [
  {
    icon: Heart,
    title: "Health First",
    desc: "Comprehensive health coverage for you and your family.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    desc: "Clear paths to grow your skills and career, fast.",
  },
  {
    icon: Coffee,
    title: "Flexible Work",
    desc: "Remote-friendly with flexible hours that fit your life.",
  },
  {
    icon: Globe,
    title: "Real Impact",
    desc: "Ship features that reach thousands of customers every week.",
  },
];

const openRoles = [
  { title: "Frontend Engineer (React)", type: "Full-time · Remote" },
  { title: "Backend Engineer (Django)", type: "Full-time · Remote" },
  { title: "Customer Support Specialist", type: "Full-time · Hybrid" },
  { title: "Product Designer", type: "Contract · Remote" },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            We're Hiring
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-6">
            Build the future of{" "}
            <span className="gradient-text">tech shopping.</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Join a small, fast-moving team obsessed with making electronics
            shopping feel effortless, trustworthy, and genuinely enjoyable.
          </p>
        </motion.div>
      </section>

      {/* CULTURE */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            How we <span className="gradient-text">work</span>
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            We're a small team that moves fast and owns our work end to end. No
            endless meetings, no bureaucracy — just clear goals and the trust to
            get there your way.
          </p>
          <p className="text-muted leading-relaxed">
            Everyone at Voltrix, regardless of role, cares about the same thing:
            making customers happy they chose us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card p-10 overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent-lime/10 blur-[80px] rounded-full" />
          <p className="relative font-display text-xl leading-relaxed text-white">
            "We hire for curiosity and ownership — everything else can be
            learned."
          </p>
          <p className="relative text-muted text-sm mt-4">— The Voltrix Team</p>
        </motion.div>
      </section>

      {/* PERKS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10 text-center"
        >
          Why you'll <span className="gradient-text">love it here</span>
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-lime/10 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-accent-lime" />
              </div>
              <h3 className="font-display font-semibold mb-2">{p.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10"
        >
          Open <span className="gradient-text">Roles</span>
        </motion.h2>
        <div className="space-y-4">
          {openRoles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium text-white">{role.title}</h3>
                <p className="text-muted text-sm">{role.type}</p>
              </div>
              <a
                href="mailto:careers@voltrix.com"
                className="text-sm text-accent-lime hover:underline whitespace-nowrap"
              >
                Apply →
              </a>
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
            Don't see your role?
          </h2>
          <p className="relative text-muted mb-8 max-w-md mx-auto">
            We're always open to meeting talented people. Send us your resume
            anyway.
          </p>
          <a href="mailto:careers@voltrix.com">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="relative"
            >
              Get in Touch
            </Button>
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
