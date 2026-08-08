import { useState } from "react";
import { motion } from "framer-motion";
import { Search, PackageSearch } from "lucide-react";
import Button from "../common/Button";
import { Skeleton } from "../common/Loader";
import OrderStatusCard from "./OrderStatusCard";
import OrderTimeline from "./OrderTimeline";
import { getOrderTracking } from "../../services/orderTrackingService";
import { getOrderDetail } from "../../services/orderService";

export default function OrderTracking({ initialOrderId = "" }) {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const [detailRes, trackingRes] = await Promise.all([
        getOrderDetail(orderId),
        getOrderTracking(orderId),
      ]);

      setOrder({
        ...detailRes.data,
        status: trackingRes.data.current_status,
      });
      setHistory(trackingRes.data.history || []);
    } catch (err) {
      setError("Order not found. Please check the order number.");
      setOrder(null);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-2 flex items-center gap-2 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order number..."
            className="w-full bg-transparent pl-11 pr-4 py-3 text-sm focus:outline-none placeholder:text-muted"
          />
        </div>
        <Button type="submit" variant="primary" loading={loading}>
          Track Order
        </Button>
      </motion.form>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-64" />
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 text-center"
        >
          <PackageSearch className="w-10 h-10 text-muted mx-auto mb-4" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      ) : order ? (
        <div className="space-y-6">
          <OrderStatusCard order={order} />
          <OrderTimeline history={history} currentStatus={order.status} />
        </div>
      ) : !searched ? (
        <div className="glass-card p-12 text-center">
          <PackageSearch className="w-10 h-10 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-muted text-sm">
            Enter your order number above to see live tracking.
          </p>
        </div>
      ) : null}
    </div>
  );
}
