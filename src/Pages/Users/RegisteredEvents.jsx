import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../components/Events/EventCard";

const BASE_URL = "https://eventmanagementserver-3qnz.onrender.com";

export default function RegisteredEvents() {
  const [registrations, setRegistrations] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/registrations/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRegistrations(res.data || []);
    } catch (error) {
      console.error("Failed to load registrations:", error);
    }
  };

  const resolveImage = (event) => {
    if (!event) return "/placeholder.png";
    if (event.imageUrl?.startsWith("http")) return event.imageUrl;
    if (event.image) {
      const path = event.image.startsWith("/") ? event.image : `/${event.image}`;
      return `${BASE_URL}${path}`;
    }
    return "/placeholder.png";
  };

  const handleCancel = async (registrationId) => {
    const confirm = window.confirm("Are you sure you want to cancel this registration?");
    if (!confirm) return;

    try {
      setCancelingId(registrationId);
      const token = localStorage.getItem("token");

      await axios.delete(
        `${BASE_URL}/registrations/${registrationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRegistrations((prev) => prev.filter((reg) => reg._id !== registrationId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel registration");
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 sm:px-8 py-8">
      <h1 className="text-3xl font-bold text-yellow-300 mb-8 text-center sm:text-left">
        My Registered Events
      </h1>

      {registrations.length === 0 ? (
        <p className="text-gray-400 text-center">
          You have not registered for any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg) => {
            const event = reg.event || {};
            
            // FIX: Cancel is ONLY allowed if the status is PENDING.
            // Once Admin gives APPROVAL or REJECTION, the button disappears.
            const currentStatus = reg.status?.toUpperCase();
            const canCancel = currentStatus === "PENDING";

            return (
              <div key={reg._id} className="relative flex flex-col">
                <EventCard
                  event={{
                    ...event,
                    title: event.title || "Untitled Event",
                    image: resolveImage(event),
                  }}
                  status={reg.status}
                  onReadMore={() => {}}
                />

                {/* The button container ensures it only renders when PENDING */}
                <div className="mt-3 min-h-[40px]"> 
                  {canCancel ? (
                    <button
                      onClick={() => handleCancel(reg._id)}
                      disabled={cancelingId === reg._id}
                      className="w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {cancelingId === reg._id ? "Cancelling..." : "Cancel Request"}
                    </button>
                  ) : (
                    <div className="w-full py-2 text-center text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-800 rounded-lg">
                      Status Locked
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}