import { AlertCircle, Loader2 } from "lucide-react";
import { match, P } from "ts-pattern";
import CityFilter from "./city-filter";
import StationsList from "./station-list";
import type { Station } from "@/types/station";

interface SideBarProps {
  loading: boolean;
  error: string | null;
  cities: string[];
  selectedCity: string | null;
  onCityChange: (city: string | null) => void;
  stations: Station[];
  highlightedStationId: number | null;
  onStationClick: (stationId: number) => void;
}

export default function SideBar(props: SideBarProps) {
  const {
    loading,
    error,
    cities,
    highlightedStationId,
    onCityChange,
    onStationClick,
    selectedCity,
    stations,
  } = props;

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {match({ loading, error })
        .with({ loading: true }, () => (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Loading stations...</p>
            </div>
          </div>
        ))

        .with({ loading: false, error: P.string }, ({ error }) => (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">
                Something went wrong
              </p>
              <p className="text-xs text-gray-500 mt-1">{error}</p>
            </div>
          </div>
        ))

        .otherwise(() => (
          <>
            <CityFilter
              cities={cities}
              selectedCity={selectedCity}
              onCityChange={onCityChange}
            />
            <StationsList
              stations={stations}
              highlightedStationId={highlightedStationId}
              onStationClick={onStationClick}
            />
          </>
        ))}
    </div>
  );
}
