import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const slides = [
  {
    title: "Next-Gen Laptops",
    subtitle: "Power meets portability. Up to 40% off flagship models.",
    image: "/src/assets/images/carousel/slide-laptops.jpg",
    cta: "Shop Laptops",
    link: "/products?category=laptops",
  },
  {
    title: "Sound, Reimagined",
    subtitle: "Studio-quality audio gear for every budget.",
    image: "/src/assets/images/carousel/slide-audio.jpg",
    cta: "Shop Audio",
    link: "/products?category=audio",
  },
  {
    title: "Wear the Future",
    subtitle: "Smartwatches that track more, weigh less.",
    image: "/src/assets/images/carousel/slide-wearables.jpg",
    cta: "Shop Wearables",
    link: "/products?category=smartwatches",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[440px] rounded-3xl overflow-hidden glass-card">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-bgSoft flex items-center justify-center">
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />

          <div className="absolute bottom-10 left-8 md:left-12 max-w-md">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-3xl md:text-4xl font-semibold mb-2"
            >
              {slides[index].title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted mb-5"
            >
              {slides[index].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="primary"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate(slides[index].link)}
              >
                {slides[index].cta}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-8 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-accent-lime" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
