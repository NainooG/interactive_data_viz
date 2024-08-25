"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function MapComponent() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/map-data')
      .then(response => {
        const geojson = JSON.parse(response.data);  // Ensure the JSON is correctly parsed
        console.log(geojson);  // Debug: Print the GeoJSON object to ensure it's valid
        setGeoData(geojson);
      })
      .catch(error => {
        console.error('Error fetching the GeoJSON data:', error);
      });
  }, []);

  if (typeof window === 'undefined') {
    return null; // Prevent SSR issues
  }

  return (
    <div className="relative h-screen w-screen">
      <MapContainer center={[47.5, -120]} zoom={6} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && <GeoJSON data={geoData} />}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
