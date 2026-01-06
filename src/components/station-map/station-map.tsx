import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { Station } from "@/types/station";
import StationMarkers from "./markers";

type StationMapProps = {
  stations: Station[];
  highlightedStationId: number | null;
  onStationClick: (stationId: number) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
};

function MapUpdater({
  stations,
  highlightedStationId,
  markerRefs,
}: {
  stations: Station[];
  highlightedStationId: number | null;
  markerRefs: React.MutableRefObject<Map<number, L.Marker>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (highlightedStationId == null) return;

    const station = stations.find((s) => s.id === highlightedStationId);
    if (!station) return;

    map.flyTo([station.lat, station.lng], Math.max(map.getZoom(), 12), {
      duration: 0.8,
    });

    markerRefs.current.get(highlightedStationId)?.openPopup();
  }, [highlightedStationId, stations, map, markerRefs]);

  useEffect(() => {
    if (stations.length === 0) return;

    const bounds = L.latLngBounds(
      stations.map((s) => [s.lat, s.lng] as [number, number])
    );
    map.flyToBounds(bounds, { padding: [100, 100], duration: 0.8 });
  }, [stations, map]);

  return null;
}

export default function StationMap({
  stations,
  highlightedStationId,
  onStationClick,
  initialCenter = [51.1642, 10.4515],
  initialZoom = 6,
}: StationMapProps) {
  const markerRefs = useRef<Map<number, L.Marker>>(new Map());

  return (
    <div className="h-full min-h-96 w-full overflow-hidden">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="h-full w-full"
        style={{ position: "relative" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <MapUpdater
          stations={stations}
          highlightedStationId={highlightedStationId}
          markerRefs={markerRefs}
        />

        <StationMarkers
          stations={stations}
          highlightedStationId={highlightedStationId}
          onStationClick={onStationClick}
          markerRefs={markerRefs}
        />
      </MapContainer>
    </div>
  );
}
