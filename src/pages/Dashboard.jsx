import { useState, useEffect } from "react";
import { uploadImage, getImages, deleteImage } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

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

  return (
  <div className="min-h-screen bg-gray-100 p-10">
    <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

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

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {images.map((img) => (
        <div key={img.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
  <img
    src={img.image_url}
    className="w-full h-40 object-cover rounded"
  />

  <p className="mt-2 text-center text-sm font-medium text-gray-700">
    {img.title}
  </p>

  <button
    onClick={() => handleDelete(img.id)}
    className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded"
  >
    Delete
  </button>
</div>
      ))}
    </div>
  </div>
);
}