const API = "https://artist-gallery-backend.onrender.com/api";

// GET all images
export const getImages = async () => {
  const res = await fetch(`${API}/images/`); // ✅ FIXED
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
};

// LOGIN
export const login = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Login failed");

  return result;
};

// REGISTER
export const register = async (data) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Register failed");

  return result;
};

// UPLOAD IMAGE
export const uploadImage = async (formData, token) => {
  const res = await fetch(`${API}/images/`, { // ✅ FIXED
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Upload failed");

  return result;
};

// DELETE IMAGE
export const deleteImage = async (id, token) => {
  const res = await fetch(`${API}/images/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Delete failed");

  return result;
};