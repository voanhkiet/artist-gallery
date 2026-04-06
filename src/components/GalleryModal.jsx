import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function GalleryModal({ images, selected, setSelected }) {

  // ⌨️ keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!selected) return;

      if (e.key === "Escape") setSelected(null);

      const i = images.findIndex(img => img.id === selected.id);

      if (e.key === "ArrowRight") {
        setSelected(images[(i + 1) % images.length]);
      }

      if (e.key === "ArrowLeft") {
        setSelected(images[(i - 1 + images.length) % images.length]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, images]);

  // 🔒 lock scroll
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
  }, [selected]);

  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50"
      onClick={() => setSelected(null)}
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
            const i = images.findIndex(img => img.id === selected.id);
            setSelected(images[(i - 1 + images.length) % images.length]);
          }}
        >
          ‹
        </div>

        {/* IMAGE */}
        <img
          src={`${API_URL}/uploads/${selected.image}`}
          alt={selected.title}
          className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
        />

        {/* ➡️ RIGHT */}
        <div
          className="absolute right-6 md:right-10 text-white text-5xl cursor-pointer 
          bg-black/40 hover:bg-black/70 w-12 h-12 flex items-center justify-center 
          rounded-full transition"
          onClick={() => {
            const i = images.findIndex(img => img.id === selected.id);
            setSelected(images[(i + 1) % images.length]);
          }}
        >
          ›
        </div>

        {/* ❌ CLOSE */}
        <div
          className="absolute top-6 right-6 text-white text-xl cursor-pointer 
          bg-black/50 hover:bg-black/80 px-4 py-2 rounded-full transition"
          onClick={() => setSelected(null)}
        >
          ✖
        </div>

        {/* 📝 TITLE */}
        <div className="absolute bottom-0 left-0 w-full p-4 
        bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
          {selected.title}
        </div>

      </div>
    </div>
  );
}