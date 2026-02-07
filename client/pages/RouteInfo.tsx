import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Navigation, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CitySearch from "@/components/ui/CitySearch";
import { loadGoogleMaps } from "@/lib/googleMaps";

interface RouteDetails {
  distance: string;
  duration: string;
  steps: Array<{
    instruction: string;
    distance: string;
  }>;
}

export default function RouteInfo() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const cityCoords: { [key: string]: { lat: number; lng: number } } = {
    "Jaipur": { lat: 26.9124, lng: 75.7873 },
    "Ajmer": { lat: 26.4499, lng: 74.6399 },
    "Alwar": { lat: 27.5530, lng: 76.6346 },
    "Kota": { lat: 25.2138, lng: 75.8648 },
    "Udaipur": { lat: 24.5854, lng: 73.7125 },
    "Sikar": { lat: 27.6094, lng: 75.1399 },
    "Bikaner": { lat: 28.0229, lng: 73.3119 },
    "Jodhpur": { lat: 26.2389, lng: 73.0243 },
    "Bharatpur": { lat: 27.2152, lng: 77.4909 },
    "Pali": { lat: 25.7711, lng: 73.3234 },
    "Tonk": { lat: 26.1684, lng: 75.7886 },
    "Chittorgarh": { lat: 24.8887, lng: 74.6269 },
    "Bhilwara": { lat: 25.3407, lng: 74.6269 },
    "Ganganagar": { lat: 29.9167, lng: 73.8833 },
    "Hanumangarh": { lat: 29.5814, lng: 74.3089 },
    "Jhunjhunu": { lat: 28.1267, lng: 75.3980 },
    "Nagaur": { lat: 27.2027, lng: 73.7125 },
    "Sawai Madhopur": { lat: 26.0173, lng: 76.3441 },
    "Banswara": { lat: 23.5441, lng: 74.4421 },
    "Baran": { lat: 25.1011, lng: 76.5132 },
    "Barmer": { lat: 25.7500, lng: 71.3833 },
    "Bundi": { lat: 25.4305, lng: 75.6499 },
    "Churu": { lat: 28.2969, lng: 74.9647 },
    "Dausa": { lat: 26.8947, lng: 76.3308 },
    "Dholpur": { lat: 26.7009, lng: 77.8964 },
    "Dungarpur": { lat: 23.8441, lng: 73.7147 },
    "Jaisalmer": { lat: 26.9157, lng: 70.9083 },
    "Jalore": { lat: 25.3456, lng: 72.6156 },
    "Jhalawar": { lat: 24.5965, lng: 76.1608 },
    "Karauli": { lat: 26.4985, lng: 77.0204 },
    "Pratapgarh": { lat: 24.0311, lng: 74.7789 },
    "Rajsamand": { lat: 25.0728, lng: 73.8819 },
    "Sirohi": { lat: 24.8853, lng: 72.8589 }
  };

  const generateDirections = (from: string, to: string) => {
    const directions = [
      { instruction: `Head northeast from ${from} city center`, distance: "2.5 km" },
      { instruction: "Continue on National Highway", distance: "45 km" },
      { instruction: "Take the exit toward State Highway", distance: "8 km" },
      { instruction: "Turn right at the main junction", distance: "12 km" },
      { instruction: "Continue straight for 25 km", distance: "25 km" },
      { instruction: `Enter ${to} city limits`, distance: "3 km" },
      { instruction: `Arrive at ${to} destination`, distance: "1 km" }
    ];
    return directions;
  };

  const handleShowRoute = async () => {
    if (!origin || !destination || !mapContainer) return;
    
    setIsLoading(true);
    try {
      const google = await loadGoogleMaps();
      
      const fromCoord = cityCoords[origin] || cityCoords["Jaipur"];
      const toCoord = cityCoords[destination] || cityCoords["Ajmer"];
      
      const map = new google.maps.Map(mapContainer, {
        zoom: 8,
        center: fromCoord,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Create polyline
      const polyline = new google.maps.Polyline({
        path: [fromCoord, toCoord],
        geodesic: true,
        strokeColor: "#3b82f6",
        strokeOpacity: 1.0,
        strokeWeight: 6,
        map: map,
      });

      // Create markers
      new google.maps.Marker({
        position: fromCoord,
        map: map,
        title: origin,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#22c55e",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 3,
        }
      });

      new google.maps.Marker({
        position: toCoord,
        map: map,
        title: destination,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#ef4444",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 3,
        }
      });

      // Fit map to show both cities
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(fromCoord);
      bounds.extend(toCoord);
      map.fitBounds(bounds);

      // Calculate distance
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(fromCoord.lat, fromCoord.lng),
        new google.maps.LatLng(toCoord.lat, toCoord.lng)
      );
      const distanceKm = Math.round(distance / 1000);
      const durationHours = Math.round(distanceKm / 60 * 100) / 100;

      setRouteDetails({
        distance: `${distanceKm} km`,
        duration: `${durationHours} hours`,
        steps: generateDirections(origin, destination)
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Route calculation failed:', error);
      setIsLoading(false);
    }
  };

  const handleSwapCities = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <section className="container space-y-8 pt-20">
      <div className="space-y-3">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
{t("routeExplorer")}
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("comprehensiveRoute")}</h1>
        <p className="max-w-2xl text-foreground/70">{t("routeDescription")}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_36px_1fr_auto]">
        <CitySearch 
          placeholder={t("fromCity")} 
          value={origin} 
          onChange={setOrigin}
        />
        <button 
          type="button" 
          aria-label="Swap" 
          onClick={handleSwapCities}
          className="inline-flex items-center justify-center rounded-xl border border-border/70 bg-white/80 text-foreground hover:bg-gray-50"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>
        <CitySearch 
          placeholder={t("toCity")} 
          value={destination} 
          onChange={setDestination}
        />
        <Button 
          onClick={handleShowRoute}
          disabled={!origin || !destination || isLoading}
          className="rounded-xl bg-gradient-to-br from-primary to-blue-600 disabled:opacity-50"
        >
{isLoading ? t("loading") : t("getDirections")}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="overflow-hidden rounded-[24px] border border-border/70 bg-white/70 p-2 shadow-soft-card">
          <div 
            ref={setMapContainer}
            className="aspect-[16/9] w-full rounded-[18px]" 
            style={{ minHeight: '400px' }}
          />
        </div>

        {routeDetails && (
          <div className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-white/80 p-4 text-center">
                <MapPin className="mx-auto h-5 w-5 text-primary mb-2" />
                <div className="text-xs text-gray-600">{t("distance")}</div>
                <div className="font-semibold">{routeDetails.distance}</div>
              </div>
              <div className="rounded-xl border border-border/70 bg-white/80 p-4 text-center">
                <Clock className="mx-auto h-5 w-5 text-primary mb-2" />
                <div className="text-xs text-gray-600">{t("duration")}</div>
                <div className="font-semibold">{routeDetails.duration}</div>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-white/80 p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Navigation className="h-4 w-4 text-primary" />
                Turn-by-turn Directions
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {routeDetails.steps.map((step, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {step.instruction}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {step.distance} • {step.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
