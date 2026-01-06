import type { Station } from "@/types/station";
import { memo } from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

const ICONS = {
  default: new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  highlighted: new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [32, 52],
    iconAnchor: [16, 52],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
} as const;

function StationMarkers({
  stations,
  highlightedStationId,
  onStationClick,
  markerRefs,
}: {
  stations: Station[];
  highlightedStationId: number | null;
  onStationClick: (id: number) => void;
  markerRefs: React.MutableRefObject<Map<number, L.Marker>>;
}) {
  return (
    <>
      {stations.map((station) => {
        const isHighlighted = highlightedStationId === station.id;

        return (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={isHighlighted ? ICONS.highlighted : ICONS.default}
            eventHandlers={{
              click: () => onStationClick(station.id),
            }}
            ref={(marker) => {
              if (marker) markerRefs.current.set(station.id, marker);
              else markerRefs.current.delete(station.id);
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="text-sm font-semibold">{station.name}</h3>
                <p className="text-xs text-gray-600">{station.city}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default memo(StationMarkers);
