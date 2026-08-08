import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Truck, Headphones } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Hero3D from "../components/3d/Hero3D";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../services/productService";
// top imports mein add karein:
import heroLaptopVideo from "../assets/videos/hero-laptop.mp4";
import heroSmartphoneVideo from "../assets/videos/hero-smartphone.mp4";
import heroAccessoriesVideo from "../assets/videos/hero-accessories.mp4";
import ProductCarousel from "../components/common/Carousel";
import laptopImg from "../assets/images/categories/laptop/laptop1.jpg";
import smartphoneImg from "../assets/images/categories/smartphones/phone1.jpg";
import headphoneImg from "../assets/images/categories/headphones/headphone1.jpg";
import smartwatchImg from "../assets/images/categories/smartwatches/watch1.jpg";
import gamingImg from "../assets/images/categories/gaming/game1.jpg";
import accessoriesImg from "../assets/images/categories/accessories/jwellary.jpg";

const categories = [
  {
    name: "Laptops",
    slug: "laptops",
    image: laptopImg,
  },
  {
    name: "Smartphones",
    slug: "smartphones",
    image: smartphoneImg,
  },
  {
    name: "Audio",
    slug: "headphones",
    image: headphoneImg,
  },
  {
    name: "Smartwatches",
    slug: "smartwatches",
    image: smartwatchImg,
  },
  {
    name: "Gaming",
    slug: "gaming",
    image: gamingImg,
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: accessoriesImg,
  },
];

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Same-day dispatch on all in-stock items.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Warranty",
    desc: "100% authentic products, verified sellers.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Real humans, real fast responses.",
  },
  {
    icon: Zap,
    title: "Live Tracking",
    desc: "Track every order in real time, step by step.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const heroVideos = [heroLaptopVideo, heroSmartphoneVideo, heroAccessoriesVideo];

export default function Home() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoIndex((i) => (i + 1) % heroVideos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getProducts({ ordering: "-created_at" })
      .then((res) => setFeaturedProducts(res.data.slice(0, 8)))
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoadingFeatured(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      {/* VIDEO BANNER */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideos[videoIndex]} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            key={`caption-${videoIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-4">
              ⚡ Voltrix Collection
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold">
              {
                [
                  "Power in Every Detail",
                  "Sound That Moves You",
                  "Gear Up for More",
                ][videoIndex]
              }
            </h2>
          </motion.div>
        </div>
      </section>

      {/* HERO CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            ⚡ New Arrivals Just Dropped
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] mb-6">
            Tech that feels <span className="gradient-text">alive.</span>
          </h1>
          <p className="text-muted text-lg max-w-md mb-8 leading-relaxed">
            Curated electronics for people who don't settle. Explore the future,
            delivered to your door.
          </p>
          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Shop Now
            </Button>
            <Button variant="secondary" size="lg">
              Explore Deals
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero3D />
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display text-3xl font-semibold mb-10"
        >
          Shop by <span className="gradient-text">Category</span>
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/products?category=${cat.slug}`}>
                <Card
                  className="text-center py-6 px-4 cursor-pointer overflow-hidden"
                  glow
                >
                  <div className="w-full h-24 mb-3 rounded-xl overflow-hidden bg-card flex items-center justify-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium">{cat.name}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROMO CAROUSEL */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <ProductCarousel />
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="font-display text-3xl font-semibold">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <Link
            to="/products"
            className="text-sm text-accent-lime hover:underline"
          >
            View all →
          </Link>
        </motion.div>

        {loadingFeatured ? (
          <p className="text-muted text-sm">Loading products...</p>
        ) : featuredProducts.length === 0 ? (
          <p className="text-muted text-sm">No products available yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-lime/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-accent-lime" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
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
            Ready to upgrade your setup?
          </h2>
          <p className="relative text-muted mb-8 max-w-md mx-auto">
            Join thousands of customers who trust Voltrix for genuine, next-gen
            tech.
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
}
