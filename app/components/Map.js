import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, X, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Map = ({ origin, mode, convertText, maps, setMaps, mapNumber }) => {
  const { toast } = useToast();
  const destination = maps[mapNumber].split("+").join(" ") || "None";

  const handleRemoveMap = () => {
    setMaps((maps) => maps.filter((_, index) => index !== mapNumber));
    toast({
      title: "Map Removed",
      description: `Destination "${destination}" has been removed.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <MapPin className="h-4 w-4" />
            <span className="truncate">Destination: {destination}</span>
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <HelpCircle className="h-4 w-4 mr-0 sm:mr-2" />
                <span className="hidden sm:inline">Need Help?</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Location Naming Tips</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  For best results, please include the city or region in your
                  location name. For example:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-4">
                  <li>
                    Instead of &quot;Cloud 9&quot;, use &quot;Cloud 9
                    Siargao&quot;
                  </li>
                  <li>
                    Instead of &quot;SM Mall&quot;, use &quot;SM Mall of Asia
                    Manila&quot;
                  </li>
                  <li>
                    Instead of &quot;Ayala Mall&quot;, use &quot;Ayala Center
                    Cebu&quot;
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  This helps Google Maps find the exact location you&apos;re
                  looking for and ensures the map displays correctly.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6 pb-4">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg border"
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
              &origin=${origin}
              &destination=${maps[mapNumber]}
              &mode=${mode}
            `}
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => {
              const newMaps = [...maps];
              newMaps[mapNumber] = convertText(e.target.value);
              setMaps(newMaps);
            }}
            className="flex-1 text-sm sm:text-base"
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRemoveMap}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;
