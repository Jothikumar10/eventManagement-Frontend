import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload(); // Refresh to sync auth states
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? "bg-black/80 backdrop-blur-xl py-3 border-b border-gray-800" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10">

        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-black text-xl">E</div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Event<span className="text-yellow-400">Hub</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1">
          <div className="flex items-center gap-6 px-6 py-2 bg-gray-900/40 rounded-full border border-gray-800/50 backdrop-blur-md">
            {/* ADMIN LINKS */}
            {user?.role === "admin" && (
              <>
                <NavItem to="/admin/dashboard" label="Console" active={location.pathname.includes('dashboard')} />
                <NavItem to="/admin/manage-events" label="Events" active={location.pathname.includes('events')} />
                <NavItem to="/admin/registrations" label="Requests" active={location.pathname.includes('registrations')} />
              </>
            )}

            {/* USER LINKS */}
            {user?.role === "user" && (
              <>
                <NavItem to="/user/dashboard" label="Explore" active={location.pathname.includes('dashboard')} />
                <NavItem to="/user/my-events" label="Tickets" active={location.pathname.includes('my-events')} />
                <NavItem to="/user/profile" label="Profile" active={location.pathname.includes('profile')} />
              </>
            )}

            {/* GUEST LINKS */}
            {!user && (
              <>
                <NavItem to="/" label="Home" active={location.pathname === '/'} />
                <NavItem to="/about" label="About" />
              </>
            )}
          </div>

          {/* AUTH ACTIONS */}
          <div className="ml-6">
            {!user ? (
              <Link
                to="/login"
                className="px-8 py-2.5 rounded-full bg-yellow-400 text-black font-black text-xs uppercase tracking-widest hover:bg-yellow-500 transition shadow-[0_0_20px_rgba(250,204,21,0.2)]"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={logout}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
              >
                Logout
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 text-yellow-400"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-gray-800 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4">
            {user?.role === "admin" && (
              <>
                <MobileItem to="/admin/dashboard" setOpen={setOpen} label="Console" />
                <MobileItem to="/admin/manage-events" setOpen={setOpen} label="Events" />
                <MobileItem to="/admin/registrations" setOpen={setOpen} label="Requests" />
              </>
            )}
            {user?.role === "user" && (
              <>
                <MobileItem to="/user/dashboard" setOpen={setOpen} label="Explore" />
                <MobileItem to="/user/my-events" setOpen={setOpen} label="My Tickets" />
                <MobileItem to="/user/profile" setOpen={setOpen} label="Settings" />
              </>
            )}
            {!user ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full py-4 text-center rounded-2xl bg-yellow-400 text-black font-black uppercase tracking-widest"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={logout}
                className="w-full py-4 rounded-2xl border border-red-500/50 text-red-500 font-black uppercase tracking-widest"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

const NavItem = ({ to, label, active }) => (
  <Link
    to={to}
    className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all relative py-1 ${
      active ? "text-yellow-400" : "text-gray-400 hover:text-white"
    }`}
  >
    {label}
    {active && (
      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"></span>
    )}
  </Link>
);

const MobileItem = ({ to, label, setOpen }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="text-lg font-bold text-gray-300 active:text-yellow-400 border-b border-gray-900 pb-2"
  >
    {label}
  </Link>
);