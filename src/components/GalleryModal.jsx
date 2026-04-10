import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../config";

export default function GalleryModal({
  images,
  selected,
  setSelected,
  setArtworks,
}) {
  const [direction, setDirection] = useState(0);
  const startX = useRef(0);
  const currentX = useRef(0);

  // 🔒 Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
  }, [selected]);

  // ⌨️ Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!selected) return;

      const i = images.findIndex((img) => img.id === selected.id);

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

  if (!selected) return null;

  const currentIndex = images.findIndex((img) => img.id === selected.id);

  return (
    <motion.div
      className="fixed inset-0 z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 🔥 BACKGROUND (click to close) */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setSelected(null)}
      />

      {/* 🔥 CONTENT */}
      <motion.div className="relative z-10 flex items-center justify-center h-full">

        {/* IMAGE */}
        <AnimatePresence mode="wait">
          <motion.img
            key={selected.id}
            src={selected.image_url}
            alt={selected.title}
            draggable={false}
            className="max-w-[95vw] max-h-[80vh] object-contain rounded-lg shadow-lg"

            // 👉 Swipe
            onTouchStart={(e) => {
              startX.current = e.touches[0].clientX;
              currentX.current = e.touches[0].clientX;
            }}
            onTouchMove={(e) => {
              currentX.current = e.touches[0].clientX;
            }}
            onTouchEnd={() => {
              const diff = startX.current - currentX.current;

              if (Math.abs(diff) < 30) return;

              if (diff > 0) {
                setDirection(1);
                setSelected(images[(currentIndex + 1) % images.length]);
              } else {
                setDirection(-1);
                setSelected(
                  images[(currentIndex - 1 + images.length) % images.length]
                );
              }
            }}

            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
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

        {/* ⬅️ PREVIOUS */}
        <button
          className="absolute left-4 md:left-10 z-10 text-white text-4xl bg-black/40 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => {
            setDirection(-1);
            setSelected(
              images[(currentIndex - 1 + images.length) % images.length]
            );
          }}
        >
          ‹
        </button>

        {/* 📝 INFO */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white">

          {/* ❤️ LIKE */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={async (e) => {
                e.stopPropagation();

                const token = localStorage.getItem("token");

                if (!token) {
                  window.location.href = "/login";
                  return;
                }

                try {
                  const res = await fetch(
                    `${API_URL}/api/likes/toggle/${selected.id}`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (res.status === 401) {
                    alert("Session expired. Please login again.");
                    return;
                  }

                  const data = await res.json();

                  // update grid
                  setArtworks((prev) =>
                    prev.map((a) =>
                      a.id === selected.id
                        ? {
                            ...a,
                            is_liked: data.liked,
                            likes_count: data.liked
                              ? (a.likes_count || 0) + 1
                              : Math.max((a.likes_count || 0) - 1, 0),
                          }
                        : a
                    )
                  );

                  // update modal
                  setSelected((prev) => ({
                    ...prev,
                    is_liked: data.liked,
                    likes_count: data.liked
                      ? (prev.likes_count || 0) + 1
                      : Math.max((prev.likes_count || 0) - 1, 0),
                  }));
                } catch (err) {
                  console.error(err);
                }
              }}
              className="text-xl hover:scale-125 transition"
            >
              {selected?.is_liked ? "❤️" : "🤍"}
            </button>

            <span className="text-sm text-gray-300">
              {selected?.likes_count || 0} likes
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-lg md:text-xl font-semibold">
            {selected.title}
          </h2>

          {/* DESCRIPTION */}
          {selected.description && (
            <p className="text-sm text-gray-300 mt-1">
              {selected.description}
            </p>
          )}

          {/* META */}
          <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
            <div>
              <div>By {selected.user || "Unknown"}</div>
              <div>
                {selected.created_at
                  ? new Date(selected.created_at).toLocaleDateString()
                  : ""}
              </div>
            </div>

            <div className="bg-black/50 px-3 py-1 rounded-full text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}