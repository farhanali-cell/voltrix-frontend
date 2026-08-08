import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import OrdersTable from "../components/dashboard/OrdersTable";
import { Skeleton } from "../components/common/Loader";
import { getCustomerOrders } from "../services/orderService";

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 md:px-10 pt-28 pb-16 max-w-5xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-display text-3xl font-semibold mb-1">
              My <span className="gradient-text">Orders</span>
            </h1>
            <p className="text-muted text-sm">
              Track and review everything you've ordered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
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
            ) : orders.length === 0 ? (
              <div className="glass-card p-10 text-center">
                <Package className="w-8 h-8 text-muted mx-auto mb-3" />
                <p className="text-muted text-sm">
                  You haven't placed any orders yet.
                </p>
              </div>
            ) : (
              <OrdersTable orders={orders} />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
