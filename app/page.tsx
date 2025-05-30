"use client";

import { useState, useEffect } from "react";
import Map from "./components/Map";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Share2, Plus, MapPin } from "lucide-react";

export default function Home() {
  const [origin, setOrigin] = useState("Amihan Bungalows Siargao");
  const [mode, setMode] = useState("driving");
  const [maps, setMaps] = useState(["Cloud 9 Boardwalk"]);
  const searchParams = useSearchParams();

  const originSearch = searchParams.get("origin") || origin;
  const destinationSearch = searchParams.get("destination") || maps[0];
  const destinations = destinationSearch?.split(",");

  const modes = [
    "🚗 driving",
    "🚶‍♂️ walking",
    "🚴‍♂️ bicycling",
    "🚌 transit",
    "✈️ flying",
  ];

  const convertText = (text: string) => {
    const splitText = text.split(" ");
    const query = splitText.join("+");
    return query;
  };

  useEffect(() => {
    if (originSearch || destinationSearch) {
      setOrigin(originSearch);
      setMaps(destinations);
    }
  }, []);

  return (
    <main className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Google Maps Location Tool
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          This tool helps you figure out the distance from one location to
          another. Perfect for understanding how far a property is from key
          locations like your workplace, university, or shopping centers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Origin: {origin.split("+").join(" ") || "None"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter origin location"
              value={origin.split("+").join(" ")}
              onChange={(e) => setOrigin(convertText(e.target.value))}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setMaps((maps) => [...maps, ""])}
                className="whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Map
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://${
                      window.location.host
                    }/?origin=${origin}&destination=${maps.join(",")}`
                  )
                }
                className="whitespace-nowrap"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share URL
              </Button>
            </div>
          </div>

          <Tabs defaultValue={mode} onValueChange={setMode} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              {modes.map((travelMode, index) => (
                <TabsTrigger
                  key={index}
                  value={travelMode.split(" ")[1]}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {travelMode}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Separator />

      <div className="grid md:grid-cols-2 gap-6">
        {maps.map((destination, index) => (
          <Map
            origin={origin}
            mode={mode}
            convertText={convertText}
            maps={maps}
            setMaps={setMaps}
            mapNumber={index}
            key={index}
          />
        ))}
      </div>
    </main>
  );
}
