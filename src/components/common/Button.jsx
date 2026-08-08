import { motion } from "framer-motion";

const variants = {
  primary: "bg-accent-lime text-bg hover:shadow-glow",
  secondary:
    "bg-transparent border border-border text-white hover:border-accent-violet hover:shadow-glowViolet",
  ghost: "bg-card/50 text-muted hover:text-white hover:bg-card",
  danger:
    "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={`
        relative font-semibold rounded-full inline-flex items-center justify-center gap-2
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
        </>
      )}
    </motion.button>
  );
}
