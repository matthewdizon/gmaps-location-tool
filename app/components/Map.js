import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";

const Map = ({ origin, mode, convertText, maps, setMaps, mapNumber }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-4 w-4" />
          Destination: {maps[mapNumber].split("+").join(" ") || "None"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <iframe
          className="rounded-lg w-full min-h-[40vh] border"
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
            &origin=${origin}
            &destination=${maps[mapNumber]}
            &mode=${mode}
          `}
        />
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter destination"
            value={maps[mapNumber].split("+").join(" ")}
            onChange={(e) => {
              const newMaps = [...maps];
              newMaps[mapNumber] = convertText(e.target.value);
              setMaps(newMaps);
            }}
            className="flex-1"
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() =>
              setMaps((maps) => maps.filter((_, index) => index !== mapNumber))
            }
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;
