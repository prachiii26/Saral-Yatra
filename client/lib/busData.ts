export interface Bus {
  id: string;
  number: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  passengers: string;
  status: "Live" | "Scheduled" | "Delayed";
  route: string;
}

export const BUS_DATA: Bus[] = [
  // Jaipur routes
  { id: "JP-AJ-102", number: "RSRTC 102", from: "Jaipur", to: "Ajmer", departure: "08:20", arrival: "10:05", passengers: "36/50", status: "Live", route: "Jaipur-Ajmer" },
  { id: "JP-AJ-205", number: "RSRTC 205", from: "Jaipur", to: "Ajmer", departure: "10:30", arrival: "12:15", passengers: "28/50", status: "Scheduled", route: "Jaipur-Ajmer" },
  { id: "JP-SK-208", number: "RSRTC 208", from: "Jaipur", to: "Sikar", departure: "08:40", arrival: "09:55", passengers: "22/50", status: "Live", route: "Jaipur-Sikar" },
  { id: "JP-AL-312", number: "RSRTC 312", from: "Jaipur", to: "Alwar", departure: "09:00", arrival: "11:45", passengers: "41/50", status: "Live", route: "Jaipur-Alwar" },
  { id: "JP-KT-420", number: "RSRTC 420", from: "Jaipur", to: "Kota", departure: "09:30", arrival: "12:45", passengers: "18/50", status: "Scheduled", route: "Jaipur-Kota" },
  { id: "JP-UD-515", number: "RSRTC 515", from: "Jaipur", to: "Udaipur", departure: "07:00", arrival: "13:30", passengers: "45/50", status: "Live", route: "Jaipur-Udaipur" },
  
  // Ajmer routes
  { id: "AJ-JP-103", number: "RSRTC 103", from: "Ajmer", to: "Jaipur", departure: "11:20", arrival: "13:05", passengers: "32/50", status: "Live", route: "Ajmer-Jaipur" },
  { id: "AJ-UD-301", number: "RSRTC 301", from: "Ajmer", to: "Udaipur", departure: "08:15", arrival: "12:30", passengers: "39/50", status: "Live", route: "Ajmer-Udaipur" },
  
  // Kota routes
  { id: "KT-JP-421", number: "RSRTC 421", from: "Kota", to: "Jaipur", departure: "14:00", arrival: "17:15", passengers: "25/50", status: "Scheduled", route: "Kota-Jaipur" },
  { id: "KT-UD-601", number: "RSRTC 601", from: "Kota", to: "Udaipur", departure: "06:30", arrival: "11:45", passengers: "33/50", status: "Live", route: "Kota-Udaipur" },
  
  // Udaipur routes
  { id: "UD-JP-516", number: "RSRTC 516", from: "Udaipur", to: "Jaipur", departure: "15:00", arrival: "21:30", passengers: "42/50", status: "Live", route: "Udaipur-Jaipur" },
  { id: "UD-AJ-302", number: "RSRTC 302", from: "Udaipur", to: "Ajmer", departure: "13:45", arrival: "18:00", passengers: "29/50", status: "Scheduled", route: "Udaipur-Ajmer" },
  
  // Alwar routes
  { id: "AL-JP-313", number: "RSRTC 313", from: "Alwar", to: "Jaipur", departure: "12:30", arrival: "15:15", passengers: "37/50", status: "Live", route: "Alwar-Jaipur" },
  
  // Sikar routes
  { id: "SK-JP-209", number: "RSRTC 209", from: "Sikar", to: "Jaipur", departure: "10:45", arrival: "12:00", passengers: "31/50", status: "Live", route: "Sikar-Jaipur" },
];

export function searchBuses(from: string, to: string): Bus[] {
  if (!from || !to) return [];
  
  return BUS_DATA.filter(bus => 
    bus.from.toLowerCase() === from.toLowerCase() && 
    bus.to.toLowerCase() === to.toLowerCase()
  );
}