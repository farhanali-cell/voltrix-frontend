import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Package,
  PackageCheck,
  ShoppingBag,
  DollarSign,
  Clock,
  Store,
} from "lucide-react";
import AdminSidebar from "../../components/common/AdminSidebar";
import Navbar from "../../components/common/Navbar";
import StatsCard from "../../components/dashboard/StatsCard";
import { Skeleton } from "../../components/common/Loader";
import { getAnalytics } from "../../services/adminService";
import { formatPKR } from "../../utils/helpers";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics()
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 md:px-10 pt-28 pb-16 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-display text-3xl font-semibold mb-1">
              Platform <span className="gradient-text">Overview</span>
            </h1>
            <p className="text-muted text-sm">Site-wide stats at a glance.</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
            </div>
          ) : !data ? (
            <div className="glass-card p-12 text-center text-red-400 text-sm">
              Couldn't load analytics. You may not have admin access.
            </div>
          ) : (
            <>
              <h2 className="font-display text-lg font-semibold mb-4 text-muted">
                Users
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                <StatsCard
                  title="Customers"
                  value={data.users.total_customers}
                  icon={Users}
                  accent="lime"
                />
                <StatsCard
                  title="Sellers"
                  value={data.users.total_sellers}
                  icon={Store}
                  accent="violet"
                />
                <StatsCard
                  title="Approved Sellers"
                  value={data.users.approved_sellers}
                  icon={UserCheck}
                  accent="lime"
                />
                <StatsCard
                  title="Pending Sellers"
                  value={data.users.pending_sellers}
                  icon={Clock}
                  accent="violet"
                />
              </div>

              <h2 className="font-display text-lg font-semibold mb-4 text-muted">
                Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                <StatsCard
                  title="Total Products"
                  value={data.products.total_products}
                  icon={Package}
                  accent="lime"
                />
                <StatsCard
                  title="Active"
                  value={data.products.active_products}
                  icon={PackageCheck}
                  accent="violet"
                />
                <StatsCard
                  title="Inactive"
                  value={data.products.inactive_products}
                  icon={Package}
                  accent="lime"
                />
              </div>

              <h2 className="font-display text-lg font-semibold mb-4 text-muted">
                Orders & Revenue
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <StatsCard
                  title="Total Orders"
                  value={data.orders.total_orders}
                  icon={ShoppingBag}
                  accent="lime"
                />
                <StatsCard
                  title="Total Revenue"
                  value={formatPKR(data.orders.total_revenue)}
                  icon={DollarSign}
                  accent="violet"
                />
                {Object.entries(data.orders.orders_by_status || {}).map(
                  ([status, count]) => (
                    <StatsCard
                      key={status}
                      title={status.charAt(0).toUpperCase() + status.slice(1)}
                      value={count}
                      icon={ShoppingBag}
                      accent="lime"
                    />
                  ),
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
