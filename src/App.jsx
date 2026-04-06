import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ArtDetail from "./pages/ArtDetail";
import Gallery from "./pages/Gallery";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Gallery/>} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        
        {/* 🔒 Protected Route */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      
        <Route path="/art/:id" element={<ArtDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;