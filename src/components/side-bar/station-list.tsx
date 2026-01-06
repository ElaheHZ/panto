import { type Station } from "@/types/station";
import { MapPin, Train } from "lucide-react";
import { cn } from "@/lib/utils";

interface StationsListProps {
  stations: Station[];
  highlightedStationId: number | null;
  onStationClick: (stationId: number) => void;
}

export default function StationsList({
  stations,
  highlightedStationId,
  onStationClick,
}: StationsListProps) {
  return (
    <>
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Train className="w-5 h-5" />
          Stations ({stations.length})
        </h2>
      </div>
      <div className="overflow-y-scroll">
        {stations.map(({ id, name, city }) => (
          <button
            key={id}
            onClick={() => onStationClick(id)}
            className={cn(
              "h-20 w-full text-left px-4 py-3 transition-colors duration-200 hover:bg-blue-50 active:bg-blue-100",
              {
                "bg-blue-100 border-l-4 border-blue-600":
                  highlightedStationId === id,
              }
            )}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {name}
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">{city}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
