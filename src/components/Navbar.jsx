import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white py-5 sticky top-0 z-40">
      <div className="px-6 md:px-10 flex justify-between items-center">
        
        {/* LOGO */}
        <h1 className="text-xl md:text-2xl font-bold">
          🎨 Art Gallery
        </h1>

        {/* ☰ MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          <span className="transition-transform duration-300">
  {open ? "✖" : "☰"}
</span>
        </button>

        {/* 💻 DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-lg items-center">
          <Link
  to="/"
  className={`py-4 border-b border-gray-800 transition ${
    location.pathname === "/"
      ? "text-white bg-white/10 rounded-lg px-3"
      : "hover:text-gray-400"
  }`}
>
  Gallery
</Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-400">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

    
 {open && (
  <div
    className="fixed inset-0 bg-black/70 z-40"
    onClick={() => setOpen(false)}
  />
)}   

      {/* 📱 MOBILE MENU */}
{/* 📱 MOBILE MENU */}
<div
  className={`fixed inset-0 flex justify-center items-start pt-14 z-50 transition-all duration-300 ${
    open ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  {/* OVERLAY */}
  <div
    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
    onClick={() => setOpen(false)}
  />

  {/* MENU PANEL */}
  <div className="relative mt-2 w-[92%] md:w-[600px] max-w-md bg-black text-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-slideDown">

    {/* HEADER */}
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
      <h1 className="text-xl font-bold">🎨 Art Gallery</h1>
      <button onClick={() => setOpen(false)} className="text-2xl">
        ✖
      </button>
    </div>

    {/* ITEMS */}
    <div className="flex flex-col px-6 text-lg">

      <Link
        to="/"
className="py-4 border-b border-gray-800 hover:text-gray-400 hover:bg-white/5 rounded-lg px-3 active:scale-[0.98] transition"      >
        Gallery
      </Link>

      {!token ? (
        <>
          <Link
            to="/login"
className="py-4 border-b border-gray-800 hover:text-gray-400 hover:bg-white/5 rounded-lg px-3 active:scale-[0.98] transition"            onClick={() => setOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
className="py-4 border-b border-gray-800 hover:text-gray-400 hover:bg-white/5 rounded-lg px-3 active:scale-[0.98] transition"            onClick={() => setOpen(false)}
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/dashboard"
className="py-4 border-b border-gray-800 hover:text-gray-400 hover:bg-white/5 rounded-lg px-3 active:scale-[0.98] transition"            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
className="py-4 border-b border-gray-800 hover:text-gray-400 hover:bg-white/5 rounded-lg px-3 active:scale-[0.98] transition"          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
</div>
    </nav>
  );
}