import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Package, Gift, Info, CheckCheck } from "lucide-react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import { Skeleton } from "../components/common/Loader";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notificationService";

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
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    getNotifications()
      .then((res) => setNotifications(res.data.results || res.data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      fetchData();
    } catch {}
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      fetchData();
    } catch {}
  };

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-6 md:px-10 pt-28 pb-16 max-w-4xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <h1 className="font-display text-3xl font-semibold">
              Notifications
            </h1>
            {notifications.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                icon={CheckCheck}
                onClick={handleMarkAllRead}
              >
                Mark all read
              </Button>
            )}
          </motion.div>

          {loading ? (
            <div className="space-y-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <Bell className="w-10 h-10 text-muted mx-auto mb-4 opacity-50" />
              <p className="text-muted text-sm">You're all caught up.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n, i) => {
                const config =
                  typeConfig[n.notification_type] || typeConfig.general;
                const Icon = config.icon;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => !n.is_read && handleMarkRead(n.id)}
                    className={`glass-card p-5 flex items-start gap-4 cursor-pointer transition-colors ${
                      !n.is_read ? "border-accent-lime/30" : ""
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-${config.color}/10 flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 text-${config.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{n.message}</p>
                      <p className="text-muted text-xs mt-1">
                        {formatTime(n.created_at)}
                      </p>
                    </div>
                    {!n.is_read && (
                      <span className="w-2.5 h-2.5 rounded-full bg-accent-lime mt-1.5 shrink-0" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
