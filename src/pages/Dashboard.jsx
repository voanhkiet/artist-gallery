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

    <div className="bg-white p-6 rounded-2xl shadow mb-8 flex gap-4 items-center">
      <input
  type="file"
  onChange={(e) => {
    const f = e.target.files[0];
    if (f) {
      console.log("Selected file:", f); // DEBUG
      setFile(f);
    }
  }}
/>

<input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>



<button
  onClick={handleUpload}
  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
>
  Upload
</button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {images.map((img) => (
        <div key={img.id} className="bg-white p-2 rounded-xl shadow">
          <img
            src={img.image_url}
            className="w-full h-40 object-cover rounded"
          />
          <button
            onClick={() => handleDelete(img.id)}
            className="mt-2 w-full bg-red-500 text-white py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}