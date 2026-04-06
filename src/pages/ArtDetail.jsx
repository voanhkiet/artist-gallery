import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ArtDetail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artworks/${id}`)
      .then((res) => setArt(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!art) {
    return <p className="text-center mt-20">Artwork not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 flex justify-center">
      
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden">
        
        {/* IMAGE */}
        <img
          src={`${API_URL}/uploads/${art.image}`}
          alt={art.title}
          className="w-full max-h-[500px] object-cover"
        />

        {/* CONTENT */}
        <div className="p-6 space-y-3">
          <h1 className="text-2xl font-bold">{art.title}</h1>

          {/* future fields */}
          {/* <p className="text-gray-500">{art.description}</p> */}
        </div>

      </div>

    </div>
  );
}