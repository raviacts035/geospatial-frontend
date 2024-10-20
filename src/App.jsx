import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/LoginPage";
import Register from "./components/Register";
import Map from "./components/Map";
import axiosObj, { backend_base_url } from "./utils/const";

const App = () => {
  const [user, setUser] = useState(null);
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchGeoData();
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
  };

  const fetchGeoData = async () => {
    try {
      const response = await axiosObj(`${backend_base_url}/geodata`);
      console.log("response of fetchGeoData : ", response.data)

      if (response.status == 200) {
        const data = response.data
        setGeoData(data);
      } else {
        console.error("Failed to fetch geodata");
      }
    } catch (error) {
      console.error("Error fetching geodata:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setGeoData(JSON.parse(content)); // Make sure it's valid GeoJSON
      };
      reader.readAsText(file);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Register setUser={setUser} />
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <div className="flex flex-col">
                  <h1 className="text-center text-2xl font-bold mt-4">
                    Welcome, {user.username}!
                  </h1>
                  <input
                    type="file"
                    accept=".geojson,.kml"
                    onChange={handleFileUpload}
                    className="my-4 mx-auto border border-gray-300 rounded p-2"
                  />
                  <Map geoData={geoData} onSave={fetchGeoData} />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
