"use client";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function NewPlaceHandler() {
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
      <Map width={80} height={50} />
    </>
  );
}
