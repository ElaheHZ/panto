import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Station } from "@/types/station";
import {
  fetchStations,
  filterStationsByCity,
  getUniqueCities,
} from "@/lib/api";

export function useStations(selectedCity: string | null) {
  const { data, isLoading, error } = useQuery<Station[], Error>({
    queryKey: ["stations"],
    queryFn: fetchStations,
  });

  const cities = useMemo(() => (data ? getUniqueCities(data) : []), [data]);
  const stations = useMemo(
    () => (data ? filterStationsByCity(data, selectedCity) : []),
    [data, selectedCity]
  );

  return {
    stations,
    cities,
    loading: isLoading,
    error: error?.message ?? null,
  };
}
