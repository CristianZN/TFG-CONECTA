import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Icono personalizado para los marcadores
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Componente para seleccionar ubicación en el mapa
const LocationSelector = ({ onSelect }: { onSelect: (latlng: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e: any) {
      onSelect(e.latlng);
    },
  });
  return null;
};

export interface EventMap {
  id: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  events?: EventMap[];
  onLocationSelect?: (lat: number, lng: number) => void;
}

// Ejemplo de eventos cercanos (ficticios)
const eventosCercanos = [
  {
    id: '1',
    nombre: 'Clase de español',
    lugar: 'Centro Cultural',
    distancia: '1.2 km',
    fecha: '15 de mayo, 18:00',
  },
  {
    id: '2',
    nombre: 'Noche de cine',
    lugar: 'Parque Central',
    distancia: '2.5 km',
    fecha: '16 de mayo, 21:00',
  },
  {
    id: '3',
    nombre: 'Mercado artesanal',
    lugar: 'Plaza Mayor',
    distancia: '0.8 km',
    fecha: '17 de mayo, 10:00',
  },
];

export const MapView: React.FC<MapViewProps> = ({ events = [], onLocationSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setSelectedPosition(latlng);
    if (onLocationSelect) {
      onLocationSelect(latlng.lat, latlng.lng);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Mapa interactivo</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="relative w-full h-[400px]">
          <MapContainer center={[40.4168, -3.7038]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector onSelect={handleMapClick} />
            {selectedPosition && (
              <Marker position={selectedPosition} icon={customIcon}>
                <Popup>Ubicación seleccionada para el evento</Popup>
              </Marker>
            )}
            {events.map((event) => (
              <Marker key={event.id} position={{ lat: event.lat, lng: event.lng }} icon={customIcon}>
                <Popup>
                  <strong>{event.title}</strong>
                  <br />
                  {event.location}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <div className="text-gray-600 text-sm">Haz clic en el mapa para seleccionar la ubicación de tu evento.</div>

      {/* Eventos cercanos */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Eventos cercanos</h2>
        <div className="space-y-3">
          {eventosCercanos.map((evento) => (
            <div key={evento.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mr-4">
                <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{evento.nombre}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{evento.lugar} · {evento.fecha}</p>
                <p className="text-xs text-gray-400 dark:text-gray-400">A {evento.distancia} de tu ubicación</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};