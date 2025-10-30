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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/places`
      );
      const data = await response.json();
      setPlaces(data.rows);
      return data.rows;
    }

    getPlaceData();
  }, []);

  return (
    <div className="homepage-container">
      <section>
        <div className="hero-section">
          <h2>Dare to explore the unknown?</h2>
          <p>
            Step into the shadows with Spooky Spots and uncover haunted
            hideaways, ghostly tours and true tales from the beyond.
          </p>
          <p>
            Your guide to the world&apos;s most chilling - and unforgettable -
            destinations.
          </p>
          <h3>
            Find your next ghostly destination - if you&apos;re brave enough! 👻
          </h3>
        </div>
      </section>

      <h2 className="map-title">Follow the Ghostly Trail</h2>
      <Map placeData={places} width={100} height={60} />

      <h2 className="place-card-title">Discover Your Next Haunted Adventure</h2>
      {places.length > 0 &&
        places.map((place, i) => {
          return (
            <Link href={`/${place.endpoint}`} key={i} className="place-card">
              <div className="place-image-wrapper">
                {place.image_url ? (
                  <Image
                    src={place.image_url}
                    alt={place.services}
                    width={140}
                    height={180}
                    className="place-image"
                  />
                ) : (
                  <div className="flex items-center justify-center border border-white-300 w-[130px] h-[170px] text-s p-1">
                    <p>Image coming soon!</p>
                  </div>
                )}
              </div>

              <div className="place-info">
                <h3 className="place-info-name">{place.name}</h3>
                <p className="place-info-city">{place.city}</p>
                <p className="place-info-services">{place.services}</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
