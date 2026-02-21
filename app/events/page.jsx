'use client'

import React, { useState, useEffect, Suspense } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

// 1. Move your logic into a sub-component
function EventList() {
  const searchParams = useSearchParams();
  const tagQuery = searchParams.get('tag');
  const artistQuery = searchParams.get('artist');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const API_ENDPOINT = "https://qevent-backend.labs.crio.do/events";
    const fetchEvents = async () => {
      const data = await fetch(API_ENDPOINT);
      const eventData = await data.json();

      let filteredEvents = [];

      if (tagQuery) {
        filteredEvents = eventData.filter(event => event.tags.includes(tagQuery));
      } else if (artistQuery) {
        filteredEvents = eventData.filter(event => event.artist.toLowerCase() === artistQuery.toLowerCase());
      } else {
        filteredEvents = eventData;
      }

      setEvents(filteredEvents);
    };
    fetchEvents();
  }, [tagQuery, artistQuery]); // Added dependencies here so it re-filters if URL changes!

  return (
    <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
      {events && events.map((eventData) => (
        <EventCard key={eventData.id} eventData={eventData} />
      ))}
    </div>
  );
}

// 2. The main Page component just provides the Suspense boundary
export default function Events() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading Events...</div>}>
      <EventList />
    </Suspense>
  );
}



// 'use client'

// import React, { useState, useEffect } from "react";
// import EventCard from "@/components/EventCard";
// import { useSearchParams } from "next/navigation";

// function EventPage(){

//   const searchParams = useSearchParams();
//   const tagQuery = searchParams.get('tag')
//   const artistQuery = searchParams.get('artist')
//   const [events, setEvents] = useState([])


//   useEffect(() => {
//     const fetchEvents = async() => {
//       const data = await fetch("https://qevent-backend.labs.crio.do/events");
//       const eventData = await data.json();

//       let filteredEvents = []

//       if(tagQuery){
//         filteredEvents = eventData.filter(event => event.tags.includes(tagQuery))
//       }else if(artistQuery){
//         filteredEvents = eventData.filter(event => event.artist.toLowerCase() === artistQuery.toLowerCase())
//       }else {
//         filteredEvents = eventData
//       }
      
//       setEvents(filteredEvents)
//     }
//     fetchEvents();
//   },[])

//   return (
//     // <div>
//     //   Events
//     // </div>
//     <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
//       {events && events.map((eventData) => (
//         <EventCard key={eventData.id} eventData={eventData} />
//       ))}
//     </div>
//   );
// }

// export default EventPage;
