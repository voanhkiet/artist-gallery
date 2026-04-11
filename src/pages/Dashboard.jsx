import { useState, useEffect, use } from "react";
import { uploadImage, getImages, deleteImage } from "../services/api";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function Dashboard() {
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const token = localStorage.getItem("token");


  const loadImages = () => {
    getImages().then(setImages);
  };

useEffect(() => {
  if (!token) {
    navigate("/login");
  } else {
    loadImages();
  }
}, [token, navigate]); // ✅ add navigate

  const handleUpload = async () => {
  
    // ✅ CHECK LOGIN FIRST
  if (!token) {
    alert("Please login first 🔒");
    window.location.href = "/login";
    return;
  } 

  if (!file || !title) {
    alert("Please select file and enter title");
    return;
  }

  const formData = new FormData();
  formData.append("image", file, file.name);
  formData.append("title", title);

  try {
    await uploadImage(formData, token);
    alert("Upload success ✅");
    setFile(null);
    setTitle("");
    loadImages();
  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  }
  
};

  const handleDelete = async (id) => {
    await deleteImage(id, token);
    loadImages();
  };

  const updateProfile = async () => {
  try {
    const res = await fetch(`${API_URL}/api/images/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        bio,
        avatar_url: avatar,
      }),
    });

    const data = await res.json();

    alert("Profile updated!");
  } catch (err) {
    console.error(err);
  }
};
  return (
  <div className="min-h-screen bg-gray-100 p-10">
  <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

  {/* 🧑‍🎨 PROFILE */}
  <div className="bg-white p-4 rounded-xl shadow mb-6">
    <h2 className="text-lg font-semibold mb-3">
      🧑‍🎨 Edit Profile
    </h2>

    <textarea
      placeholder="Write your bio..."
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      className="w-full border p-2 rounded mb-3"
    />

    <input
      placeholder="Avatar image URL"
      value={avatar}
      onChange={(e) => setAvatar(e.target.value)}
      className="w-full border p-2 rounded mb-3"
    />

    <button
      onClick={updateProfile}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Save Profile
    </button>
  </div>

  {/* 🎨 UPLOAD */}
  <div className="bg-white p-6 rounded-2xl shadow mb-8 flex flex-col md:flex-row gap-4 items-center">

    <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 whitespace-nowrap">
      Choose Image
      <input
        type="file"
        hidden
        onChange={(e) => {
          const f = e.target.files[0];
          if (f) setFile(f);
        }}
      />
    </label>

    <input
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border p-2 rounded-lg flex-1 w-full"
    />

    <button
      onClick={handleUpload}
      disabled={!file || !title || !token}
      className={`px-6 py-2 rounded-lg text-white
        ${file && title && token
          ? "bg-black hover:bg-gray-800"
          : "bg-gray-400 cursor-not-allowed"}
      `}
    >
      Upload
    </button>
  </div>
  </div>


  

   
);
}
