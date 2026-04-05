import { useNavigate } from "react-router-dom";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login"); // redirect
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1>My App</h1>

      {token ? (
        <button onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <span>Not logged in</span>
      )}
    </nav>
  );
}

export default Navbar;