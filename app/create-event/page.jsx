'use client';
import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import { v4 as uuidv4 } from 'uuid';
function CreatePage() {
  const {data: session} = useSession();
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    const fetchArtists = async () => {
      const data = await fetch("https://qevent-backend.labs.crio.do/artists");
      const artists = await data.json();
      setArtists(artists);
    }
    const fetchTags = async () => {
      const data = await fetch("https://qevent-backend.labs.crio.do/tags");
      const tags = await data.json();
      setTags(tags.map(tag => ({
        label: tag.name,
        value: tag.name,
      })));
    }

    Promise.all([fetchArtists(),fetchTags()])
    .then(() => {
      console.log('Data fetched')
    })
    .catch(err => {
      throw new Error(err);
    });
  },[])

  useEffect(() => {
    if (!session) {
      router.replace("/events");
    }
  },[])
  const handleEventCreate = async (e) => {
    e.preventDefault();
    const payload = {
      id: uuidv4(),
      name: e.target.elements["name"].value,
      description: e.target.elements["description"].value,
      location: e.target.elements["location"].value,
      date: e.target.elements["date"].value,
      time: e.target.elements["time"].value,
      tags: selectedTags.map(tag => tag.value),
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      artist: e.target.elements["artist"].value,
      price: e.target.elements["price"].value,
    };
    const data = await fetch("https://qevent-backend.labs.crio.do/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    await data.json();
    router.push("/events",{
      replace: true,
    });
  };
  return (
    <section className="h-[calc(100vh-6rem)] p-2">
      <form className="flex flex-col gap-3 h-full p-5" onSubmit={handleEventCreate}>
        <input className="bg-slate-300 p-3 text-black" placeholder="Event name" type="text" name="name" id="" />
        <textarea rows={10} className="bg-slate-300 p-3 text-black" placeholder="Event description" type="text" name="description" id="" />
        <input className="bg-slate-300 p-3 text-black" placeholder="Event location" type="text" name="location" id="" />
        {/* <input className="bg-slate-300 p-3 text-black" placeholder="Artist" type="text" name="artist" id="" /> */}
        <select placeholder="Select Artist" className="bg-slate-300 text-black p-3" name="artist" id="">
          <option value="" selected>Select Artist</option>
          {artists?.map((artist) => (
            <option value={artist.name}>{artist.name}</option>
          ))}
        </select>
        <MultiSelect
          options={tags}
          value={selectedTags}
          onChange={setSelectedTags}
          labelledBy="Select Tags"
          isLoading={!tags.length}
        />
        <input className="bg-slate-300 p-3 text-black" placeholder="Event date" type="date" name="date" id="" />
        <input className="bg-slate-300 p-3 text-black" placeholder="Event time" type="time" name="time" id="" />
        <input className="bg-slate-300 p-3 text-black" placeholder="Price (in $)" type="number" name="price" id="" />
        <button className="bg-blue-600 text-white p-3" type="submit">Create Event</button>
      </form>

    </section>
  );
}

export default CreatePage;
