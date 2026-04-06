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
    <nav className="bg-black text-white px-6 md:px-10 py-5 shadow-lg">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        
        <h1 className="text-xl md:text-2xl font-bold">
          🎨 Art Gallery
        </h1>

        {/* ☰ Mobile button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
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
      {open && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-lg">
          <Link to="/" onClick={() => setOpen(false)}>
            Gallery
          </Link>

          {!token ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-left text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}