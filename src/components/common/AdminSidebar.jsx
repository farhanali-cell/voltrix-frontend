import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  BarChart3,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const adminLinks = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Sellers", icon: Users, path: "/admin/sellers" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Orders", icon: ShoppingBag, path: "/admin/orders" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex flex-col justify-between w-64 h-screen sticky top-0 
                 bg-bgSoft border-r border-border px-4 py-8"
    >
      <div>
        <div className="flex items-center gap-2 px-3 mb-5 pt-14">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-violet" />
          <span className="text-xs text-accent-violet font-medium tracking-wide uppercase">
            Admin Panel
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {adminLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent-lime/10 text-accent-lime border border-accent-lime/30 shadow-glow"
                    : "text-muted hover:text-white hover:bg-card"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-red-400 hover:bg-card transition-all"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </motion.aside>
  );
}
