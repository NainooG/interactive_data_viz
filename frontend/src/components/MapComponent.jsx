"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Legend from './Legend';  // Import the Legend component

function MapComponent() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/map-data')
      .then(response => {
        const geojson = JSON.parse(response.data);
        setGeoData(geojson);
      })
      .catch(error => {
        console.error('Error fetching the GeoJSON data:', error);
      });
  }, []);

  if (typeof window === 'undefined') {
    return null; // Prevent SSR issues
  }

  const style = (feature) => {
    return {
      fillColor: feature.properties.color || '#FFEDA0',  // Default color if none is provided
      weight: 2,
      opacity: 1,
      color: 'blue',  // Border color
      fillOpacity: 0.7
    };
  };

  return (
    <div className="relative h-screen w-screen">
      <MapContainer center={[47.5, -120]} zoom={6} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && <GeoJSON data={geoData} style={style} />}
      </MapContainer>
      <Legend />  {/* Add the Legend component here */}
    </div>
  );
}

export default MapComponent;
