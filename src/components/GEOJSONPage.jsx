import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [78.9629, 20.5937],
      },
      properties: {
        name: "Location Name",
        description: "Description of the location",
      },
    },
  ],
};

const App = () => {
  return (
    <div className="App">
      <h1>React GeoJSON Map</h1>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <GeoJSON data={geojsonData} />
      </MapContainer>
    </div>
  );
};

export default App;
