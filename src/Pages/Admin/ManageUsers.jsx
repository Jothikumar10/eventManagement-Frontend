import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const token = localStorage.getItem("token");

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://eventmanagementserver-3qnz.onrender.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      showToast("error", error.response?.data?.message || "User synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("CRITICAL: Permanent deletion of user identity. Proceed?")) return;
    try {
      await axios.delete(`https://eventmanagementserver-3qnz.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("success", "User identity purged from database.");
      fetchUsers();
    } catch (err) {
      showToast("error", "Purge failed.");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axios.put(
        `https://eventmanagementserver-3qnz.onrender.com/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("success", `Permission level updated to: ${role.toUpperCase()}`);
      fetchUsers();
    } catch (err) {
      showToast("error", "Failed to modify permissions.");
    }
  };

  const toggleBlock = async (id) => {
    try {
      await axios.put(
        `https://eventmanagementserver-3qnz.onrender.com/users/${id}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("success", "User status toggled successfully.");
      fetchUsers();
    } catch (err) {
      showToast("error", "Status update failed.");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-6 lg:p-10 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all shadow-2xl
          ${toast.type === "success" ? "bg-green-500/10 border-green-500 text-green-400" : "bg-red-500/10 border-red-500 text-red-400"}`}>
          {toast.message}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase">
          User <span className="text-yellow-400">Directory</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">Manage access protocols and platform permissions.</p>
      </div>

      {/* USER TABLE CONTAINER */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Accessing User Database...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-gray-500 italic">No nodes detected in the user directory.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  <th className="px-8 py-5">Profile</th>
                  <th className="px-8 py-5">Access Level</th>
                  <th className="px-8 py-5">Hub Status</th>
                  <th className="px-8 py-5 text-right">Administrative Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                    {/* User Info */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center font-black text-black">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-200">{user.name}</span>
                          <span className="text-xs text-gray-500 lowercase">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Role Selection */}
                    <td className="px-8 py-5">
                      <select
                        value={user.role}
                        onChange={(e) => changeRole(user._id, e.target.value)}
                        className="bg-black border border-gray-800 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:border-yellow-400 text-gray-300 transition"
                      >
                        <option value="user">USER</option>
                        <option value="admin">ADMIN</option>
                      </select>
                    </td>

                    {/* Block Status */}
                    <td className="px-8 py-5">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${
                          user.isBlocked
                            ? "bg-red-500/10 border-red-500 text-red-500"
                            : "bg-green-500/10 border-green-500 text-green-500"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => toggleBlock(user._id)}
                          className={`text-[10px] font-black uppercase px-4 py-2 rounded-xl transition shadow-sm ${
                            user.isBlocked
                              ? "bg-gray-800 text-white hover:bg-white hover:text-black"
                              : "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400 hover:text-black"
                          }`}
                        >
                          {user.isBlocked ? "Restore Access" : "Revoke Access"}
                        </button>

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition"
                          title="Purge User"
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
        )}
      </div>

      <div className="mt-8 p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-3xl">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <span className="text-yellow-400">🛡️</span> Security Note: Changes to user roles or block status take effect immediately on the next user handshake.
        </p>
      </div>
    </section>
  );
}