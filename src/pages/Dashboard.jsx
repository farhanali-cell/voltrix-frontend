import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, DollarSign, Plus } from "lucide-react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import OrdersTable from "../components/dashboard/OrdersTable";
import { Skeleton } from "../components/common/Loader";
import Button from "../components/common/Button";
import { getCustomerOrders } from "../services/orderService";
import { formatPKR } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await getCustomerOrders();
      setOrders(res.data.results || res.data);
    } catch (err) {
      setError("Couldn't load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    spent: orders.reduce((sum, o) => sum + (Number(o.total_price) || 0), 0),
  };

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 md:px-10 pt-28 pb-16 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="font-display text-3xl font-semibold mb-1">
                Welcome back <span className="gradient-text">👋</span>
              </h1>
              <p className="text-muted text-sm">
                Here's what's happening with your orders.
              </p>
            </div>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => navigate("/products")}
            >
              New Order
            </Button>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {loading ? (
              Array(4)
                .fill(0)
                .map((_, i) => <Skeleton key={i} className="h-32" />)
            ) : (
              <>
                <StatsCard
                  title="Total Orders"
                  value={stats.total}
                  icon={Package}
                  accent="lime"
                />
                <StatsCard
                  title="Pending"
                  value={stats.pending}
                  icon={Clock}
                  accent="violet"
                />
                <StatsCard
                  title="Delivered"
                  value={stats.delivered}
                  icon={CheckCircle2}
                  accent="lime"
                />
                <StatsCard
                  title="Total Spent"
                  value={formatPKR(stats.spent)}
                  icon={DollarSign}
                  accent="violet"
                />
              </>
            )}
          </div>

          {/* Orders table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold">
                Recent Orders
              </h2>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-16" />
                  ))}
              </div>
            ) : error ? (
              <div className="glass-card p-8 text-center text-red-400 text-sm">
                {error}
              </div>
            ) : (
              <OrdersTable orders={orders} onOrderCancelled={fetchOrders} />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
