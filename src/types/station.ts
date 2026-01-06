export interface Station {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
}

export interface StationState {
  stations: Station[];
  loading: boolean;
  error: string | null;
  selectedCity: string | null;
  highlightedStationId: number | null;
}
