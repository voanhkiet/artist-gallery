import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ArtistProfile() {
  const { username } = useParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/images/user/${username}`)
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      
      <h1 className="text-3xl font-bold mb-2">
        🎨 {username}
      </h1>

      <p className="text-gray-500 mb-6">
        Artist Profile
      </p>

      {loading && <p>Loading...</p>}

      {!loading && artworks.length === 0 && (
        <p>No artworks yet</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {artworks.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-xl overflow-hidden shadow"
          >
            <img
              src={art.image_url}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h2 className="font-semibold">{art.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}