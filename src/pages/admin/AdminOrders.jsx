import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import AdminSidebar from "../../components/common/AdminSidebar";
import Navbar from "../../components/common/Navbar";
import { Skeleton } from "../../components/common/Loader";
import { getAdminOrders } from "../../services/adminService";
import { formatPKR } from "../../utils/helpers";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  paid: "bg-accent-violet/10 text-accent-violet border-accent-violet/30",
  shipped: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  delivered: "bg-accent-lime/10 text-accent-lime border-accent-lime/30",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
};

const filters = ["all", "pending", "paid", "shipped", "delivered", "cancelled"];

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchOrders = (statusParam) => {
    setLoading(true);
    getAdminOrders(statusParam === "all" ? null : statusParam)
      .then((res) => setOrders(res.data.results || res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders(activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 md:px-10 pt-28 pb-16 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-semibold mb-1">
              All <span className="gradient-text">Orders</span>
            </h1>
            <p className="text-muted text-sm">
              Every order placed across the platform.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-medium capitalize border transition-colors ${
                  activeFilter === f
                    ? "bg-accent-lime text-bg border-accent-lime"
                    : "bg-card text-muted border-border hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <ShoppingBag className="w-10 h-10 text-muted mx-auto mb-4 opacity-50" />
              <p className="text-muted text-sm">No orders found.</p>
            </div>
          ) : (
            <div className="glass-card overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-xs text-muted font-medium uppercase tracking-wide">
                <div className="col-span-2">Order</div>
                <div className="col-span-3">Customer</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Total</div>
                <div className="col-span-3">Status</div>
              </div>

              <div className="divide-y divide-border">
                {orders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-card/50 transition-colors"
                  >
                    <div className="col-span-1 md:col-span-2 text-sm font-medium">
                      #{order.id}
                    </div>
                    <div className="col-span-1 md:col-span-3 text-sm text-muted truncate">
                      {order.username}
                    </div>
                    <div className="col-span-1 md:col-span-2 text-sm text-muted">
                      {formatDate(order.created_at)}
                    </div>
                    <div className="col-span-1 md:col-span-2 text-sm font-medium">
                      {formatPKR(order.total_price)}
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border capitalize ${
                          statusStyles[order.status] || statusStyles.pending
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
