import { useEffect, useRef, useState } from "react";
import { Activity } from "lucide-react";
import { loadGoogleMaps } from "@/lib/googleMaps";

interface HeroMapContainerProps {
  className?: string;
}

const JAIPUR_ROUTES = [
  { origin: "Jaipur Central Depot", destination: "Ajmer", color: "#3b82f6" },
  { origin: "Jaipur Central Depot", destination: "Sikar", color: "#ff6f3d" },
  { origin: "Jaipur Central Depot", destination: "Alwar", color: "#00c6b1" },
];

export default function HeroMapContainer({ className }: HeroMapContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<any[]>([]);
  const animTimers = useRef<number[]>([]);

  useEffect(() => {
    let isActive = true;

    setError(null);
    loadGoogleMaps()
      .then((google) => {
        if (!ref.current || !isActive) return;
        
        const map = new google.maps.Map(ref.current, {
          center: { lat: 26.9124, lng: 75.7873 }, // Jaipur coordinates
          zoom: 10,
          disableDefaultUI: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#0b0d11" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#0b0d11" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#8ec0ff" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#1b2a41" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#142033" }] },
            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#163052" }] },
          ],
        });
        

        const directions = new google.maps.DirectionsService();

        JAIPUR_ROUTES.forEach((route, idx) => {
          directions.route(
            {
              origin: route.origin,
              destination: route.destination,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (res: any, status: any) => {
              if (status !== "OK" || !res?.routes?.[0]) return;
              const routePath = res.routes[0];
              const path = routePath.overview_path;

              const polyline = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: route.color,
                strokeOpacity: 0.8,
                strokeWeight: 4,
                map,
              });

              const marker = new google.maps.Marker({
                position: path[0],
                map,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 5,
                  fillColor: route.color,
                  fillOpacity: 1,
                  strokeColor: "white",
                  strokeWeight: 2,
                },
                title: `${route.origin} → ${route.destination}`,
              });

              markersRef.current.push(marker);

              let i = 0;
              const timer = window.setInterval(() => {
                i = (i + 1) % path.length;
                marker.setPosition(path[i]);
              }, 400 + idx * 100);

              animTimers.current.push(timer);
            }
          );
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Maps failed to load");
      });

    return () => {
      isActive = false;
      animTimers.current.forEach((t) => window.clearInterval(t));
      markersRef.current.forEach((m) => m.setMap(null));
    };
  }, []);

  if (error) {
    return (
      <div className={className}>
        <div className="flex h-full w-full items-center justify-center rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.12),rgba(11,13,17,0.95))] p-6 text-center">
          <p className="text-sm text-white/70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={ref} className={className} />
      
      {/* Overlay elements */}
      <div className="absolute bottom-5 left-5 flex flex-col gap-2 rounded-3xl border border-white/20 bg-white/5 px-4 py-3 text-xs text-white/80 backdrop-blur">
        <span className="font-semibold uppercase tracking-[0.3em] text-white/60">
          Live Passenger Count
        </span>
        <p className="text-sm font-semibold text-white">Bus #102: 41 onboard</p>
        <div className="flex items-center gap-2 text-xs">
          <Activity className="h-4 w-4 text-[#ff6f3d]" />
          Moderate crowd, plenty of seats
        </div>
      </div>

      {/* Animated bus labels */}
      <div className="animate-bus-one absolute left-[15%] top-[55%] flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-1 text-xs font-semibold text-[#0b0d11] shadow-[0_14px_28px_-16px_rgba(255,255,255,0.6)]">
        <span className="flex h-2 w-2 items-center justify-center rounded-full bg-primary">
          <span className="h-2 w-2 rounded-full bg-primary/40" />
        </span>
        Bus #102 · 3 min
      </div>
      
      <div className="animate-bus-two absolute left-[40%] top-[25%] flex items-center gap-2 rounded-full border border-white/10 bg-white/85 px-3 py-1 text-xs font-semibold text-[#0b0d11] shadow-[0_14px_28px_-16px_rgba(255,255,255,0.6)]">
        <span className="flex h-2 w-2 items-center justify-center rounded-full bg-[#ff6f3d]">
          <span className="h-2 w-2 rounded-full bg-[#ff6f3d]/50" />
        </span>
        Route 24A · 6 min
      </div>
      
      <div className="animate-bus-three absolute left-[58%] top-[68%] flex items-center gap-2 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-semibold text-[#0b0d11] shadow-[0_14px_28px_-16px_rgba(255,255,255,0.6)]">
        <span className="flex h-2 w-2 items-center justify-center rounded-full bg-[#00c6b1]">
          <span className="h-2 w-2 rounded-full bg-[#00c6b1]/50" />
        </span>
        Metro Link · 12 min
      </div>
    </div>
  );
}