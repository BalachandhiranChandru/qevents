import React from "react";
import ArtistCard from "@/components/ArtistCard";

async function ArtistsPage() {
  
  const data = await fetch("https://qevent-backend.labs.crio.do/artists");
  const artists = await data.json();
  
  return (
    <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
      {artists.map((artistData) => (
        <ArtistCard artistData={artistData} />
      ))}
    </div>
  );
}

export default ArtistsPage;
