import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapBoxProps {
  lat?: number;
  lon?: number;
}

export function MapBox({ lat, lon }: MapBoxProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const position: [number, number] = [lat || 41.9028, lon || 12.4964];
  
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden border border-input">
      {lat && lon ? (
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
        </MapContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Select a location to view the map</p>
        </div>
      )}
    </div>
  );
} 