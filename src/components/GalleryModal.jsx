import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

export default function GalleryModal({ images, selected, setSelected }) {
  const [direction, setDirection] = useState(0);
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
  <motion.div
    className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50"
    onClick={() => setSelected(null)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="relative flex items-center"
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >

      {/* ⬅️ LEFT */}
      <div
        className="absolute left-6 md:left-10 text-white text-5xl cursor-pointer 
        bg-black/40 hover:bg-black/70 w-12 h-12 flex items-center justify-center 
        rounded-full transition"
        onClick={() => {
          const i = images.findIndex(img => img.id === selected?.id);
          if (i === -1) return;

          setDirection(-1); // 👈 ADD THIS
          setSelected(images[(i - 1 + images.length) % images.length]);
        }}
      >
        ‹
      </div>

      {/* IMAGE */}
<AnimatePresence mode="wait">
  <motion.img
    key={selected.id}
    src={selected.image_url}
    alt={selected.title}

    className="max-w-[95vw] max-h-[80vh] object-contain rounded-lg shadow-lg"

initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}

    transition={{ duration: 0.3 }}

    drag="x"
    dragConstraints={{ left: -300, right: 300 }}
    dragElastic={0.5}

onDragEnd={(e, info) => {
  const i = images.findIndex(img => img.id === selected.id);
  if (i === -1) return;

  const offset = info.offset.x;
  const velocity = info.velocity.x;

  const swipe = Math.abs(offset) > 60 || Math.abs(velocity) > 500;

  if (!swipe) return;

  if (offset < 0) {
    setDirection(1);
    setSelected(images[(i + 1) % images.length]);
  } else {
    setDirection(-1);
    setSelected(images[(i - 1 + images.length) % images.length]);
  }
}}
  />
</AnimatePresence>
      {/* ➡️ RIGHT */}
      <div
        className="absolute right-6 md:right-10 text-white text-5xl cursor-pointer 
        bg-black/40 hover:bg-black/70 w-12 h-12 flex items-center justify-center 
        rounded-full transition"
onClick={() => {
  const i = images.findIndex(img => img.id === selected?.id);
  if (i === -1) return;

  setDirection(1); // 👈 ADD THIS
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

      <div className="absolute bottom-0 left-0 w-full p-4 
bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white">

  {/* TITLE */}
  <h2 className="text-lg md:text-xl font-semibold">
    {selected.title}
  </h2>

  {/* DESCRIPTION */}
  {selected.description && (
    <p className="text-sm text-gray-300 mt-1 line-clamp-2">
      {selected.description}
    </p>
  )}

  {/* META */}
  <div className="flex justify-between items-center mt-3 text-xs text-gray-400">

    {/* LEFT */}
    <div className="flex flex-col">
      <span>By {selected.user || "Unknown"}</span>
      <span>
        {selected.created_at
          ? new Date(selected.created_at).toLocaleDateString()
          : ""}
      </span>
    </div>

    {/* RIGHT (counter) */}
    <div className="bg-black/50 px-3 py-1 rounded-full text-white">
      {images.findIndex(img => img.id === selected.id) + 1} / {images.length}
    </div>

  </div>
</div>

    </motion.div>
  </motion.div>
);
}