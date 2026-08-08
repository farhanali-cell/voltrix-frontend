import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroProductImg from "../../assets/images/hero-product.png";

export default function Hero3D({ image = heroProductImg }) {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center"
    >
      {/* Glow behind product */}
      <div className="absolute w-72 h-72 bg-accent-lime/20 blur-[100px] rounded-full" />
      <div className="absolute w-56 h-56 bg-accent-violet/20 blur-[90px] rounded-full translate-x-20 translate-y-10" />

      {/* Floating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[380px] h-[380px] border border-border rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[320px] h-[320px] border border-dashed border-accent-violet/30 rounded-full"
      />

      {/* Tilted product */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-64 h-64 md:w-80 md:h-80"
      >
        <img
          src={image}
          alt="Featured product"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{ transform: "translateZ(60px)" }}
        />
      </motion.div>

      {/* Floating spec badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute top-8 left-0 md:left-4 glass-card px-3 py-2 text-xs font-medium flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-accent-lime animate-glowPulse" />
        In Stock
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-0 md:right-4 glass-card px-3 py-2 text-xs font-medium"
      >
        ⚡ Fast Delivery
      </motion.div>
    </div>
  );
}
