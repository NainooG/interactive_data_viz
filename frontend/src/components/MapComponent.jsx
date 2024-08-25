"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Legend from './Legend';

function MapComponent() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/map-data')
      .then(response => {
        console.log(response.data);  // Log the data to ensure it's being fetched correctly
        setGeoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the GeoJSON data:', error);
      });
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <MapContainer center={[47.5, -120]} zoom={6} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && <GeoJSON data={geoData} />}
      </MapContainer>
      <Legend />
    </div>
  );
}

export default MapComponent;

