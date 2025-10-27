"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function HomePage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  // const placeQuery = db.query(
  //   `SELECT endpoint, `
  // )

  return (
    <div>
      <h1>Welcome to Spooky Spots!</h1>

      <Map width={50} height={50} />

      <h2>Browse our lists of Spooky Spots</h2>

    </div>
  );
}
