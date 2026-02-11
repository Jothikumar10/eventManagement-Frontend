import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import EventCard from "../../components/Events/EventCard";

export default function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem("token");

  const fetchEvents = useCallback(async () => {
    setFetching(true);
    try {
      const eventRes = await axios.get("https://eventmanagementserver-3qnz.onrender.com/events");
      const fetchedEvents = eventRes.data;
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);

      if (token) {
        const regRes = await axios.get("https://eventmanagementserver-3qnz.onrender.com/registrations/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const regMap = {};
        regRes.data.forEach((reg) => {
          const eventId = reg.event?._id || reg.event;
          regMap[eventId] = reg.status?.toUpperCase();
        });
        setRegistrations(regMap);
      }
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Handle Search Filtering
  useEffect(() => {
    const filtered = events.filter((e) => {
      const title = (e.title || e.name || "").toLowerCase();
      const loc = (e.location || "").toLowerCase();
      return title.includes(searchQuery.toLowerCase()) || loc.includes(searchQuery.toLowerCase());
    });
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://eventmanagementserver-3qnz.onrender.com/registrations",
        {
          eventId: selectedEvent._id,
          name: formData.name,
          email: formData.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Registration request sent!");
      setShowModal(false);
      setIsRegistering(false);
      setFormData({ name: "", email: "" });
      setRegistrations((prev) => ({ ...prev, [selectedEvent._id]: "PENDING" }));
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (event) => {
    setSelectedEvent(event);
    setIsRegistering(false);
    setShowModal(true);
  };

  const getStatusButtonStyles = (status) => {
    switch (status) {
      case "PENDING": return "bg-yellow-500 text-white cursor-not-allowed";
      case "APPROVED": return "bg-green-600 text-white cursor-not-allowed";
      case "REJECTED": return "bg-red-600 text-white cursor-not-allowed";
      default: return "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-black px-4 sm:px-8 py-8 text-white">
      {/* HEADER & SEARCH SECTION */}
      <div className="max-w-7xl mx-auto mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-yellow-400 pl-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">User Dashboard</h1>
            <p className="text-gray-400 italic">Manage your journey and discover new experiences</p>
          </div>
          
          {/* Stats Badges */}
          <div className="flex gap-2">
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="block text-xs text-gray-400 uppercase font-bold">Total Events</span>
              <span className="text-xl font-bold text-yellow-400">{events.length}</span>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="block text-xs text-gray-400 uppercase font-bold">Registered</span>
              <span className="text-xl font-bold text-indigo-400">{Object.keys(registrations).length}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by event name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 outline-none focus:border-yellow-400 transition"
          />
          <span className="absolute right-4 top-3.5 text-gray-500">🔍</span>
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fetching ? (
          // Simple Skeleton Loader
          [1, 2, 3].map((i) => <div key={i} className="h-64 bg-white/5 animate-pulse rounded-2xl"></div>)
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={{
                ...event,
                title: event.title || event.name || "Untitled Event", // Force real name
                image: event.imageUrl || event.image || "/placeholder.png",
              }}
              status={registrations[event._id]}
              onReadMore={() => openDetails(event)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-500 text-xl">No events match your search.</p>
          </div>
        )}
      </div>

      {/* --- EVENT DETAILS & REGISTRATION MODAL --- */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all animate-in zoom-in duration-200">
            
            <div className="h-56 w-full relative">
               <img 
                src={selectedEvent.imageUrl || selectedEvent.image || "/placeholder.png"} 
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
               />
               <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition"
               >✕</button>
            </div>

            <div className="p-8">
              {!isRegistering ? (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">
                        {selectedEvent.title || selectedEvent.name}
                    </h2>
                    <div className="flex gap-3 mt-3">
                        <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded text-gray-600">
                           📍 {selectedEvent.location}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded text-gray-600">
                           📅 {new Date(selectedEvent.date).toLocaleDateString()}
                        </span>
                    </div>
                  </div>
                  
                  <div className="py-4 border-y border-gray-100">
                    <p className="text-gray-600 leading-relaxed max-h-40 overflow-y-auto">
                      {selectedEvent.description || "Join us for this amazing event! Space is limited, so register early to secure your spot."}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition"
                    >
                      Close
                    </button>
                    
                    <button
                      onClick={() => !registrations[selectedEvent._id] && setIsRegistering(true)}
                      disabled={!!registrations[selectedEvent._id]}
                      className={`flex-1 px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${getStatusButtonStyles(registrations[selectedEvent._id])}`}
                    >
                      {registrations[selectedEvent._id] ? (
                        <>{registrations[selectedEvent._id]}</>
                      ) : (
                        "Register Now"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <button onClick={() => setIsRegistering(false)} className="text-indigo-600 text-sm font-bold hover:underline mb-2 block">
                      ← Back to Info
                    </button>
                    <h2 className="text-2xl font-bold">Secure Your Spot</h2>
                    <p className="text-sm text-gray-500">Confirm details for {selectedEvent.title || selectedEvent.name}</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <input
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 focus:border-indigo-500 focus:bg-white outline-none"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 focus:border-indigo-500 focus:bg-white outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg disabled:opacity-50"
                    >
                      {loading ? "Registering..." : "Confirm Registration"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}