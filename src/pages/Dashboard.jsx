import { useState, useEffect } from "react";
import { uploadImage, getImages, deleteImage } from "../services/api";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

  const token = localStorage.getItem("token");

  const loadImages = () => {
    getImages().then(setImages);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async () => {
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
  
  console.log("FILE:", file);
console.log("TITLE:", title);
console.log("TOKEN:", token);
};

  const handleDelete = async (id) => {
    await deleteImage(id, token);
    loadImages();
  };

  return (
  <div className="min-h-screen bg-gray-100 p-10">
    <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

    <div className="bg-white p-6 rounded-2xl shadow mb-8 flex flex-col md:flex-row gap-4 items-center">

  {/* FILE INPUT */}
  <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
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

  {/* PREVIEW */}
  {file && (
    <img
      src={URL.createObjectURL(file)}
      alt="preview"
      className="w-16 h-16 object-cover rounded-lg"
    />
  )}

  {/* TITLE */}
  <input
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="border p-2 rounded-lg flex-1"
  />

  {/* BUTTON */}
  <button
    onClick={handleUpload}
    disabled={!file || !title}
    className={`px-6 py-2 rounded-lg transition text-white
      ${file && title ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}
    `}
  >
    Upload
  </button>
</div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {images.map((img) => (
        <div key={img.id} className="bg-white p-2 rounded-xl shadow hover:shadow-xl transition">
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