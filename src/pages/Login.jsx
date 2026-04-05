import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await login(email, password);
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        className="w-full border p-3 mb-4 rounded-lg"
        placeholder="Email"
      />

      <input
        className="w-full border p-3 mb-4 rounded-lg"
        type="password"
        placeholder="Password"
      />

      <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
        Login
      </button>
    </div>
  </div>
);
}