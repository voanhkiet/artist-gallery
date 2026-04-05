import { useEffect, useState } from "react";
import { getImages } from "../services/api";

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getImages().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
  if (selectedImage) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [selectedImage]);



  // 🔄 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
  <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
    <h2 className="text-4xl font-bold mb-2">Dashboard</h2>
    <p className="text-gray-500 mb-6">
      Manage your artworks
    </p>
      {/* ❌ EMPTY STATE */}
      {images.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl">No artworks yet 🎨</p>
          <p className="text-sm mt-2">
            Upload your first image in Dashboard
          </p>
        </div>
      ) : (
        /* ✅ IMAGE GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 
hover:shadow-2xl transition duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
            >
<div className="relative group">
  <img
  src={img.image_url}
  alt={img.title || "Artwork"}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/300";
  }}
  className="w-full h-40 object-cover rounded cursor-pointer"
  onClick={() => {
  console.log("CLICKED IMAGE");
  setSelectedImage(img);
}}   // ✅ IMPORTANT
/>

  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300 flex items-center justify-center">
    <span className="text-white text-sm tracking-wide opacity-0 group-hover:opacity-100 transition">
      View Artwork
    </span>
  </div>
</div>

              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50"
    onClick={() => setSelectedImage(null)}
  >
    <div className="relative">
      <img
        src={selectedImage.image_url}
        alt={selectedImage.title || "Artwork"}
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // ✅ prevent close when clicking image
      />

      <div
        className="absolute top-3 right-3 text-white text-xl cursor-pointer"
        onClick={() => setSelectedImage(null)}
      >
        ✖
      </div>

      <div className="absolute bottom-4 left-4 text-white bg-black/60 px-4 py-2 rounded-lg text-sm">
        {selectedImage.title}
      </div>
    </div>
  </div>
)}
    </div>
    
  );
}