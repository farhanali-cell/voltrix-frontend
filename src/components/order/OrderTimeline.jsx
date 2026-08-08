import { motion } from "framer-motion";
import { Check, Clock, CreditCard, Truck, Home } from "lucide-react";

const stepConfig = {
  pending: { icon: Clock, label: "Order Placed" },
  paid: { icon: CreditCard, label: "Paid" },
  shipped: { icon: Truck, label: "Shipped" },
  delivered: { icon: Home, label: "Delivered" },
};

const stepOrder = ["pending", "paid", "shipped", "delivered"];

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

export default function OrderTimeline({ history = [], currentStatus }) {
  const currentIndex = stepOrder.indexOf(currentStatus);

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="font-display text-lg font-semibold mb-8">
        Order Progress
      </h3>

      <div className="relative flex items-center justify-between mb-12 px-2">
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-border" />
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width: `${(Math.max(currentIndex, 0) / (stepOrder.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-5 left-0 h-[2px] bg-gradient-to-r from-accent-lime to-accent-violet"
        />

        {stepOrder.map((step, i) => {
          const config = stepConfig[step];
          const Icon = config.icon;
          const isDone = i <= currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center gap-2 flex-1"
            >
              <motion.div
                animate={isCurrent ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isDone
                    ? "bg-accent-lime border-accent-lime text-bg"
                    : "bg-card border-border text-muted"
                }`}
              >
                {isDone && !isCurrent ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </motion.div>
              <span
                className={`text-xs font-medium text-center ${isDone ? "text-white" : "text-muted"}`}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-5 border-t border-border pt-6">
        {history.length === 0 ? (
          <p className="text-muted text-sm text-center py-4">
            No status history yet.
          </p>
        ) : (
          history.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-lime mt-1.5" />
                {i !== history.length - 1 && (
                  <span className="w-[1.5px] flex-1 bg-border mt-1" />
                )}
              </div>
              <div className="pb-2">
                <p className="text-sm font-medium capitalize">{entry.status}</p>
                <p className="text-muted text-[11px] mt-1">
                  {formatDate(entry.changed_at)}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
