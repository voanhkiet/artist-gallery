import { useState } from "react";
import { login } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚨 MUST HAVE

    try {
      const res = await login(form);

      console.log(res); // debug
      localStorage.setItem("token", res.token);

      alert("Login success ✅");

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">
        Login
      </button>

    </form>
  );
}