import { useEffect, useState } from "react";
import axios from "axios";
import GalleryModal from "../components/GalleryModal";
import {motion} from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

 

  // 📡 Fetch data
useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get(`${API_URL}/api/images`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  })
    .then((res) => {
      console.log("API DATA:", res.data);

      if (Array.isArray(res.data)) {
        setArtworks(res.data);
      } else {
        console.log("NOT ARRAY:", res.data);
        setArtworks([]);
      }
    })
    .catch((err) => {
      console.error(err);
      setArtworks([]);
    })
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
          
          {Array.isArray(artworks) && artworks.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedImage(art)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              {/* IMAGE */}
              <div className="overflow-hidden relative">
  
  {/* ❤️ LIKE BUTTON */}
  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full z-10">
    
    <motion.button
      whileTap={{ scale: 1.5 }} // click effect
      animate={
        art.is_liked
          ? { scale: [1, 1.6, 1] } // pop animation
          : { scale: 1 }
      }
      transition={{ duration: 0.3 }}
     onClick={async (e) => {
  e.stopPropagation();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(
      `${API_URL}/api/likes/toggle/${art.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setArtworks(prev =>
      prev.map(a =>
        a.id === art.id
          ? {
              ...a,
              is_liked: data.liked,
              likes_count: data.liked
              ? (a.likes_count || 0) + 1
              : Math.max((a.likes_count || 1) - 1, 0)
            }
          : a
      )
    );

  } catch (err) {
    console.error(err);
  }
}}
      className="text-lg transition transform hover:scale-125"
    >
      {art.is_liked ? "❤️" : "🤍"}
    </motion.button>

    <span className="text-white text-xs">
      {art.likes_count || 0}
    </span>

  </div>

  {/* IMAGE */}
  <img
    src={art.image_url}
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

      <GalleryModal 
        images={artworks}
        selected={selectedImage}
        setSelected={setSelectedImage}
      />
    </div>
  );
}