import { useState } from "react";
import { match, P } from "ts-pattern";
import StationMap from "@/components/station-map/station-map";
import { filterStationsByCity } from "@/lib/api";
import { AlertCircle, Loader2 } from "lucide-react";
import SideBar from "./components/side-bar/side-bar";
import Header from "./components/header";
import { useStations } from "./hooks/use-stations";

export default function Map() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [highlightedStationId, setHighlightedStationId] = useState<
    number | null
  >(null);

  const { stations, cities, loading, error } = useStations(selectedCity);
  const filteredStations = filterStationsByCity(stations, selectedCity);

  const handleStationClick = (stationId: number) => {
    setHighlightedStationId(stationId);
  };

  const handleCityChange = (city: string | null) => {
    setSelectedCity(city);
    if (highlightedStationId) {
      const station = stations.find((s) => s.id === highlightedStationId);
      if (station?.city !== city) setHighlightedStationId(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 overflow-hidden flex">
        <SideBar
          cities={cities}
          stations={filteredStations}
          onStationClick={handleStationClick}
          highlightedStationId={highlightedStationId}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          loading={loading}
          error={error}
        />

        <div className="flex-1 overflow-hidden">
          {match({ loading, error })
            .with({ loading: true }, () => (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-3" />
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            ))
            .with({ loading: false, error: P.nonNullable }, () => (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    Failed to load stations
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please refresh the page and try again
                  </p>
                </div>
              </div>
            ))
            .otherwise(() => (
              <StationMap
                stations={filteredStations}
                highlightedStationId={highlightedStationId}
                onStationClick={handleStationClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
