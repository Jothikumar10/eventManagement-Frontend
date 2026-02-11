import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const token = localStorage.getItem("token");

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://eventmanagementserver-3qnz.onrender.com/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      showToast("error", "Failed to synchronize events.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent Action: Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`https://eventmanagementserver-3qnz.onrender.com/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e._id !== id));
      showToast("success", "Node successfully removed from Hub.");
    } catch (err) {
      showToast("error", "Termination failed.");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editingEvent.title);
      formData.append("category", editingEvent.category);
      formData.append("date", editingEvent.date);
      if (editingEvent.imageFile) formData.append("image", editingEvent.imageFile);

      await axios.put(
        `https://eventmanagementserver-3qnz.onrender.com/events/${editingEvent._id}`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditingEvent(null);
      setPreviewImage(null);
      showToast("success", "Event configuration updated.");
      fetchEvents();
    } catch (err) {
      showToast("error", "Update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all shadow-2xl
          ${toast.type === "success" ? "bg-green-500/10 border-green-500 text-green-400" : "bg-red-500/10 border-red-500 text-red-400"}`}>
          {toast.message}
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            Manage <span className="text-yellow-400">Inventory</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">Global event repository and control system.</p>
        </div>
        <button 
          onClick={() => navigate("/admin/create-event")}
          className="bg-yellow-400 text-black font-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition shadow-[0_10px_20px_rgba(250,204,21,0.2)]"
        >
          + NEW EVENT
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Event Identifier</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Schedule</th>
                <th className="px-8 py-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-20 text-gray-500 italic">Syncing with Hub Database...</td></tr>
              ) : events.map((event) => (
                <tr key={event._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden">
                        <img src={event.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" />
                      </div>
                      <span className="font-bold text-gray-200">{event.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-black uppercase px-3 py-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-lg">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingEvent(event);
                          setPreviewImage(event.image || null);
                        }}
                        className="p-2 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-yellow-400"
                        title="Edit Configuration"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-red-500"
                        title="Delete Node"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[120] p-4">
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-yellow-400 rounded-full"></span> Modify Event
            </h2>

            <div className="space-y-5">
              <ModalInput label="Event Title" value={editingEvent.title} 
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} />
              
              <ModalInput label="Category" value={editingEvent.category} 
                onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })} />

              <ModalInput label="Date" type="date" value={editingEvent.date.split("T")[0]} 
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Asset Preview</label>
                <div className="relative group rounded-2xl overflow-hidden h-40 bg-black border border-gray-800">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-xs font-bold uppercase">
                    Change Image
                    <input type="file" hidden onChange={(e) => {
                        setEditingEvent({ ...editingEvent, imageFile: e.target.files[0] });
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                    }} />
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setEditingEvent(null)}
                  className="flex-1 px-4 py-4 rounded-xl border border-gray-800 text-gray-400 font-bold uppercase text-xs hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-4 rounded-xl bg-yellow-400 text-black font-black uppercase text-xs hover:bg-yellow-500 transition"
                >
                  Confirm Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- REUSABLE MODAL INPUT --- */
const ModalInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      {...props}
      className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
    />
  </div>
);