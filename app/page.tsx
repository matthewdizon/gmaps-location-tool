"use client";

import { useState, useEffect } from "react";
import Map from "./components/Map";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Share2, Plus, MapPin, Trash2, Pencil, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [origin, setOrigin] = useState("Amihan Bungalows Siargao");
  const [mode, setMode] = useState("driving");
  const [maps, setMaps] = useState(["Cloud 9 Boardwalk"]);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const originSearch = searchParams.get("origin") || origin;
  const destinationSearch = searchParams.get("destination") || maps[0];
  const destinations = destinationSearch?.split(",");

  const modes = [
    "🚗 Driving",
    "🚶‍♂️ Walking",
    "🚴‍♂️ Bicycling",
    "🚌 Transit",
    "✈️ Flying",
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

  const handleAddMap = () => {
    setMaps((maps) => [...maps, ""]);
    toast({
      title: "Map Added",
      description:
        "A new map has been added. Enter an additional destination to compare.",
    });
  };

  const handleShareUrl = () => {
    const url = `http://${
      window.location.host
    }/?origin=${origin}&destination=${maps.join(",")}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "The current maps have been copied to your clipboard.",
    });
  };

  const scrollToMap = (index: number) => {
    const element = document.getElementById(`map-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDeleteMap = (index: number) => {
    setMaps((currentMaps) => currentMaps.filter((_, i) => i !== index));
    toast({
      title: "Destination Removed",
      description: "The destination has been removed from the list.",
    });
  };

  const handleStartEdit = (index: number, value: string) => {
    setEditingIndex(index);
    setEditValue(value.split("+").join(" "));
  };

  const handleSaveEdit = (index: number) => {
    if (editValue.trim()) {
      setMaps((currentMaps) => {
        const newMaps = [...currentMaps];
        newMaps[index] = convertText(editValue);
        return newMaps;
      });
      toast({
        title: "Destination Updated",
        description: "The destination has been updated successfully.",
      });
    }
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Google Maps Location Tool
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          This tool helps you figure out the distance from one location to
          another. Perfect for understanding how far a property is from key
          locations like your workplace, university, or shopping centers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="w-full">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              Origin: {origin.split("+").join(" ") || "None"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input
                type="text"
                placeholder="Enter origin location"
                value={origin.split("+").join(" ")}
                onChange={(e) => setOrigin(convertText(e.target.value))}
                className="flex-1 text-sm sm:text-base"
              />
            </div>

            <Tabs
              defaultValue={mode}
              onValueChange={setMode}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full h-auto p-1">
                {modes.map((travelMode, index) => (
                  <TabsTrigger
                    key={index}
                    value={travelMode.split(" ")[1].toLowerCase()}
                    className="text-xs sm:text-sm py-2 px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {travelMode}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {maps.length === 0 ? (
          <Card className="w-full border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <MapPin className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  No destinations added yet
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Click the &quot;Add Destination&quot; button above to start
                  comparing distances from your origin to different
                  destinations.
                </p>
              </div>
              <Button variant="outline" onClick={handleAddMap} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Destination
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader className="px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl">Overview</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleAddMap}
                    className="whitespace-nowrap text-sm sm:text-base"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Destination
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShareUrl}
                    className="whitespace-nowrap text-sm sm:text-base"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share URL
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Destinations ({maps.length})
                </p>
                <ul className="space-y-2">
                  {maps.map((destination, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between group"
                    >
                      {editingIndex === index ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="h-8"
                            autoFocus
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveEdit(index)}
                            className="h-8 px-2"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="h-8 px-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="text-base">
                            {destination.split("+").join(" ")}
                          </span>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleStartEdit(index, destination)
                              }
                              className="h-8 px-2"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMap(index)}
                              className="h-8 px-2 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => scrollToMap(index)}
                              className="h-8 px-2"
                            >
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-4 sm:my-6" />

      {maps.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {maps.map((destination, index) => (
            <div id={`map-${index}`} key={index}>
              <Map
                origin={origin}
                mode={mode}
                convertText={convertText}
                maps={maps}
                setMaps={setMaps}
                mapNumber={index}
              />
            </div>
          ))}
        </div>
      )}

      <Toaster />
    </main>
  );
}
