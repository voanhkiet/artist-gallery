const API = "https://artist-gallery-backend.onrender.com/api";

// GET all images
export const getImages = async () => {
  const res = await fetch(`${API}/images/`);
  return res.json();
};

// LOGIN
export const login = async (data) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// REGISTER
export const register = async (data) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// UPLOAD IMAGE
export const uploadImage = async (formData, token) => {
  const res = await fetch(`${API}/images/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};