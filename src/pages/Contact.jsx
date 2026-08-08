import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MessageCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const contactMethods = [
  { icon: Mail, title: "Email Us", desc: "support@voltrix.com" },
  { icon: Clock, title: "Support Hours", desc: "24/7, every day" },
  {
    icon: MessageCircle,
    title: "Response Time",
    desc: "Usually within a few hours",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            We're Here to Help
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-6">
            Get in <span className="gradient-text">touch</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question about an order, a product, or anything else? We're
            happy to help.
          </p>
        </motion.div>
      </section>

      {/* CONTACT METHODS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-lime/10 flex items-center justify-center mb-4 mx-auto">
                <m.icon className="w-5 h-5 text-accent-lime" />
              </div>
              <h3 className="font-display font-semibold mb-1">{m.title}</h3>
              <p className="text-muted text-sm">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h2 className="font-display text-2xl font-semibold mb-6">
            Send us a <span className="gradient-text">message</span>
          </h2>

          {sent && (
            <p className="text-accent-lime text-sm mb-4">
              Thanks! Your message has been noted — we'll get back to you soon.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full bg-bg border border-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full bg-bg border border-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help?"
              rows={4}
              required
              className="w-full bg-bg border border-border rounded-2xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet"
            />
            <Button type="submit" variant="primary" className="w-full">
              Send Message
            </Button>
          </form>
        </motion.div>
      </section>

      {/* FAQ TEASER */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent-violet/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-accent-violet" />
            </div>
            <div>
              <h3 className="font-display font-semibold">
                Looking for a quick answer?
              </h3>
              <p className="text-muted text-sm">
                Check our FAQs before reaching out — you might find it faster.
              </p>
            </div>
          </div>
          <Link
            to="/faqs"
            className="text-sm text-accent-lime hover:underline whitespace-nowrap"
          >
            View FAQs →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
