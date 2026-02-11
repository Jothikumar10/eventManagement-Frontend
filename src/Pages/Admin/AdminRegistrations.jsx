import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://eventmanagementserver-3qnz.onrender.com/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistrations(res.data);
    } catch (err) {
      showToast("error", "Failed to sync registration queue.");
    }
  };

  const updateRegistrationStatus = async (id, action) => {
    const apiMap = { APPROVE: "approve", REJECT: "reject" };
    const statusMap = { APPROVE: "APPROVED", REJECT: "REJECTED" };

    if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this request?`)) return;

    setLoadingId(id);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://eventmanagementserver-3qnz.onrender.com/registrations/${apiMap[action]}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRegistrations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: statusMap[action] } : r))
      );
      showToast("success", `Request ${statusMap[action].toLowerCase()} successfully.`);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Protocol update failed.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === "PENDING") return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
    if (s === "APPROVED") return "bg-green-500/10 text-green-400 border-green-500/20";
    if (s === "REJECTED") return "bg-red-500/10 text-red-400 border-red-500/20";
    return "bg-gray-800 text-gray-400 border-gray-700";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all shadow-2xl animate-in slide-in-from-top
          ${toast.type === "success" ? "bg-green-500/10 border-green-500 text-green-400" : "bg-red-500/10 border-red-500 text-red-400"}`}>
          {toast.message}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase">
          Registration <span className="text-yellow-400">Queue</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">Verify and manage event access requests.</p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-gray-900/40 border border-gray-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
              <th className="px-8 py-5">Event Detail</th>
              <th className="px-8 py-5">User Identity</th>
              <th className="px-8 py-5">Current Status</th>
              <th className="px-8 py-5 text-center">Protocol Decision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {registrations.map((reg) => {
              const isPending = reg.status?.toUpperCase() === "PENDING";
              const isLoading = loadingId === reg._id;

              return (
                <tr key={reg._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-bold text-gray-200 block">{reg.event?.title || "—"}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-black">{reg.event?.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-300">{reg.user?.name}</span>
                      <span className="text-xs text-gray-500 lowercase">{reg.user?.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusBadge(reg.status)}`}>
                      {reg.status || "UNKNOWN"}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => updateRegistrationStatus(reg._id, "APPROVE")}
                        disabled={isLoading || !isPending}
                        className="px-4 py-2 bg-green-500 text-black text-[10px] font-black uppercase rounded-xl hover:bg-green-400 transition-all disabled:opacity-20 disabled:grayscale"
                      >
                        {isLoading && loadingId === reg._id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => updateRegistrationStatus(reg._id, "REJECT")}
                        disabled={isLoading || !isPending}
                        className="px-4 py-2 border border-red-500/50 text-red-500 text-[10px] font-black uppercase rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-20"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {registrations.length === 0 && (
          <div className="text-center py-20 text-gray-600 font-bold uppercase tracking-widest text-xs italic">
            Queue is empty. No pending handshakes.
          </div>
        )}
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {registrations.map((reg) => {
          const isPending = reg.status?.toUpperCase() === "PENDING";
          return (
            <div key={reg._id} className="bg-gray-900 border border-gray-800 p-6 rounded-[2rem]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-black text-white uppercase tracking-tight">{reg.event?.title}</h4>
                  <p className="text-xs text-gray-500">{reg.user?.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-md border text-[8px] font-black uppercase tracking-widest ${getStatusBadge(reg.status)}`}>
                  {reg.status}
                </span>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => updateRegistrationStatus(reg._id, "APPROVE")}
                  disabled={loadingId || !isPending}
                  className="flex-1 bg-green-500 text-black py-3 rounded-xl font-black text-[10px] uppercase disabled:opacity-20"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateRegistrationStatus(reg._id, "REJECT")}
                  disabled={loadingId || !isPending}
                  className="flex-1 border border-red-500 text-red-500 py-3 rounded-xl font-black text-[10px] uppercase disabled:opacity-20"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
          <span className="text-indigo-400 mr-2">ℹ</span>
          System Auto-Archive: Approved registrations are pushed to the user tickets module instantly. Rejected users can re-apply if event settings allow.
        </p>
      </div>
    </div>
  );
}