import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryModal({ images, selected, setSelected }) {
  const [direction, setDirection] = useState(0);

  // ⌨️ Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!selected) return;

      const i = images.findIndex(img => img.id === selected.id);

      if (e.key === "Escape") setSelected(null);

      if (e.key === "ArrowRight") {
        setDirection(1);
        setSelected(images[(i + 1) % images.length]);
      }

      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setSelected(images[(i - 1 + images.length) % images.length]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, images]);

  // 🔒 Lock scroll
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
  }, [selected]);

  if (!selected) return null;

  const currentIndex = images.findIndex(img => img.id === selected.id);

  return (
    <div className="fixed inset-0 z-50">

      {/* 🌫️ BACKGROUND */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setSelected(null)}
      />

      {/* 📦 CONTENT */}
      <motion.div
        className="relative flex items-center justify-center h-full"
        drag="x"
        dragElastic={0.3}
        style={{ touchAction: "none" }}

        onDragEnd={(e, info) => {
          const offset = info.offset.x;
          const velocity = info.velocity.x;

          const swipe = Math.abs(offset) > 60 || Math.abs(velocity) > 500;
          if (!swipe) return;

          if (offset < 0) {
            setDirection(1);
            setSelected(images[(currentIndex + 1) % images.length]);
          } else {
            setDirection(-1);
            setSelected(images[(currentIndex - 1 + images.length) % images.length]);
          }
        }}
      >

        {/* ⬅️ PREVIOUS */}
        <button
          className="absolute left-4 md:left-10 z-10 text-white text-4xl bg-black/40 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => {
            setDirection(-1);
            setSelected(images[(currentIndex - 1 + images.length) % images.length]);
          }}
        >
          ‹
        </button>

        {/* IMAGE */}
        <AnimatePresence mode="wait">
  <motion.img
    key={selected.id}
    src={selected.image_url}
    alt={selected.title}

    className="max-w-[95vw] max-h-[80vh] object-contain rounded-lg shadow-lg cursor-grab active:cursor-grabbing"

    style={{ touchAction: "none" }} // 🔥 CRITICAL FIX

    initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}

    transition={{ duration: 0.3 }}

    drag="x"
    dragElastic={0.5}

    onDragEnd={(e, info) => {
      console.log("SWIPE TRIGGERED"); // 👈 DEBUG

      const i = images.findIndex(img => img.id === selected.id);
      if (i === -1) return;

      const offset = info.offset.x;
      const velocity = info.velocity.x;

      if (offset < -50 || velocity < -500) {
        setDirection(1);
        setSelected(images[(i + 1) % images.length]);
      }

      if (offset > 50 || velocity > 500) {
        setDirection(-1);
        setSelected(images[(i - 1 + images.length) % images.length]);
      }
    }}
  />
</AnimatePresence>

        {/* ➡️ NEXT */}
        <button
          className="absolute right-4 md:right-10 z-10 text-white text-4xl bg-black/40 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => {
            setDirection(1);
            setSelected(images[(currentIndex + 1) % images.length]);
          }}
        >
          ›
        </button>

        {/* ❌ CLOSE */}
        <button
          className="absolute top-6 right-6 text-white text-xl bg-black/50 hover:bg-black/80 px-4 py-2 rounded-full"
          onClick={() => setSelected(null)}
        >
          ✖
        </button>

        {/* 📝 INFO */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white">

          <h2 className="text-lg md:text-xl font-semibold">
            {selected.title}
          </h2>

          {selected.description && (
            <p className="text-sm text-gray-300 mt-1 line-clamp-2">
              {selected.description}
            </p>
          )}

          <div className="flex justify-between items-center mt-3 text-xs text-gray-400">

            <div className="flex flex-col">
              <span>By {selected.user || "Unknown"}</span>
              <span>
                {selected.created_at
                  ? new Date(selected.created_at).toLocaleDateString()
                  : ""}
              </span>
            </div>

            <div className="bg-black/50 px-3 py-1 rounded-full text-white">
              {currentIndex + 1} / {images.length}
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}