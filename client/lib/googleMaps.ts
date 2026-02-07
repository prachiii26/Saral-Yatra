declare global {
  interface Window {
    google: any;
  }
}

let mapsLoaderPromise: Promise<any> | null = null;

export function loadGoogleMaps(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject("No window");
  if (window.google && window.google.maps) return Promise.resolve(window.google);
  if (mapsLoaderPromise) return mapsLoaderPromise;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  if (!apiKey) {
    return Promise.reject(
      new Error("Missing VITE_GOOGLE_MAPS_API_KEY. Set it in environment variables."),
    );
  }

  mapsLoaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = (e) => reject(new Error("Failed to load Google Maps JS API"));
    document.head.appendChild(script);
  });

  return mapsLoaderPromise;
}
