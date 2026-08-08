import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Check, X, Mail, Phone } from "lucide-react";
import AdminSidebar from "../../components/common/AdminSidebar";
import Navbar from "../../components/common/Navbar";
import { Skeleton } from "../../components/common/Loader";
import {
  getSellers,
  approveSeller,
  rejectSeller,
} from "../../services/adminService";

const filters = ["all", "pending", "approved"];

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

export default function AdminSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("pending");
  const [actioningId, setActioningId] = useState(null);

  const fetchSellers = (statusParam) => {
    setLoading(true);
    getSellers(statusParam === "all" ? null : statusParam)
      .then((res) => setSellers(res.data.results || res.data))
      .catch(() => setSellers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSellers(activeFilter);
  }, [activeFilter]);

  const handleApprove = async (id) => {
    setActioningId(id);
    try {
      await approveSeller(id);
      fetchSellers(activeFilter);
    } catch {
      alert("Could not approve seller.");
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject and permanently remove this seller account?"))
      return;
    setActioningId(id);
    try {
      await rejectSeller(id);
      fetchSellers(activeFilter);
    } catch {
      alert("Could not reject seller.");
    } finally {
      setActioningId(null);
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
              Manage <span className="gradient-text">Sellers</span>
            </h1>
            <p className="text-muted text-sm">
              Approve or reject seller applications.
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
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
            </div>
          ) : sellers.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <Users className="w-10 h-10 text-muted mx-auto mb-4 opacity-50" />
              <p className="text-muted text-sm">No sellers found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sellers.map((seller, i) => (
                <motion.div
                  key={seller.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent-lime to-accent-violet flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-bg" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{seller.username}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Mail className="w-3 h-3" /> {seller.email || "—"}
                        </span>
                        {seller.phone && (
                          <span className="flex items-center gap-1 text-xs text-muted">
                            <Phone className="w-3 h-3" /> {seller.phone}
                          </span>
                        )}
                      </div>
                      <p className="text-muted text-[11px] mt-1">
                        Joined {formatDate(seller.date_joined)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        seller.is_approved
                          ? "bg-accent-lime/10 text-accent-lime border-accent-lime/30"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {seller.is_approved ? "Approved" : "Pending"}
                    </span>

                    {!seller.is_approved && (
                      <button
                        onClick={() => handleApprove(seller.id)}
                        disabled={actioningId === seller.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent-lime text-bg text-xs font-semibold hover:shadow-glow transition-all disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleReject(seller.id)}
                      disabled={actioningId === seller.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-semibold hover:bg-red-500/20 transition-all disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
