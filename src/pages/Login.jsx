import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, Zap, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(form);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-bgSoft items-center justify-center">
        <div className="absolute w-96 h-96 bg-accent-lime/10 blur-[120px] rounded-full -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-accent-violet/10 blur-[120px] rounded-full bottom-0 right-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-md px-10"
        >
          <Link to="/" className="flex items-center gap-2 mb-10">
            <Zap className="w-7 h-7 text-accent-lime" fill="currentColor" />
            <span className="font-display text-2xl font-semibold">
              Volt<span className="gradient-text">rix</span>
            </span>
          </Link>
          <h1 className="font-display text-4xl font-semibold leading-tight mb-4">
            Welcome back to the <span className="gradient-text">future</span> of
            tech.
          </h1>
          <p className="text-muted leading-relaxed">
            Sign in to track orders, manage your wishlist, and get early access
            to drops.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <h2 className="font-display text-3xl font-semibold mb-2">Sign In</h2>
          <p className="text-muted text-sm mb-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent-lime hover:underline">
              Create one
            </Link>
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                name="username"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3.5 text-sm
                           focus:outline-none focus:border-accent-lime focus:shadow-glow transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-card border border-border rounded-xl pl-11 pr-11 py-3.5 text-sm
                           focus:outline-none focus:border-accent-lime focus:shadow-glow transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2 text-muted cursor-pointer">
              <input
                type="checkbox"
                className="accent-accent-lime w-4 h-4 rounded"
              />
              Remember me
            </label>
            <a href="#" className="text-accent-lime hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            loading={loading}
            className="w-full"
          >
            Sign In
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
