import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CityFilterProps {
  cities: string[];
  selectedCity: string | null;
  onCityChange: (city: string | null) => void;
}

export default function CityFilter({
  cities,
  selectedCity,
  onCityChange,
}: CityFilterProps) {
  return (
    <div className="p-4 border-b border-gray-200 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          Filter by City
        </label>
        {selectedCity && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCityChange(null)}
            className="h-auto p-0 text-xs text-gray-500 hover:text-gray-700"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <Select
        value={selectedCity || "all"}
        onValueChange={(value) => {
          onCityChange(value === "all" ? null : value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a city..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
