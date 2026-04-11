import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ArtistProfile() {
  const { username } = useParams();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [imagesRes, profileRes] = await Promise.all([
        axios.get(`${API_URL}/api/images/user/${username}`),
        axios.get(`${API_URL}/api/images/user/profile/${username}`)
      ]);

      setArtworks(imagesRes.data);
      setProfile(profileRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [username]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="flex items-center gap-4 mb-6">
  
    <img
      src={profile?.avatar_url || "https://via.placeholder.com/100"}
      className="w-16 h-16 rounded-full object-cover"
    />

    <div>
      <h1 className="text-3xl font-bold">
        {profile?.username || username}
      </h1>

      <p className="text-gray-500 text-sm">
        {artworks.length} artworks
      </p>

      {profile?.bio && (
        <p className="text-gray-600 mt-1 max-w-md">
          {profile.bio}
        </p>
      )}
    </div>

  </div>


      {loading && <p>Loading...</p>}

      {!loading && artworks.length === 0 && (
        <p>No artworks yet</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {artworks.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={art.image_url}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
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