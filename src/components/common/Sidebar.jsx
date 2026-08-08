import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, Bell, Settings, LogOut } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Orders", icon: Package, path: "/profile" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex flex-col justify-between w-64 h-screen sticky top-0 
                 bg-bg-soft border-r border-border px-4 py-8"
    >
      <div>
        <nav className="flex flex-col gap-1 pt-16">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
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

      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-red-400 hover:bg-card transition-all">
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </motion.aside>
  );
}
