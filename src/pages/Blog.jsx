import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Laptop,
  Smartphone,
  Headphones as HeadphonesIcon,
  Gamepad2,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const categories = [
  {
    icon: Laptop,
    title: "Laptops",
    desc: "Buying guides and comparisons for every budget.",
  },
  {
    icon: Smartphone,
    title: "Smartphones",
    desc: "The latest releases, reviewed honestly.",
  },
  {
    icon: HeadphonesIcon,
    title: "Audio",
    desc: "Finding the right sound for how you listen.",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    desc: "Gear breakdowns for casual and competitive players.",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            Coming Soon
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-6">
            The <span className="gradient-text">Voltrix</span> Blog
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Buying guides, product comparisons, and honest takes on the tech
            worth caring about.
          </p>
        </motion.div>
      </section>

      {/* FEATURED */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-card p-10 overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent-violet/20 blur-[80px] rounded-full" />
          <span className="relative inline-block text-xs font-medium text-accent-lime mb-3">
            First Post — Coming Soon
          </span>
          <h2 className="relative font-display text-2xl font-semibold mb-3">
            How to Choose Your First Gaming Laptop
          </h2>
          <p className="relative text-muted leading-relaxed max-w-xl">
            We're putting together our first deep-dive guide on picking the
            right gaming laptop for your budget and needs. Check back soon.
          </p>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10 text-center"
        >
          What we'll be <span className="gradient-text">writing about</span>
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((c, i) => (
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

      {/* NEWSLETTER */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 text-center"
        >
          <h3 className="font-display text-xl font-semibold mb-2">
            Get notified when we publish
          </h3>
          <p className="text-muted text-sm mb-6">
            No spam — just new posts, occasionally.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-card border border-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet"
            />
            <Button type="submit" variant="primary">
              Notify Me
            </Button>
          </form>
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
            While you wait, browse the store
          </h2>
          <p className="relative text-muted mb-8 max-w-md mx-auto">
            Explore our full catalog of genuine, next-gen electronics.
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

export default Blog;
