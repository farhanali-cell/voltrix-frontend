import { motion } from "framer-motion";
import { Package, Calendar, CreditCard, ShoppingBag } from "lucide-react";
import { formatPKR } from "../../utils/helpers";

const statusStyles = {
  pending: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  paid: {
    bg: "bg-accent-violet/10",
    text: "text-accent-violet",
    border: "border-accent-violet/30",
  },
  shipped: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  delivered: {
    bg: "bg-accent-lime/10",
    text: "text-accent-lime",
    border: "border-accent-lime/30",
  },
  cancelled: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
  },
};

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

export default function OrderStatusCard({ order }) {
  if (!order) return null;
  const style = statusStyles[order.status] || statusStyles.pending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent-lime/10 blur-[80px] rounded-full" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center border border-border">
            <Package className="w-6 h-6 text-accent-lime" />
          </div>
          <div>
            <p className="text-muted text-xs mb-1">Order Number</p>
            <h2 className="font-display text-xl font-semibold">#{order.id}</h2>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border capitalize self-start ${style.bg} ${style.text} ${style.border}`}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${style.text.replace("text-", "bg-")}`}
          />
          {order.status}
        </span>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-muted" />
          <div>
            <p className="text-muted text-xs">Order Date</p>
            <p className="text-sm font-medium">
              {formatDate(order.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-4 h-4 text-muted" />
          <div>
            <p className="text-muted text-xs">Items</p>
            <p className="text-sm font-medium">
              {order.items?.length || 0} item(s)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CreditCard className="w-4 h-4 text-muted" />
          <div>
            <p className="text-muted text-xs">Total Amount</p>
            <p className="text-sm font-medium">{formatPKR(order.total_price)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
