import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Package, Gift, Info } from "lucide-react";

const typeConfig = {
  order_update: { icon: Package, color: "accent-lime" },
  coupon: { icon: Gift, color: "accent-violet" },
  general: { icon: Info, color: "accent-lime" },
};

const formatTime = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

export default function NotificationDropdown({
  notifications = [],
  onMarkRead,
  onClearAll,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-card transition-colors"
      >
        <Bell className="w-5 h-5 text-muted hover:text-white transition-colors" />
        {unreadCount > 0 && (
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1 right-1 w-2 h-2 bg-accent-lime rounded-full"
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 glass-card overflow-hidden z-50 origin-top-right"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-semibold text-sm">
                Notifications
              </h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-muted hover:text-accent-lime transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <Bell className="w-8 h-8 text-muted mx-auto mb-3 opacity-50" />
                  <p className="text-muted text-sm">You're all caught up.</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const config =
                    typeConfig[n.notification_type] || typeConfig.general;
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={n.id}
                      layout
                      onClick={() => onMarkRead?.(n.id)}
                      className={`flex items-start gap-3 px-5 py-4 border-b border-border last:border-0 
                                 cursor-pointer hover:bg-card/60 transition-colors ${!n.is_read ? "bg-card/30" : ""}`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg bg-${config.color}/10 flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-4 h-4 text-${config.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium line-clamp-2">
                          {n.message}
                        </p>
                        <p className="text-muted text-[11px] mt-1">
                          {formatTime(n.created_at)}
                        </p>
                      </div>
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-accent-lime mt-1.5 shrink-0" />
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
