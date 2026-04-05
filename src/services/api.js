const API = "http://127.0.0.1:5000/api";

export const getImages = async () => {
  const res = await fetch(`${API}/images`);
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
};

export const uploadImage = async (formData, token) => {
  const res = await fetch(`${API}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  return res.json();
};

export const deleteImage = async (id, token) => {
  await fetch(`${API}/images/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};