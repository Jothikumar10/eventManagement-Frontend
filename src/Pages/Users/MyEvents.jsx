import { useEffect, useState } from "react";
import axios from "axios";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get("https://eventmanagementserver-3qnz.onrender.com/registrations/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching my events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, [token]);

  // Helper function to check if event date has passed
  const isExpired = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    // Set hours to 23:59:59 so the ticket is valid until the very end of the event day
    event.setHours(23, 59, 59, 999);
    return today > event;
  };

  if (loading) return <p className="text-center py-10">Loading your events...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-white-800">My Registered Events</h1>
      
      {events.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No event requests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((reg) => {
            const status = reg.status?.toUpperCase();
            const eventDetails = reg.event || {};
            const expired = isExpired(eventDetails.date);

            return (
              <div key={reg._id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${expired && status === "APPROVED" ? "opacity-75" : ""}`}>
                
                {/* Header section based on status & expiry */}
                <div className={`px-5 py-3 text-xs font-bold uppercase tracking-wider ${
                  expired && status === "APPROVED" ? "bg-gray-200 text-gray-600" :
                  status === "APPROVED" ? "bg-green-100 text-green-700" :
                  status === "REJECTED" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {expired && status === "APPROVED" ? "EXPIRED" : status}
                </div>

                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {eventDetails.title || "Untitled Event"}
                  </h2>
                  
                  {status === "APPROVED" ? (
                    <div className="mt-4 space-y-4">
                      <div className={`${expired ? "bg-gray-50 border-gray-200" : "bg-indigo-50 border-indigo-100"} p-4 rounded-xl border`}>
                        <p className={`text-sm font-semibold mb-2 flex items-center gap-2 ${expired ? "text-gray-500" : "text-indigo-800"}`}>
                          {expired ? <span>🚫 Ticket Expired</span> : <span>✅ Registration Confirmed</span>}
                        </p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><b>Date:</b> {new Date(eventDetails.date).toLocaleDateString()}</p>
                          <p><b>Location:</b> {eventDetails.location}</p>
                        </div>
                      </div>
                      
                      {expired ? (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-center">
                          <p className="text-xs text-red-600 font-bold uppercase tracking-tight">
                            This event has ended. Ticket is no longer valid.
                          </p>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setSelectedTicket(reg)}
                          className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
                        >
                          View Digital Ticket
                        </button>
                      )}
                    </div>
                  ) : status === "REJECTED" ? (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                      Registration declined by admin.
                    </div>
                  ) : (
                    <div className="mt-4 p-4 border border-dashed border-yellow-200 rounded-xl text-sm text-yellow-700">
                      Waiting for approval...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- TICKET MODAL (Only opens if not expired) --- */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full animate-in zoom-in duration-300">
            <div className="bg-indigo-600 p-6 text-white text-center relative">
              <button 
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >✕</button>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black mb-1 opacity-80">Official Entry Pass</p>
              <h3 className="text-xl font-bold truncate">{selectedTicket.event?.title}</h3>
            </div>

            <div className="p-8 space-y-6 text-center">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-gray-400">Attendee</p>
                <p className="text-lg font-bold text-gray-800">{selectedTicket.name || "Guest"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Date</p>
                  <p className="text-sm font-bold">{new Date(selectedTicket.event?.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Location</p>
                  <p className="text-sm font-bold truncate">{selectedTicket.event?.location}</p>
                </div>
              </div>

              <div className="flex flex-col items-center py-2">
                <div className="w-32 h-32 bg-gray-100 rounded-xl border-4 border-white shadow-inner flex items-center justify-center relative overflow-hidden">
                  <div className="grid grid-cols-3 gap-1 opacity-20">
                    {[...Array(9)].map((_, i) => <div key={i} className="w-6 h-6 bg-black rounded-sm"></div>)}
                  </div>
                  <span className="absolute text-[8px] font-black text-gray-400 uppercase">Valid Entry</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-3 font-mono">REG-ID: {selectedTicket._id.slice(-8).toUpperCase()}</p>
              </div>

              <button onClick={() => window.print()} className="text-xs font-bold text-indigo-600 hover:underline">
                Print Ticket (PDF)
              </button>
            </div>
            
            <div className="relative h-6 bg-gray-50 flex items-center">
                <div className="absolute -left-3 w-6 h-6 bg-black/60 rounded-full"></div>
                <div className="w-full border-t-2 border-dashed border-gray-200"></div>
                <div className="absolute -right-3 w-6 h-6 bg-black/60 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}