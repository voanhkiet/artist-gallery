import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-10 py-5 flex justify-between items-center shadow-lg">
      
      {/* LEFT */}
      <h1 className="text-2xl font-bold">🎨 Art Gallery</h1>

      {/* RIGHT */}
      <div className="flex gap-8 text-lg items-center">
        
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
    </nav>
  );
}