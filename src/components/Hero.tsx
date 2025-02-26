
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Destination {
  id: number;
  title: string;
}

export const Hero = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [guests, setGuests] = useState<string>("1");
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, title');
      
      if (error) {
        console.error('Error fetching destinations:', error);
        return;
      }

      setDestinations(data || []);
    };

    fetchDestinations();
  }, []);

  const handleSearch = () => {
    if (selectedDestination) {
      navigate(`/destination/${selectedDestination}`);
    }
  };

  return (
    <div className="relative h-[100vh] lg:h-[50vh] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Explore the world's most beautiful destinations with us
          </p>
        </div>

        <div
          className="bg-white/80 backdrop-blur-md rounded-lg p-4 md:p-6 max-w-4xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Where to?" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((destination) => (
                      <SelectItem key={destination.id} value={destination.id.toString()}>
                        {destination.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Check In</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  className="pl-10" 
                  type="date" 
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={today}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Guests (Optional)</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  className="pl-10" 
                  type="number" 
                  min="1" 
                  placeholder="2"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleSearch}
                disabled={!selectedDestination}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
