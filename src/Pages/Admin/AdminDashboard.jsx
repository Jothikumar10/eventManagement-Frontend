import React from "react";
import { useNavigate } from "react-router-dom";

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ title, value, colorClass }) => (
  <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 blur-[50px] opacity-20 transition-all group-hover:opacity-40 ${colorClass}`}></div>
    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{title}</h3>
    <p className="text-4xl font-black text-white">{value}</p>
  </div>
);

const ActionButton = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="flex-1 min-w-[140px] bg-black border border-gray-800 hover:border-yellow-400 text-gray-400 hover:text-yellow-400 p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 group"
  >
    <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  if (s === "active") return <span className="text-[10px] font-black px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg uppercase">Active</span>;
  if (s === "upcoming") return <span className="text-[10px] font-black px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg uppercase">Upcoming</span>;
  return <span className="text-[10px] font-black px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg uppercase">Closed</span>;
};

/* ================= MAIN DASHBOARD ================= */

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Events", value: 14, color: "bg-blue-500" },
    { label: "Total Users", value: 62, color: "bg-purple-500" },
    { label: "Registrations", value: 248, color: "bg-yellow-500" },
    { label: "Pending Requests", value: 6, color: "bg-red-500" },
  ];

  const recentEvents = [
    { id: 1, title: "React Conference 2026", category: "Technology", date: "Jan 20, 2026", status: "Active" },
    { id: 2, title: "AI Bootcamp Elite", category: "Education", date: "Jan 25, 2026", status: "Upcoming" },
    { id: 3, title: "Global Startup Meetup", category: "Business", date: "Feb 05, 2026", status: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10 space-y-10">
      
      {/* ---------- HEADER ---------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">
            COMMAND <span className="text-yellow-400">CENTER</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Platform-wide overview and administrative controls.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Server Status</p>
            <p className="text-xs text-green-400 font-bold flex items-center justify-end gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Operational
            </p>
          </div>
        </div>
      </div>

      {/* ---------- STATISTICS GRID ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatCard key={item.label} title={item.label} value={item.value} colorClass={item.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ---------- RECENT EVENTS TABLE (8 Cols) ---------- */}
        <div className="lg:col-span-8 bg-gray-900/30 border border-gray-800 rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-2 h-6 bg-yellow-400 rounded-full"></span> Recent Activity
            </h2>
            <button onClick={() => navigate("/admin/manage-events")} className="text-xs font-bold text-yellow-400 hover:underline underline-offset-4">
              View All Events
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  <th className="px-4 py-4 text-left">Event Details</th>
                  <th className="px-4 py-4 text-left">Category</th>
                  <th className="px-4 py-4 text-left">Timeline</th>
                  <th className="px-4 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {recentEvents.map((event) => (
                  <tr key={event.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-4 py-5 font-bold text-gray-200">{event.title}</td>
                    <td className="px-4 py-5 text-sm text-gray-500 italic">{event.category}</td>
                    <td className="px-4 py-5 text-sm text-gray-400">{event.date}</td>
                    <td className="px-4 py-5 text-right"><StatusBadge status={event.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- QUICK ACTIONS (4 Cols) ---------- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-[2.5rem] p-8">
            <h2 className="text-xl font-black mb-6 uppercase tracking-tight">Quick Controls</h2>
            <div className="grid grid-cols-2 gap-4">
              <ActionButton label="Create" icon="➕" onClick={() => navigate("/admin/create-event")} />
              <ActionButton label="Events" icon="🗓️" onClick={() => navigate("/admin/manage-events")} />
              <ActionButton label="Users" icon="👥" onClick={() => navigate("/admin/manage-users")} />
              <ActionButton label="Reports" icon="📈" onClick={() => navigate("/admin/analytics")} />
            </div>
          </div>

          {/* SYSTEM ALERT */}
          <div className="bg-yellow-400 p-6 rounded-[2rem] text-black">
             <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Security Note</p>
             <p className="font-bold text-sm leading-snug">System is currently running on Node 20.x. All registration backups are encrypted.</p>
          </div>
        </div>

      </div>
    </div>
  );
}