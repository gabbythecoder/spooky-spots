"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function NewPlace() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/NewPlaceMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <Map width={50} height={50} />
    </>
  );
}
