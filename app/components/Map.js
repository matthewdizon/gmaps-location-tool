import { useState } from "react";

const Map = ({ origin, mode, convertText }) => {
  const [destination, setDestination] = useState("Cloud 9 Boardwalk");
  return (
    <div className="grid gap-2">
      <h3 className="text-xl font-bold">
        Destination: {destination.split("+").join(" ") || "None"}
      </h3>
      <iframe
        className="rounded-3xl w-full min-h-[40vh]"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
        &origin=${origin}
        &destination=${destination}
        &mode=${mode}
    `}
      ></iframe>
      <input
        type="text"
        placeholder="Destination"
        value={destination.split("+").join(" ")}
        className="rounded text-black"
        onChange={(e) => setDestination(convertText(e.target.value))}
      />
    </div>
  );
};

export default Map;
