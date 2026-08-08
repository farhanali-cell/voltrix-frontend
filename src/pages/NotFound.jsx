import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Home, ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-white flex items-center justify-center relative overflow-hidden px-6">
      {/* Ambient glows */}
      <div className="absolute w-96 h-96 bg-accent-violet/10 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-accent-lime/10 blur-[120px] rounded-full bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <Zap className="w-7 h-7 text-accent-lime" fill="currentColor" />
          <span className="font-display text-2xl font-semibold">
            Volt<span className="gradient-text">rix</span>
          </span>
        </Link>

        <motion.h1
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="font-display text-8xl md:text-9xl font-semibold gradient-text mb-4"
        >
          404
        </motion.h1>

        <h2 className="font-display text-2xl font-semibold mb-3">
          Signal lost.
        </h2>
        <p className="text-muted leading-relaxed mb-10">
          The page you're looking for has drifted off the grid. Let's get you
          back on track.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" icon={Home}>
              Back to Home
            </Button>
          </Link>
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </motion.div>

      {/* Decorative floating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[500px] h-[500px] border border-border rounded-full opacity-30"
      />
    </div>
  );
}
