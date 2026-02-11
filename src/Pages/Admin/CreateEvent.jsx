import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  
  // 1. ADDED price AND availableSeats TO INITIAL STATE
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: "",
    price: "",          // New Field
    availableSeats: "",   // New Field
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("error", "Unauthorized: Admin access required.");
        return;
      }

      await axios.post("https://eventmanagementserver-3qnz.onrender.com/events", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast("success", "Event published to the Hub!");
      setTimeout(() => navigate("/admin/manage-events"), 1500);
    } catch (error) {
      showToast("error", error.response?.data?.message || "Failed to broadcast event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-400/5 rounded-full blur-[120px]"></div>
      
      {toast.show && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-top duration-300
          ${toast.type === "success" ? "bg-green-500/20 border-green-500 text-green-400" : "bg-red-500/20 border-red-500 text-red-400"}`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Deploy New <span className="text-yellow-400">Event</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">Configure and broadcast a new node to the EventHub network.</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="text-xs font-bold text-gray-500 hover:text-white transition uppercase tracking-widest"
          >
            ← Discard Draft
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8 bg-gray-900/30 border border-gray-800 p-8 rounded-[2.5rem] backdrop-blur-md">
            
            <div className="space-y-6">
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em]">Basic Configuration</h3>
              <div className="space-y-4">
                <InputField label="Event Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Neo-Tech Expo 2026" required />
                <InputField label="Category" name="category" value={formData.category} onChange={handleChange} placeholder="Technology, Art, Business..." required />
              </div>
            </div>

            {/* 2. ADDED TICKETING & CAPACITY SECTION */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em]">Ticketing & Capacity</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InputField 
                  label="Ticket Price (BDT)" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleChange} 
                  placeholder="0 for Free" 
                  required 
                />
                <InputField 
                  label="Available Seats" 
                  name="availableSeats" 
                  type="number" 
                  value={formData.availableSeats} 
                  onChange={handleChange} 
                  placeholder="e.g. 500" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em]">Logistic Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InputField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                <InputField label="Start Time" name="time" type="time" value={formData.time} onChange={handleChange} required />
              </div>
              <InputField label="Venue / Location" name="location" value={formData.location} onChange={handleChange} placeholder="Virtual or Physical Address" required />
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-[0.3em]">Media & Content</h3>
              <div className="space-y-4">
                <InputField label="Cover Image URL" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Detailed Description</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-yellow-400 outline-none transition-all resize-none"
                    placeholder="Describe the event experience..."
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(250,204,21,0.2)] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "INITIALIZING DEPLOYMENT..." : "PUBLISH TO HUB"}
            </button>
          </form>

          {/* PREVIEW SECTION */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Live Preview</h3>
            <div className="sticky top-28 bg-gray-900 border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="h-56 bg-gray-800 flex items-center justify-center relative">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-600 font-bold text-center p-6 italic">No cover image provided</div>
                )}
                <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                  {formData.category || "Category"}
                </div>
                
                {/* 3. ADDED PRICE TAG TO IMAGE PREVIEW */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                  {formData.price > 0 ? `${formData.price} BDT` : "FREE"}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-black leading-tight text-white uppercase break-words">
                  {formData.title || "Your Event Title"}
                </h2>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">📅</span> {formData.date || "Date TBA"} at {formData.time || "Time TBA"}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">📍</span> {formData.location || "Location TBA"}
                  </div>
                  {/* 4. ADDED SEAT CAPACITY TO PREVIEW TEXT */}
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">🎟️</span> {formData.availableSeats || "0"} Seats Available
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500 line-clamp-3 italic">
                    {formData.description || "Projected event description will appear here..."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-400/5 border border-yellow-400/20 p-6 rounded-3xl">
              <p className="text-xs text-yellow-400/70 leading-relaxed font-medium">
                💰 **Finance Insight:** Total potential revenue for this node: <span className="text-white font-bold">{(formData.price * formData.availableSeats).toLocaleString()} BDT</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      {...props}
      className="w-full bg-black border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
    />
  </div>
);