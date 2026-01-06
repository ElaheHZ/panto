import { describe, it, expect } from "vitest";
import { filterStationsByCity, getUniqueCities } from "./api";
import { type Station } from "@/types/station";

const mockStations: Station[] = [
  {
    id: 1,
    name: "Berlin Hbf",
    city: "Berlin",
    lat: 52.5251,
    lng: 13.3694,
  },
  {
    id: 2,
    name: "Berlin Ostbahnhof",
    city: "Berlin",
    lat: 52.5108,
    lng: 13.4348,
  },
  {
    id: 4,
    name: "Hamburg Hbf",
    city: "Hamburg",
    lat: 53.553,
    lng: 10.0067,
  },
  {
    id: 7,
    name: "Munich Hbf",
    city: "Munich",
    lat: 48.1402,
    lng: 11.5586,
  },
];

describe("API Utils", () => {
  describe("filterStationsByCity", () => {
    it("should return all stations when city is null", () => {
      const result = filterStationsByCity(mockStations, null);
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockStations);
    });

    it("should filter stations by city correctly", () => {
      const result = filterStationsByCity(mockStations, "Berlin");
      expect(result).toHaveLength(2);
      expect(result.every((s) => s.city === "Berlin")).toBe(true);
    });

    it("should return empty array when no stations match the city", () => {
      const result = filterStationsByCity(mockStations, "NonExistentCity");
      expect(result).toHaveLength(0);
    });

    it("should be case-sensitive when filtering", () => {
      const result = filterStationsByCity(mockStations, "berlin");
      expect(result).toHaveLength(0);
    });
  });

  describe("getUniqueCities", () => {
    it("should return unique cities sorted alphabetically", () => {
      const result = getUniqueCities(mockStations);
      expect(result).toEqual(["Berlin", "Hamburg", "Munich"]);
    });

    it("should return empty array for empty stations list", () => {
      const result = getUniqueCities([]);
      expect(result).toHaveLength(0);
    });

    it("should handle duplicate cities correctly", () => {
      const stationsWithDuplicates: Station[] = [
        ...mockStations,
        {
          id: 5,
          name: "Berlin Another",
          city: "Berlin",
          lat: 52.5,
          lng: 13.4,
        },
      ];
      const result = getUniqueCities(stationsWithDuplicates);
      expect(result).toEqual(["Berlin", "Hamburg", "Munich"]);
    });
  });
});
