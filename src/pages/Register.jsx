import { useState } from "react";
import { register } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚨 VERY IMPORTANT

    try {
      const res = await register(form);
      alert("Register success ✅");
      console.log(res);
    } catch (err) {
      console.error(err);
      alert("Register failed ❌");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow w-full max-w-md space-y-5"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

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
      <select
        value={form.role}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
        className="w-full p-3 border rounded-lg"
      >
        <option value="user">User</option>
        <option value="artist">Artist</option>
      </select>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Register
      </button>

      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </form>
  </div>
);
}