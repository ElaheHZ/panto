import { type Station } from "@/types/station";

const STATIONS_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/train-stations.json";

export async function fetchStations(): Promise<Station[]> {
  const response = await fetch(STATIONS_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch stations");
  }

  const data = (await response.json()) as Station[];

  return data;
}

export function getUniqueCities(stations: Station[]): string[] {
  const cities = new Set(stations.map((station) => station.city));
  return Array.from(cities).sort();
}

export function filterStationsByCity(
  stations: Station[],
  city: string | null
): Station[] {
  if (!city) return stations;
  return stations.filter((station) => station.city === city);
}
