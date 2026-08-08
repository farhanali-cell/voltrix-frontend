import { motion } from "framer-motion";

export default function Card({
  children,
  hover = true,
  glow = false,
  className = "",
  onClick,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: glow
                ? "0 0 40px -10px rgba(212,255,63,0.35)"
                : "0 10px 30px -10px rgba(0,0,0,0.5)",
            }
          : {}
      }
      onClick={onClick}
      className={`
        glass-card p-6 transition-colors duration-300
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
