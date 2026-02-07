import { useState } from "react";
import { Activity, Route as RouteIcon, RefreshCw, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import CitySearch from "@/components/ui/CitySearch";
import { searchBuses, Bus } from "@/lib/busData";
import BusTrackingMap from "@/components/maps/BusTrackingMap";



export default function LiveTracking() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { t } = useLanguage();

  const handleSearch = () => {
    if (fromCity && toCity) {
      const foundBuses = searchBuses(fromCity, toCity);
      setBuses(foundBuses);
      setHasSearched(true);
      setSelectedBus(null);
    }
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleBusClick = (bus: Bus) => {
    setSelectedBus(bus);
  };



  return (
    <section className="container space-y-10 pt-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-primary">
            Live Tracking
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
{t("movingBuses")}
          </h1>
          <p className="max-w-2xl text-foreground/70">
{t("searchDescription")}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_36px_1fr_auto]">
            <CitySearch 
              placeholder={t("fromCity")} 
              value={fromCity} 
              onChange={setFromCity}
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
              value={toCity} 
              onChange={setToCity}
            />
            <Button 
              onClick={handleSearch}
              disabled={!fromCity || !toCity}
              className="rounded-2xl bg-gradient-to-br from-primary to-blue-600 disabled:opacity-50"
            >
{t("searchBuses")}
            </Button>
          </div>
        </div>
        {hasSearched && (
          <div className="text-sm text-foreground/70">
            {buses.length > 0 ? (
              `Found ${buses.length} bus${buses.length === 1 ? '' : 'es'} from ${fromCity} to ${toCity}`
            ) : (
              `No buses found from ${fromCity} to ${toCity}`
            )}
          </div>
        )}
      </div>

      {selectedBus && (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <BusTrackingMap 
            bus={selectedBus} 
            className="aspect-[16/9] w-full"
          />
          <div className="flex flex-col gap-4 rounded-[24px] border border-border/70 bg-white/80 p-5 shadow-soft-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Selected Bus</div>
                <div className="mt-1 text-2xl font-semibold">{selectedBus.number}</div>
              </div>
              <span className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                selectedBus.status === "Live" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              )}>
                <span className={cn(
                  "h-2 w-2 rounded-full",
                  selectedBus.status === "Live" ? "bg-green-500" : "bg-yellow-500"
                )} />
                {selectedBus.status}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Route:</span>
                <span className="font-medium">{selectedBus.from} → {selectedBus.to}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Departure:</span>
                <span className="font-medium">{selectedBus.departure}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Arrival:</span>
                <span className="font-medium">{selectedBus.arrival}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Passengers:</span>
                <span className="font-medium">{selectedBus.passengers}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {buses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {buses.map((bus) => (
            <div 
              key={bus.id} 
              onClick={() => handleBusClick(bus)}
              className={cn(
                "group cursor-pointer rounded-2xl border border-border/70 bg-white/80 p-5 shadow-[0_18px_40px_-28px_rgba(8,12,24,0.6)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(8,12,24,0.55)]",
                selectedBus?.id === bus.id && "ring-2 ring-primary border-primary/50"
              )}
            >
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="text-sm font-semibold text-foreground">
                  <div className="text-base font-bold">{bus.departure}</div>
                  <div className="text-foreground/70">{bus.from}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">Bus</div>
                  <div className="text-sm font-semibold">{bus.number}</div>
                  <div className={cn(
                    "mt-1 inline-flex items-center gap-2 text-xs font-semibold",
                    bus.status === "Live" ? "text-[#22c55e]" : "text-yellow-600"
                  )}>
                    <span className={cn(
                      "relative inline-flex h-2 w-2 rounded-full",
                      bus.status === "Live" ? "bg-[#22c55e]" : "bg-yellow-500"
                    )}>
                      {bus.status === "Live" && (
                        <span className="absolute inset-0 animate-badge-pulse rounded-full bg-[#22c55e]/50" />
                      )}
                    </span>
                    {bus.status}
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-foreground">
                  <div className="text-base font-bold">{bus.arrival}</div>
                  <div className="text-foreground/70">{bus.to}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-foreground/70">
                <div className="flex items-center gap-2">
                  <Activity className={cn(
                    "h-4 w-4",
                    bus.status === "Live" ? "text-[#22c55e]" : "text-yellow-500"
                  )} /> 
                  {bus.from} → {bus.to}
                </div>
                <div className="font-semibold">Passengers: {bus.passengers}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {hasSearched && buses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-foreground/60 mb-4">No buses found for this route</div>
          <p className="text-sm text-foreground/50">Try searching for a different route or check back later</p>
        </div>
      )}
    </section>
  );
}
