import { motion } from "framer-motion";
import { ChevronRight, Package, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cancelOrder } from "../../services/orderService";
import { formatPKR } from "../../utils/helpers";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  paid: "bg-accent-violet/10 text-accent-violet border-accent-violet/30",
  shipped: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  delivered: "bg-accent-lime/10 text-accent-lime border-accent-lime/30",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
};

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

export default function OrdersTable({ orders = [], onOrderCancelled }) {
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await cancelOrder(id);
      onOrderCancelled?.();
    } catch (err) {
      alert(err?.response?.data?.detail || "Could not cancel order.");
    }
  };

  if (!orders.length) {
    return (
      <div className="glass-card p-12 text-center">
        <Package className="w-10 h-10 text-muted mx-auto mb-4" />
        <p className="text-muted text-sm">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-xs text-muted font-medium uppercase tracking-wide">
        <div className="col-span-4">Order</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Total</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Action</div>
      </div>

      <div className="divide-y divide-border">
        {orders.map((order, i) => {
          const canCancel = ["pending", "paid"].includes(order.status);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-card/50 transition-colors"
            >
              <div className="col-span-2 md:col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-accent-lime" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">#{order.id}</p>
                  <p className="text-muted text-xs truncate">
                    {order.items?.length || 0} item(s)
                  </p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-sm text-muted">
                {formatDate(order.created_at)}
              </div>

              <div className="col-span-1 md:col-span-2 text-sm font-medium">
                {formatPKR(order.total_price)}
              </div>

              <div className="col-span-1 md:col-span-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border capitalize ${
                    statusStyles[order.status] || statusStyles.pending
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-end items-center gap-4">
                {canCancel && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
                <Link
                  to={`/track-order?id=${order.id}`}
                  className="flex items-center gap-1 text-xs font-medium text-accent-lime hover:gap-2 transition-all"
                >
                  Track <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
