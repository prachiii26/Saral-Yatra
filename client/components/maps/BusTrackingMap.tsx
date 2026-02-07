import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/googleMaps";
import { Bus } from "@/lib/busData";
import { Clock, Users, MapPin } from "lucide-react";

interface BusTrackingMapProps {
  bus: Bus;
  className?: string;
}

export default function BusTrackingMap({ bus, className }: BusTrackingMapProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mapData, setMapData] = useState<{
    distance: string;
    duration: string;
  }>({
    distance: "Loading...",
    duration: "Loading..."
  });
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    let isActive = true;

    // Clear previous animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    loadGoogleMaps()
      .then((google) => {
        if (!ref.current || !isActive) return;

        // Clear previous map elements
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        if (polylineRef.current) {
          polylineRef.current.setMap(null);
        }

        const map = new google.maps.Map(ref.current, {
          zoom: 8,
          center: { lat: 26.9124, lng: 75.7873 },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapRef.current = map;

        // Create simple polyline and marker without DirectionsService
        const createSimpleRoute = () => {
          // Approximate coordinates for major Rajasthan cities
          const cityCoords: { [key: string]: { lat: number; lng: number } } = {
            "Jaipur": { lat: 26.9124, lng: 75.7873 },
            "Ajmer": { lat: 26.4499, lng: 74.6399 },
            "Alwar": { lat: 27.5530, lng: 76.6346 },
            "Kota": { lat: 25.2138, lng: 75.8648 },
            "Udaipur": { lat: 24.5854, lng: 73.7125 },
            "Sikar": { lat: 27.6094, lng: 75.1399 },
            "Bikaner": { lat: 28.0229, lng: 73.3119 },
            "Jodhpur": { lat: 26.2389, lng: 73.0243 }
          };

          const fromCoord = cityCoords[bus.from] || cityCoords["Jaipur"];
          const toCoord = cityCoords[bus.to] || cityCoords["Ajmer"];

          // Create polyline
          const polyline = new google.maps.Polyline({
            path: [fromCoord, toCoord],
            geodesic: true,
            strokeColor: "#3b82f6",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: map,
          });
          polylineRef.current = polyline;

          // Calculate approximate distance and duration
          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(fromCoord.lat, fromCoord.lng),
            new google.maps.LatLng(toCoord.lat, toCoord.lng)
          );
          const distanceKm = Math.round(distance / 1000);
          const durationHours = Math.round(distanceKm / 60 * 100) / 100;

          setMapData({
            distance: `${distanceKm} km`,
            duration: `${durationHours} hours`
          });

          // Create bus marker
          const marker = new google.maps.Marker({
            position: fromCoord,
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: bus.status === "Live" ? "#22c55e" : "#3b82f6",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
            },
            title: bus.number,
          });
          markerRef.current = marker;

          // Fit map to show both cities
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(fromCoord);
          bounds.extend(toCoord);
          map.fitBounds(bounds);

          // Animate marker between cities
          let progress = 0;
          const animateMarker = () => {
            if (progress <= 1 && isActive) {
              const lat = fromCoord.lat + (toCoord.lat - fromCoord.lat) * progress;
              const lng = fromCoord.lng + (toCoord.lng - fromCoord.lng) * progress;
              marker.setPosition({ lat, lng });
              progress += 0.01;
              animationRef.current = window.setTimeout(animateMarker, 100);
            } else if (isActive) {
              progress = 0;
              animationRef.current = window.setTimeout(animateMarker, 100);
            }
          };
          
          setTimeout(() => {
            if (isActive) animateMarker();
          }, 500);
        };

        createSimpleRoute();
      })
      .catch((err) => {
        console.error("Map loading failed:", err);
        setMapData({
          distance: "N/A",
          duration: "N/A"
        });
      });

    return () => {
      isActive = false;
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [bus]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border/70 bg-white/80 p-4 text-center">
          <MapPin className="mx-auto h-5 w-5 text-primary mb-2" />
          <div className="text-xs text-gray-600">Distance</div>
          <div className="font-semibold">{mapData.distance}</div>
        </div>
        <div className="rounded-xl border border-border/70 bg-white/80 p-4 text-center">
          <Clock className="mx-auto h-5 w-5 text-primary mb-2" />
          <div className="text-xs text-gray-600">Duration</div>
          <div className="font-semibold">{mapData.duration}</div>
        </div>
        <div className="rounded-xl border border-border/70 bg-white/80 p-4 text-center">
          <Users className="mx-auto h-5 w-5 text-primary mb-2" />
          <div className="text-xs text-gray-600">Passengers</div>
          <div className="font-semibold">{bus.passengers}</div>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-xl border border-border/70 bg-white/70 p-2 shadow-soft-card">
        <div ref={ref} className={`rounded-lg ${className}`} style={{ minHeight: '400px' }} />
      </div>
    </div>
  );
}