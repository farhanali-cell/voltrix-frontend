import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function Loader({ fullScreen = true, label = "Loading" }) {
  const content = (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="relative w-14 h-14"
      >
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div className="absolute inset-0 rounded-full border-2 border-t-accent-lime border-r-accent-violet border-b-transparent border-l-transparent" />
        <Zap
          className="absolute inset-0 m-auto w-5 h-5 text-accent-lime"
          fill="currentColor"
        />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm text-muted font-medium tracking-wide"
      >
        {label}...
      </motion.p>
    </div>
  );

  if (!fullScreen) return content;

  return (
    <div className="fixed inset-0 bg-bg/90 backdrop-blur-sm flex items-center justify-center z-[100]">
      {content}
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-card animate-pulse rounded-xl ${className}`}
      style={{
        background:
          "linear-gradient(90deg, #14161F 0%, #1a1d2a 50%, #14161F 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.8s infinite",
      }}
    />
  );
}
