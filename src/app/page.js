"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

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
      <section>
        <h1>Welcome to Spooky Spots</h1>
        <p>
          Uncover haunted sites, eerie tours and real stories of the paranormal.
          Spooky Spots is your guide to the world&apos;s most chilling
          destinations.
        </p>
      </section>

      <h2>Discover haunted places near you!</h2>
      <Map placeData={places} width={50} height={35} />

      <h2>Browse our lists of Spooky Spots</h2>
      {places.map((place) => {
        return (
          <div key={place.endpoint} className="flex gap-5 mb-4">
            {place.image_url ? (
              <Link href={`/${place.endpoint}`}>
                <Image
                  src={place.image_url}
                  alt={place.slug}
                  width={130}
                  height={170}
                />
              </Link>
            ) : (
              <div className="flex items-center justify-center border border-white-300 w-[130px] h-[170px] text-s p-1">
                <p>Image will be available soon</p>
              </div>
            )}

            <div>
              <h2>{place.name}</h2>
              <p>{place.city}</p>
              <p>{place.slug}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
