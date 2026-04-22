import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("DATA:", data); // 🔥 debug

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("API ERROR:", data);
        setUsers([]);
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const approveUser = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/approve/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadUsers();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Panel</h1>

      {users.length === 0 && (
        <p className="text-gray-500">No pending artists</p>
      )}

      <div className="space-y-4">
        {Array.isArray(users) && users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>

            <button
              onClick={() => approveUser(u.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}