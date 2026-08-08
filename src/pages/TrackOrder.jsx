import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import OrderTracking from "../components/order/OrderTracking";

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const orderIdFromUrl = searchParams.get("id") || "";

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs font-medium text-accent-lime mb-6">
            📦 Live Order Tracking
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Where's my <span className="gradient-text">order?</span>
          </h1>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Enter your order number below and get real-time updates on every
            step of delivery.
          </p>
        </motion.div>

        <OrderTracking initialOrderId={orderIdFromUrl} />
      </main>

      <Footer />
    </div>
  );
}
