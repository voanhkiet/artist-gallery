import { useState } from "react";
import { register } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    await register(form);
    alert("Registered!");
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

    <input
      className="w-full border p-3 mb-4 rounded-lg"
      placeholder="Username"
    />

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
      Register
    </button>
  </div>
</div>
  );
}