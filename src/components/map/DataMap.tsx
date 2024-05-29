import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export const DataMap = () => {
  const downtownChattanoogaCoords = { lat: 35.0456, lng: -85.3097 };

  return (
    <div className="h-screen flex justify-center pt-10">
      <MapContainer center={downtownChattanoogaCoords} zoom={15} style={{ height: '70%', width: '70%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={downtownChattanoogaCoords} icon={customIcon}>
        </Marker>
      </MapContainer>
    </div>
  );
};
