import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Save } from "lucide-react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/userService";

export default function Settings() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    getProfile()
      .then((res) =>
        setProfile({
          username: res.data.username || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
        }),
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setProfileMsg("");
    try {
      const res = await updateProfile(profile);
      localStorage.setItem("user", JSON.stringify(res.data));
      setProfileMsg("Profile updated successfully.");
    } catch {
      setProfileMsg("Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPwSaving(true);
    setPwMsg("");
    setPwError("");
    try {
      await changePassword(passwords);
      setPwMsg("Password changed successfully.");
      setPasswords({ old_password: "", new_password: "" });
    } catch (err) {
      setPwError(err?.response?.data?.detail || "Could not change password.");
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-6 md:px-10 pt-28 pb-16 max-w-2xl w-full mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-semibold mb-8"
          >
            Settings
          </motion.h1>

          {!loading && (
            <>
              {/* Profile form */}
              <form
                onSubmit={handleProfileSave}
                className="glass-card p-6 mb-6"
              >
                <h2 className="font-display text-lg font-semibold mb-5">
                  Profile Information
                </h2>

                <div className="space-y-4 mb-5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })
                      }
                      placeholder="Username"
                      className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent-lime"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      placeholder="Email"
                      className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent-lime"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      placeholder="Phone number"
                      className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent-lime"
                    />
                  </div>
                </div>

                {profileMsg && (
                  <p className="text-xs text-accent-lime mb-4">{profileMsg}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  icon={Save}
                  loading={saving}
                >
                  Save Changes
                </Button>
              </form>

              {/* Password form */}
              <form onSubmit={handlePasswordSave} className="glass-card p-6">
                <h2 className="font-display text-lg font-semibold mb-5">
                  Change Password
                </h2>

                <div className="space-y-4 mb-5">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="password"
                      value={passwords.old_password}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          old_password: e.target.value,
                        })
                      }
                      placeholder="Current password"
                      required
                      className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent-lime"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="password"
                      value={passwords.new_password}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          new_password: e.target.value,
                        })
                      }
                      placeholder="New password"
                      required
                      className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent-lime"
                    />
                  </div>
                </div>

                {pwMsg && (
                  <p className="text-xs text-accent-lime mb-4">{pwMsg}</p>
                )}
                {pwError && (
                  <p className="text-xs text-red-400 mb-4">{pwError}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  icon={Save}
                  loading={pwSaving}
                >
                  Update Password
                </Button>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
