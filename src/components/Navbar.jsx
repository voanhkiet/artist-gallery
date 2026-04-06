import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
   <nav className="bg-black text-white py-5">
    <div className="px-10 flex justify-between items-center">
        
        <h1 className="text-xl md:text-2xl font-bold">
          🎨 Art Gallery
        </h1>

        {/* ☰ Mobile button */}
<button
  className="md:hidden text-2xl"
  onClick={() => setOpen(!open)}
>
  {open ? "✖" : "☰"}
</button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-lg items-center">
          <Link to="/" className="hover:text-gray-400">
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

     {/* 📱 MOBILE MENU */}
<div
  className={`fixed top-0 left-0 w-full h-screen bg-black text-white z-50 transition-all duration-300 ${
    open ? "translate-y-0" : "-translate-y-full"
  }`}
>

  {/* 🔥 HEADER */}
  <div className="flex justify-between items-center px-6 py-5 border-b border-gray-800">
    <h1 className="text-xl font-bold">🎨 Art Gallery</h1>

    <button onClick={() => setOpen(false)} className="text-2xl">
      ✖
    </button>
  </div>

  {/* 🔥 MENU ITEMS */}
  <div className="flex flex-col px-6 mt-6 text-lg">

    <Link
      to="/"
      className="py-4 border-b border-gray-800 w-full"
      onClick={() => setOpen(false)}
    >
      Gallery
    </Link>

    {!token ? (
      <>
        <Link
          to="/login"
          className="py-4 border-b border-gray-800 w-full"
          onClick={() => setOpen(false)}
        >
          Login
        </Link>

        <Link
          to="/register"
          className="py-4 w-full"
          onClick={() => setOpen(false)}
        >
          Register
        </Link>
      </>
    ) : (
      <>
        <Link
          to="/dashboard"
          className="py-4 border-b border-gray-800 w-full"
          onClick={() => setOpen(false)}
        >
          Dashboard
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
            setOpen(false);
          }}
          className="py-4 text-left w-full text-red-400"
        >
          Logout
        </button>
      </>
    )}
  </div>
</div>
    </nav>
  );
}