import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://eventmanagementserver-3qnz.onrender.com/auth/signup", {
        ...formData,
        role: "user",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      showToast("success", "Account created successfully!");

      setTimeout(() => {
        navigate("/user/dashboard");
      }, 1000);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Background Glow Decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-400/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-lg relative">
        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-top duration-300
            ${toast.type === "success" ? "bg-green-500/20 border-green-500 text-green-400" : "bg-red-500/20 border-red-500 text-red-400"}`}>
            {toast.message}
          </div>
        )}

        {/* Signup Card */}
        <div className="bg-gray-900/50 border border-gray-800 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">
              EVENTHUB<span className="text-yellow-400">.</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">Join the Community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder-gray-600 
                           focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder-gray-600 
                           focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder-gray-600 
                           focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-2xl
                         shadow-[0_10px_20px_rgba(250,204,21,0.2)] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : "Get Started"}
            </button>

            {/* Redirect to Login */}
            <div className="pt-6 text-center">
              <p className="text-sm text-gray-500">
                Already part of EVENTR?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-yellow-400 font-bold hover:underline underline-offset-4 transition"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Decorative Text */}
        <p className="text-center text-[10px] text-gray-600 mt-8 uppercase tracking-[0.3em]">
          Professional Event Management Solutions
        </p>
      </div>
    </section>
  );
}