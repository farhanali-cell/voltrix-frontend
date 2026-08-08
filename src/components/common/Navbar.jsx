import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  Bell,
  User,
  Zap,
  ChevronDown,
  LayoutDashboard,
  Package,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCategories } from "../../services/productService";
import NotificationDropdown from "../notifications/NotificationDropdown";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notificationService";

const moreLinks = [
  { label: "About Us", path: "/about" },
  { label: "Careers", path: "/careers" },
  { label: "Reviews", path: "/reviews" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const catRef = useRef(null);
  const moreRef = useRef(null);
  const profileRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getNotifications()
        .then((res) => setNotifications(res.data.results || res.data))
        .catch(() => setNotifications([]));
    }
  }, [isLoggedIn]);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catRef.current && !catRef.current.contains(e.target))
        setCategoriesOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target))
        setMoreOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Zap
            className="w-7 h-7 text-accent-lime group-hover:animate-glowPulse"
            fill="currentColor"
          />
          <span className="font-display text-2xl font-semibold tracking-tight">
            Volt<span className="gradient-text">rix</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative font-medium text-sm transition-colors ${
                isActive ? "text-accent-lime" : "text-muted hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `relative font-medium text-sm transition-colors ${
                isActive ? "text-accent-lime" : "text-muted hover:text-white"
              }`
            }
          >
            Products
          </NavLink>

          {/* Categories dropdown */}
          <div ref={catRef} className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-1 font-medium text-sm text-muted hover:text-white transition-colors"
            >
              Categories
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-3 w-52 glass-card overflow-hidden z-50 origin-top-left"
                >
                  {categories.length === 0 ? (
                    <p className="px-4 py-3 text-xs text-muted">
                      No categories yet.
                    </p>
                  ) : (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="block px-4 py-2.5 text-sm text-muted hover:text-accent-lime hover:bg-card/60 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/track-order"
            className={({ isActive }) =>
              `relative font-medium text-sm transition-colors ${
                isActive ? "text-accent-lime" : "text-muted hover:text-white"
              }`
            }
          >
            Track Order
          </NavLink>

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 font-medium text-sm text-muted hover:text-white transition-colors"
            >
              More
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-3 w-44 glass-card overflow-hidden z-50 origin-top-left"
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2.5 text-sm text-muted hover:text-accent-lime hover:bg-card/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side */}
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

          {isLoggedIn ? (
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
          ) : (
            <div className="flex items-center gap-3 pl-2 border-l border-border">
              <Link
                to="/login"
                className="text-sm font-medium text-muted hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-accent-lime text-bg text-sm font-semibold px-5 py-2 rounded-full hover:shadow-glow transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-card mx-4 mt-3"
          >
            <div className="flex flex-col p-4 gap-1">
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "/products" },
                { label: "Track Order", path: "/track-order" },
                { label: "About Us", path: "/about" },
                { label: "Careers", path: "/careers" },
                { label: "Reviews", path: "/reviews" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-muted hover:text-accent-lime font-medium"
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="border-t border-border mt-2 pt-3">
                {isLoggedIn ? (
                  <>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 text-muted hover:text-accent-lime font-medium"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left py-2.5 text-red-400 font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3 pt-1">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center py-2.5 rounded-full border border-border text-sm font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center py-2.5 rounded-full bg-accent-lime text-bg text-sm font-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
