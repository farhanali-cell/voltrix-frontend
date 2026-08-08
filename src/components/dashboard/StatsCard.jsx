import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
  title,
  value,
  change,
  trend = "up",
  icon: Icon,
  accent = "lime",
}) {
  const accentColor = accent === "violet" ? "accent-violet" : "accent-lime";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 bg-${accentColor}/10 blur-[60px] rounded-full 
                   group-hover:bg-${accentColor}/20 transition-all duration-500`}
      />

      <div className="relative flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl bg-${accentColor}/10 flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 text-${accentColor}`} />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
              trend === "up"
                ? "bg-accent-lime/10 text-accent-lime"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}%
          </div>
        )}
      </div>

      <p className="text-muted text-sm mb-1">{title}</p>
      <h3 className="font-display text-2xl md:text-3xl font-semibold truncate">{value}</h3>
    </motion.div>
  );
}
