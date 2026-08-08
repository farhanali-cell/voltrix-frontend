import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const faqCategories = [
  {
    category: "Orders",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse products, add items to your cart, and proceed to checkout. You'll pay securely via Stripe.",
      },
      {
        q: "Can I cancel an order?",
        a: "Orders can be cancelled before they're shipped. Contact support with your order number to request a cancellation.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Most orders are dispatched the same day and arrive within 2–5 business days depending on your location.",
      },
      {
        q: "Can I track my order?",
        a: "Yes — once your order is placed, you can track its status anytime from the Track Order page or your order history.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major debit and credit cards through our secure Stripe checkout.",
      },
      {
        q: "Is my payment information safe?",
        a: "Yes, all payments are processed directly by Stripe — we never store your card details.",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        q: "What's your return policy?",
        a: "You can return most items within 7 days of delivery, provided they're unused and in original packaging.",
      },
      {
        q: "Are the products genuine?",
        a: "Every product on Voltrix is sourced from verified sellers and checked for authenticity before listing.",
      },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between text-sm font-medium text-white"
      >
        {q}
        <span className="text-accent-lime ml-4">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-muted text-sm mt-3 leading-relaxed">{a}</p>}
    </div>
  );
};

const FAQs = () => {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            Got Questions?
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about ordering, shipping, payments, and
            returns.
          </p>
        </motion.div>
      </section>

      {/* CATEGORIZED FAQ SECTIONS */}
      {faqCategories.map((cat, ci) => (
        <section key={cat.category} className="max-w-3xl mx-auto px-6 py-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-display text-2xl font-semibold mb-6"
          >
            {cat.category}
          </motion.h2>
          <div className="space-y-3">
            {cat.items.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <FAQItem q={item.q} a={item.a} />
              </motion.div>
            ))}
          </div>
        </section>
      ))}

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
            Still have questions?
          </h2>
          <p className="relative text-muted mb-8 max-w-md mx-auto">
            Our support team is available 24/7 to help.
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

export default FAQs;
