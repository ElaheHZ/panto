import { useEffect, useMemo, useState } from "react";
import type { Station } from "@/types/station";
import {
  fetchStations,
  filterStationsByCity,
  getUniqueCities,
} from "@/lib/api";

type StationsState = {
  data: Station[];
  loading: boolean;
  error: string | null;
};

const initialState: StationsState = {
  data: [],
  loading: true,
  error: null,
};

export function useStations(selectedCity: string | null) {
  const [state, setState] = useState<StationsState>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    fetchStations()
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setState({
            data: [],
            loading: false,
            error:
              err instanceof Error ? err.message : "Failed to fetch stations",
          });
        }
      });

    return () => controller.abort();
  }, []);

  const cities = useMemo(() => getUniqueCities(state.data), [state.data]);

  const stations = useMemo(
    () => filterStationsByCity(state.data, selectedCity),
    [state.data, selectedCity]
  );

  return {
    stations,
    cities,
    loading: state.loading,
    error: state.error,
  };
}
