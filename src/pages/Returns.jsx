import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PackageCheck, PackageX, RotateCcw, ArrowRight } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const steps = [
  {
    title: "Request a return",
    desc: "Contact support with your order number within 7 days of delivery.",
  },
  {
    title: "Pack the item",
    desc: "Include all original accessories and packaging.",
  },
  {
    title: "Ship it back",
    desc: "We'll share pickup or drop-off details for your area.",
  },
  {
    title: "Get refunded",
    desc: "Once inspected, your refund is processed within 5–7 business days.",
  },
];

const eligible = [
  "Item is unused and in original condition",
  "Original packaging and accessories included",
  "Requested within 7 days of delivery",
  "Proof of purchase (order number) provided",
];

const notEligible = [
  "Items damaged from misuse",
  "Products without original packaging",
  "Requests made after 7 days",
  "Personalized or clearance items",
];

const Returns = () => {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            Hassle-Free Returns
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-6">
            Returns & <span className="gradient-text">Refunds</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Not quite right? You can return most items within 7 days of delivery
            for a full refund.
          </p>
        </motion.div>
      </section>

      {/* PROCESS STEPS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10 text-center"
        >
          How it <span className="gradient-text">works</span>
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
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

      {/* ELIGIBILITY */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <PackageCheck className="w-5 h-5 text-accent-lime" />
            <h3 className="font-display font-semibold">Eligible for return</h3>
          </div>
          <ul className="space-y-2">
            {eligible.map((item) => (
              <li key={item} className="text-muted text-sm flex gap-2">
                <span className="text-accent-lime">•</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <PackageX className="w-5 h-5 text-red-400" />
            <h3 className="font-display font-semibold">Not eligible</h3>
          </div>
          <ul className="space-y-2">
            {notEligible.map((item) => (
              <li key={item} className="text-muted text-sm flex gap-2">
                <span className="text-red-400">•</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* REFUND TIMELINE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-accent-violet/10 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5 text-accent-violet" />
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Refunds are processed to your original payment method within{" "}
            <span className="text-white font-medium">5–7 business days</span>{" "}
            after we receive and inspect your returned item.
          </p>
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
            Need help with a return?
          </h2>
          <p className="relative text-muted mb-8 max-w-md mx-auto">
            Our support team can guide you through the process.
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

export default Returns;
