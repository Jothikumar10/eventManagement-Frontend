import { NavLink } from "react-router-dom";

export default function Sidebar({ role }) {
  const links =
    role === "admin"
      ? [
          { name: "Dashboard", path: "/admin/dashboard" },
          { name: "Manage Events", path: "/admin/events" },
          { name: "Users", path: "/admin/users" },
          { name: "Analytics", path: "/admin/analytics" },
        ]
      : [
          { name: "Dashboard", path: "/user/dashboard" },
          { name: "My Events", path: "/user/my-events" },
          { name: "Registered", path: "/user/registered" },
          { name: "Profile", path: "/user/profile" },
        ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 shadow-lg">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Event Manager
      </div>

      <nav className="mt-4 flex flex-col space-y-1 px-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
