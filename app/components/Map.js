const Map = ({ origin, mode, convertText, maps, setMaps, mapNumber }) => {
  return (
    <div className="grid gap-2">
      <h3 className="text-xl font-bold">
        Destination: {maps[mapNumber].split("+").join(" ") || "None"}
      </h3>
      <iframe
        className="rounded-3xl w-full min-h-[40vh]"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
        &origin=${origin}
        &destination=${maps[mapNumber]}
        &mode=${mode}
    `}
      ></iframe>
      <input
        type="text"
        placeholder="Destination"
        value={maps[mapNumber].split("+").join(" ")}
        className="rounded text-black"
        onChange={(e) => {
          const newMaps = [...maps];
          newMaps[mapNumber] = convertText(e.target.value);
          console.log("here", newMaps);
          setMaps(newMaps);
        }}
      />
      <button
        className="p-2 bg-gray-500 rounded hover:bg-gray-50 hover:text-black"
        onClick={() =>
          setMaps((maps) => maps.filter((map, index) => index != mapNumber))
        }
      >
        Remove Map
      </button>
    </div>
  );
};

export default Map;
