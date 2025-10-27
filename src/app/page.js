"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

export default function HomePage() {
  const [places, setPlaces] = useState([]);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    async function getPlaceData() {
      // will need to change localhost to deployed url
      const response = await fetch("http://localhost:3000/api/places");
      const data = await response.json();
      setPlaces(data.rows);
      // console.log(data.rows);
      return data.rows;
    }

    getPlaceData();
  }, []);

  return (
    <div>
      <h1>Welcome to Spooky Spots!</h1>

      <Map width={50} height={35} />

      <h2>Browse our lists of Spooky Spots</h2>
      {places.map((place) => {
        return (
          <div key={place.endpoint}>
            <Image
              src={place.image_url}
              alt={place.slug}
              width={100}
              height={150}
            />

            <h2>{place.name}</h2>
            <p>{place.city}</p>
            <p>{place.slug}</p>
          </div>
        );
      })}
    </div>
  );
}
