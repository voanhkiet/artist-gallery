import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-10 py-5 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide">🎨 Art Gallery</h1>

      <div className="flex gap-8 text-lg">
        <Link className="hover:text-gray-400 transition" to="/">Gallery</Link>
        <Link className="hover:text-gray-400 transition" to="/login">Login</Link>
        <Link className="hover:text-gray-400 transition" to="/register">Register</Link>
        <Link className="hover:text-gray-400 transition" to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}