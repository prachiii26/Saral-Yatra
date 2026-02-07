import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/googleMaps";

interface MapContainerProps {
  className?: string;
  onReady?: (google: any, map: any) => void;
  dark?: boolean;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const NIGHT_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0b0d11" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b0d11" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec0ff" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1b2a41" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#142033" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#163052" }],
  },
];

export default function MapContainer({ className, onReady, dark = true, center = { lat: 26.9124, lng: 75.7873 }, zoom = 8 }: MapContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let map: any;
    let isActive = true;

    setError(null);
    loadGoogleMaps()
      .then((google) => {
        if (!ref.current || !isActive) return;
        map = new google.maps.Map(ref.current, {
          center,
          zoom,
          disableDefaultUI: false,
          styles: dark ? NIGHT_STYLE : undefined,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        onReady?.(google, map);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Google Maps failed to load. Check API key, billing, and HTTP referrer restrictions.",
        );
      });

    return () => {
      isActive = false;
    };
  }, [center.lat, center.lng, zoom, dark, onReady, retryKey]);

  if (error) {
    return (
      <div className={className}>
        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-border/70 bg-white/70 p-6 text-center">
          <div className="space-y-3">
            <p className="text-sm text-foreground/70">{error}</p>
            <button
              type="button"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              onClick={() => setRetryKey((k) => k + 1)}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div ref={ref} className={className} />;
}
