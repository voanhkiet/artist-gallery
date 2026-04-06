import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // 📡 Fetch data
  useEffect(() => {
    axios
      .get(`${API_URL}/api/artworks`)
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ⌨️ Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") setSelectedImage(null);

      const i = artworks.findIndex(a => a.id === selectedImage.id);

      if (e.key === "ArrowRight") {
        setSelectedImage(artworks[(i + 1) % artworks.length]);
      }

      if (e.key === "ArrowLeft") {
        setSelectedImage(artworks[(i - 1 + artworks.length) % artworks.length]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, artworks]);

  // 🔒 Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">🎨 Gallery</h1>

      {/* 🔄 LOADING */}
      {loading && (
        <div className="flex justify-center items-center mt-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* ❌ EMPTY */}
      {!loading && artworks.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No artworks yet...
        </p>
      )}

      {/* ✅ GRID */}
      {!loading && artworks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {artworks.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedImage(art)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={`${API_URL}/uploads/${art.image}`}
                  alt={art.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                  className="w-full h-60 object-cover transition duration-300 group-hover:scale-110"
                />
              </div>

              {/* TITLE */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-black transition">
                  {art.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex items-center"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ⬅️ LEFT */}
            <div
              className="absolute left-6 md:left-10 text-white text-5xl cursor-pointer 
              bg-black/40 hover:bg-black/70 w-12 h-12 flex items-center justify-center 
              rounded-full transition"
              onClick={() => {
                const i = artworks.findIndex(a => a.id === selectedImage.id);
                setSelectedImage(artworks[(i - 1 + artworks.length) % artworks.length]);
              }}
            >
              ‹
            </div>

            {/* IMAGE */}
            <img
              src={`${API_URL}/uploads/${selectedImage.image}`}
              alt={selectedImage.title}
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />

            {/* ➡️ RIGHT */}
            <div
              className="absolute right-6 md:right-10 text-white text-5xl cursor-pointer 
              bg-black/40 hover:bg-black/70 w-12 h-12 flex items-center justify-center 
              rounded-full transition"
              onClick={() => {
                const i = artworks.findIndex(a => a.id === selectedImage.id);
                setSelectedImage(artworks[(i + 1) % artworks.length]);
              }}
            >
              ›
            </div>

            {/* ❌ CLOSE */}
            <div
              className="absolute top-6 right-6 text-white text-xl cursor-pointer 
              bg-black/50 hover:bg-black/80 px-4 py-2 rounded-full transition"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </div>

            {/* 📝 TITLE */}
            <div className="absolute bottom-0 left-0 w-full p-4 
            bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
              {selectedImage.title}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}