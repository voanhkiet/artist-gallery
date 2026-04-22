import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚨 MUST HAVE

    try {
      const res = await login(form);

      console.log(res); // debug
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

     

      setToken(res.token); 
      alert("Login success ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow w-full max-w-md space-y-5"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Login
      </button>

      <p className="text-sm text-center text-gray-500">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-500">
          Register
        </a>
      </p>
    </form>
  </div>
);
}