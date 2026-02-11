import { CalendarDays, MapPin, Tag } from "lucide-react";

export default function EventCard({ event, onReadMore, status }) {
  if (!event) {
    return null; // safe guard
  }

  const statusStyles = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-400",
    APPROVED: "bg-green-500/20 text-green-400 border-green-400",
    REJECTED: "bg-red-500/20 text-red-400 border-red-400",
  };

  const {
    image,
    eventName,
    date,
    location,
    category,
    description,
  } = event;

  return (
    
    <div className=" border-yellow-400/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition duration-300 flex flex-col group">
      
      {/* EVENT IMAGE */}
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/400"}
          alt={eventName || "Event image"}
          className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* STATUS BADGE */}
        {status && statusStyles[status] && (
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full border backdrop-blur ${statusStyles[status]}`}
          >
            {status}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1 text-white">
        
        {/* TITLE */}
        <h3 className="text-lg font-bold text-yellow-300 mb-1">
          {eventName || "Untitled Event"}
        </h3>

        {/* META INFO */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-3">
          {date && (
            <span className="flex items-center gap-1">
              <CalendarDays size={14} />
              {new Date(date).toLocaleDateString()}
            </span>
          )}

          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </span>
          )}

          {category && (
            <span className="flex items-center gap-1">
              <Tag size={14} />
              {category}
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 line-clamp-3 mb-4">
          {description || "No description available."}
        </p>

        {/* ACTION */}
        <button
          onClick={() => onReadMore && onReadMore(event)}
          className="mt-auto bg-yellow-300 text-black text-sm font-semibold py-2.5 rounded-lg hover:bg-yellow-400 transition"
        >
          View Details / Register
        </button>
      </div>
    </div>
  );
}
