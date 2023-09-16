"use client";

import { useState } from "react";
import Map from "./components/Map";

export default function Home() {
  const [origin, setOrigin] = useState("Amihan Bungalows Siargao");
  const [mode, setMode] = useState("driving");
  const [numberOfMaps, setNumberOfMaps] = useState(1);

  const modes = ["driving", "walking", "bicycling", "transit", "flying"];

  const convertText = (text: string) => {
    const splitText = text.split(" ");
    const query = splitText.join("+");
    return query;
  };

  return (
    <main className="p-12 grid">
      <div className="flex gap-2 flex-col pb-6 w-1/2">
        <h1 className="text-3xl font-bold">Google Maps Location Tool</h1>
        <p>
          This tool helps you figure out the distance from one location to
          another. For example, it will be helpful to understand how far a
          property you plan to rent out is from your
          workplace/university/malls/etc...
        </p>
      </div>
      <h2 className="text-2xl font-bold py-2">
        Origin: {origin.split("+").join(" ") || "None"}
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="flex gap-2 pb-4">
          <button
            className="p-2 bg-gray-500 rounded hover:bg-gray-50 hover:text-black"
            onClick={() => setNumberOfMaps(numberOfMaps + 1)}
          >
            Add Map
          </button>
          <button
            className="p-2 bg-gray-500 rounded hover:bg-gray-50 hover:text-black"
            onClick={() => setNumberOfMaps(numberOfMaps - 1)}
          >
            Remove Map
          </button>
        </div>
        <div className="pb-6 flex gap-2">
          <input
            type="text"
            placeholder="Origin"
            value={origin.split("+").join(" ")}
            className="rounded text-black"
            onChange={(e) => setOrigin(convertText(e.target.value))}
          />
          <div className="flex gap-2">
            {modes.map((travelMode, index) => {
              return (
                <button
                  onClick={() => setMode(travelMode)}
                  key={index}
                  className={`p-2 rounded ${
                    mode === travelMode
                      ? "bg-gray-50 text-black"
                      : "bg-gray-500 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  {travelMode.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: numberOfMaps }, (_, i) => i + 1).map((id) => {
          return (
            <Map
              origin={origin}
              mode={mode}
              convertText={convertText}
              key={id}
            />
          );
        })}
      </div>
    </main>
  );
}
