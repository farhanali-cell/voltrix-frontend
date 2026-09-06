import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LayoutDashboard,
  Package,
  Bell as BellIcon,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import NotificationDropdown from "../notifications/NotificationDropdown";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notificationService";

const mobileLinks = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Orders", icon: Package, path: "/profile" },
  { label: "Notifications", icon: BellIcon, path: "/notifications" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function DashboardTopbar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (isLoggedIn) {
      getNotifications()
        .then((res) => setNotifications(res.data.results || res.data))
        .catch(() => setNotifications([]));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      const res = await getNotifications();
      setNotifications(res.data.results || res.data);
    } catch {}
  };

  const handleClearAll = async () => {
    try {
      await markAllNotificationsRead();
      const res = await getNotifications();
      setNotifications(res.data.results || res.data);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative border-b border-border bg-bg shrink-0">
      <div className="flex items-center justify-end gap-4 px-6 md:px-10 py-5">
        {/* Desktop right icons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && (
            <NotificationDropdown
              notifications={notifications}
              onMarkRead={handleMarkRead}
              onClearAll={handleClearAll}
            />
          )}

          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-card transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-muted hover:text-white" />
          </Link>

          {isLoggedIn && (
            <div
              ref={profileRef}
              className="relative pl-2 border-l border-border"
            >
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-lime to-accent-violet flex items-center justify-center">
                  <User className="w-4 h-4 text-bg" />
                </div>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-52 glass-card overflow-hidden z-50 origin-top-right"
                  >
                    {user?.username && (
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium truncate">
                          {user.username}
                        </p>
                      </div>
                    )}
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-accent-lime hover:bg-card/60 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-accent-lime hover:bg-card/60 transition-colors"
                    >
                      <Package className="w-4 h-4" /> My Orders
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-accent-lime hover:bg-card/60 transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-card/60 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile: logo + bell + cart + hamburger */}
        <div className="md:hidden flex items-center gap-3 w-full justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-lg font-semibold tracking-tight">
              Volt<span className="gradient-text">rix</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <NotificationDropdown
                notifications={notifications}
                onMarkRead={handleMarkRead}
                onClearAll={handleClearAll}
              />
            )}
            <Link
              to="/cart"
              className="relative p-1.5 rounded-full hover:bg-card transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </Link>
            <button
              className="text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-card mx-4 mb-3"
          >
            <div className="flex flex-col p-4 gap-1 max-h-[60vh] overflow-y-auto">
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2.5 px-2 rounded-lg font-medium ${
                      isActive
                        ? "text-accent-lime"
                        : "text-muted hover:text-accent-lime"
                    }`
                  }
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 py-2.5 px-2 text-left text-red-400 font-medium border-t border-border mt-2 pt-3"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
