import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null); // State for the modal
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
  });
  const [registrations, setRegistrations] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("https://eventmanagementserver-3qnz.onrender.com/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          bio: res.data.bio || "",
          address: res.data.address || "",
        });
        fetchRegistrations();
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://eventmanagementserver-3qnz.onrender.com/registrations/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistrations(res.data);
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
    }
  };

  // Helper to check expiry
  const isExpired = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    event.setHours(23, 59, 59, 999);
    return today > event;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("https://eventmanagementserver-3qnz.onrender.com/users/avatar", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, avatar: res.data.avatar });
      showToast("success", "Profile picture updated!");
    } catch {
      showToast("error", "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("https://eventmanagementserver-3qnz.onrender.com/users/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEditing(false);
      showToast("success", "Profile updated!");
    } catch {
      showToast("error", "Save failed.");
    }
  };

  const calculateProgress = () => {
    const fields = [user?.name, user?.email, user?.phone, user?.bio, user?.address, user?.avatar];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const getStatusStyle = (status, eventDate) => {
    if (isExpired(eventDate) && status?.toLowerCase() === "approved") {
        return "bg-gray-500/20 text-gray-400 border border-gray-500/50";
    }
    const s = status?.toLowerCase();
    if (s === "approved") return "bg-green-500/20 text-green-400 border border-green-500/50";
    if (s === "pending") return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50";
    return "bg-red-500/20 text-red-400 border border-red-500/50";
  };

  if (!user) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-yellow-300">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      {toast.show && (
        <div className={`fixed top-10 right-10 z-50 px-6 py-3 rounded-xl shadow-2xl animate-bounce ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {toast.message}
        </div>
      )}

      {/* --- TICKET MODAL --- */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            
            {/* Expiry Overlay on Modal */}
            {isExpired(selectedTicket.event?.date) && (
                <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rotate-12 pointer-events-none">
                    <div className="border-4 border-red-600 px-6 py-2 text-red-600 font-black text-4xl uppercase opacity-80">Expired</div>
                </div>
            )}

            <div className={`${isExpired(selectedTicket.event?.date) ? 'bg-gray-400' : 'bg-indigo-600'} p-8 text-white text-center`}>
              <button onClick={() => setSelectedTicket(null)} className="absolute top-6 right-6 text-white/80 hover:text-white">✕</button>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Entry Pass</p>
              <h2 className="text-2xl font-black mt-2 leading-tight">{selectedTicket.event?.title}</h2>
            </div>

            <div className="p-8 space-y-6 text-black">
              <div className="flex justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Attendee</p>
                  <p className="font-bold">{user.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Ticket No.</p>
                  <p className="font-mono text-sm">#{selectedTicket._id.slice(-6).toUpperCase()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-dashed border-gray-200 py-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Date</p>
                  <p className="font-bold text-sm">{new Date(selectedTicket.event?.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
                  <p className="font-bold text-sm truncate">{selectedTicket.event?.location}</p>
                </div>
              </div>

              <div className="flex flex-col items-center pt-4">
                <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-50">
                  {/* Decorative QR Lines */}
                  <div className="grid grid-cols-4 gap-1 opacity-10">
                    {[...Array(16)].map((_, i) => <div key={i} className="w-5 h-5 bg-black"></div>)}
                  </div>
                  <span className="absolute text-[8px] font-black text-gray-300">VALIDATED QR</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-4 font-black">SCAN AT ENTRANCE</p>
              </div>
            </div>

            <div className="relative h-8 bg-gray-50 flex items-center">
                <div className="absolute -left-4 w-8 h-8 bg-black rounded-full"></div>
                <div className="w-full border-t-2 border-dashed border-gray-200"></div>
                <div className="absolute -right-4 w-8 h-8 bg-black rounded-full"></div>
            </div>
            
            {!isExpired(selectedTicket.event?.date) && (
                <button onClick={() => window.print()} className="w-full py-4 bg-indigo-50 text-indigo-600 font-bold text-xs hover:bg-indigo-100 transition">
                    Print Ticket
                </button>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 text-center backdrop-blur-sm">
            <div className="relative w-36 h-36 mx-auto group">
              <img
                src={user.avatar ? `http://localhost:5000${user.avatar}` : "https://ui-avatars.com/api/?name=" + user.name}
                className="w-full h-full rounded-full object-cover border-4 border-yellow-400"
                alt="Profile"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer">
                <input hidden type="file" onChange={handlePhotoUpload} />
                <span className="text-2xl">📷</span>
              </label>
              {uploading && <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center text-xs text-yellow-300">Uploading...</div>}
            </div>
            <h2 className="mt-6 text-2xl font-black text-white">{user.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{user.email}</p>
            <div className="mt-6 text-left">
               <div className="flex justify-between text-xs font-bold mb-1 text-gray-400 uppercase">
                 <span>Profile Strength</span>
                 <span>{calculateProgress()}%</span>
               </div>
               <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                 <div className="bg-yellow-400 h-full transition-all duration-1000" style={{ width: `${calculateProgress()}%` }}></div>
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-300 flex items-center gap-2">👤 Personal Information</h3>
              <button 
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={`px-6 py-2 rounded-xl font-bold transition ${editing ? "bg-green-600 text-white" : "bg-yellow-400 text-black"}`}
              >
                {editing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <ProfileField label="Full Name" value={form.name} editing={editing} onChange={(v) => setForm({...form, name: v})} />
              <ProfileField label="Phone Number" value={form.phone} editing={editing} onChange={(v) => setForm({...form, phone: v})} />
              <ProfileField label="Location" value={form.address} editing={editing} onChange={(v) => setForm({...form, address: v})} />
              <ProfileField label="Your Bio" value={form.bio} editing={editing} onChange={(v) => setForm({...form, bio: v})} />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-yellow-300 mb-6 flex items-center gap-2">🎟️ Registered Events</h3>
            {registrations.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-700 rounded-2xl text-sm italic">No registrations yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {registrations.map((reg) => {
                  const expired = isExpired(reg.event?.date);
                  return (
                    <div key={reg._id} className={`bg-gray-900/80 p-5 rounded-2xl border border-gray-700 transition group ${expired ? 'opacity-60' : 'hover:border-yellow-400/50'}`}>
                      <div className="flex justify-between items-start mb-3">
                         <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${getStatusStyle(reg.status, reg.event?.date)}`}>
                           {expired && reg.status === "approved" ? "Expired" : reg.status}
                         </span>
                      </div>
                      <h4 className="font-bold text-white text-lg">{reg.event?.title}</h4>
                      <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                         📅 {new Date(reg.event?.date).toLocaleDateString()}
                      </p>
                      
                      {reg.status?.toLowerCase() === 'approved' && (
                         <button 
                            onClick={() => setSelectedTicket(reg)}
                            className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition ${expired ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black'}`}
                         >
                           {expired ? "Event Ended" : "View Ticket"}
                         </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileField = ({ label, value, editing, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-gray-500 uppercase ml-1 tracking-widest">{label}</label>
    {editing ? (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition"
      />
    ) : (
      <div className="w-full bg-gray-900/30 border border-transparent rounded-xl px-4 py-3 text-gray-300 font-medium italic">
        {value || "Not provided"}
      </div>
    )}
  </div>
);