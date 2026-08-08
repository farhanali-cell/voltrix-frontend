import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Eye, EyeOff } from "lucide-react";
import AdminSidebar from "../../components/common/AdminSidebar";
import Navbar from "../../components/common/Navbar";
import { Skeleton } from "../../components/common/Loader";
import {
  getAdminProducts,
  toggleProductActive,
} from "../../services/adminService";
import { formatPKR } from "../../utils/helpers";

const filters = ["all", "active", "inactive"];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [togglingId, setTogglingId] = useState(null);

  const fetchProducts = (statusParam) => {
    setLoading(true);
    getAdminProducts(statusParam === "all" ? null : statusParam)
      .then((res) => setProducts(res.data.results || res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(activeFilter);
  }, [activeFilter]);

  const handleToggle = async (id) => {
    setTogglingId(id);
    try {
      await toggleProductActive(id);
      fetchProducts(activeFilter);
    } catch {
      alert("Could not update product status.");
    } finally {
      setTogglingId(null);
    }
  };

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
              All <span className="gradient-text">Products</span>
            </h1>
            <p className="text-muted text-sm">
              Every product listed across all sellers.
            </p>
          </motion.div>

          <div className="flex gap-2 mb-6">
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
          ) : products.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <Package className="w-10 h-10 text-muted mx-auto mb-4 opacity-50" />
              <p className="text-muted text-sm">No products found.</p>
            </div>
          ) : (
            <div className="glass-card overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-xs text-muted font-medium uppercase tracking-wide">
                <div className="col-span-4">Product</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Seller</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              <div className="divide-y divide-border">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-card/50 transition-colors"
                  >
                    <div className="col-span-2 md:col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-accent-lime" />
                      </div>
                      <p className="text-sm font-medium truncate">{p.name}</p>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-sm text-muted">
                      {p.category_name || "—"}
                    </div>

                    <div className="col-span-1 md:col-span-2 text-sm text-muted truncate">
                      {p.seller_username}
                    </div>

                    <div className="col-span-1 md:col-span-2 text-sm font-medium">
                      {formatPKR(p.discount_price || p.price)}
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end">
                      <button
                        onClick={() => handleToggle(p.id)}
                        disabled={togglingId === p.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all disabled:opacity-50 ${
                          p.is_active
                            ? "bg-accent-lime/10 text-accent-lime border-accent-lime/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                            : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-accent-lime/10 hover:text-accent-lime hover:border-accent-lime/30"
                        }`}
                      >
                        {p.is_active ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                        {p.is_active ? "Active" : "Inactive"}
                      </button>
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
