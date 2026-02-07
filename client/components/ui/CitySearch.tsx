import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";

const RAJASTHAN_CITIES = [
  "Jaipur", "Ajmer", "Alwar", "Kota", "Udaipur", "Sikar", "Bharatpur", 
  "Bikaner", "Jodhpur", "Pali", "Tonk", "Chittorgarh", "Bhilwara", 
  "Ganganagar", "Hanumangarh", "Jhunjhunu", "Nagaur", "Sawai Madhopur",
  "Banswara", "Baran", "Barmer", "Bundi", "Churu", "Dausa", "Dholpur",
  "Dungarpur", "Jaisalmer", "Jalore", "Jhalawar", "Karauli", "Pratapgarh",
  "Rajsamand", "Sirohi"
];

interface CitySearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CitySearch({ placeholder, value, onChange, className }: CitySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const filtered = RAJASTHAN_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setIsOpen(filtered.length > 0 && value !== "");
    } else {
      setFilteredCities([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (city: string) => {
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-border/70 bg-white/80 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        />
      </div>
      
      {isOpen && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-border/70 bg-white shadow-lg">
          {filteredCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                {city}, Rajasthan
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}