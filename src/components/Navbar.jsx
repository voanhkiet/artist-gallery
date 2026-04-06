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
  className={`md:hidden fixed top-[72px] left-0 w-full bg-black text-white z-50 transition-all duration-300 ${
    open ? "max-h-96 py-6" : "max-h-0 overflow-hidden"
  }`}
>
  <div className="flex flex-col gap-4 text-lg items-start">

    <Link
      to="/"
      className="py-2 border-b border-gray-700 w-full"
      onClick={() => setOpen(false)}
    >
      Gallery
    </Link>

    {!token ? (
      <>
        <Link
          to="/login"
          className="py-2 border-b border-gray-700 w-full"
          onClick={() => setOpen(false)}
        >
          Login
        </Link>

        <Link
          to="/register"
          className="py-2 w-full"
          onClick={() => setOpen(false)}
        >
          Register
        </Link>
      </>
    ) : (
      <>
        <Link
          to="/dashboard"
          className="py-2 border-b border-gray-700 w-full"
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
          className="py-2 text-left w-full text-red-400"
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