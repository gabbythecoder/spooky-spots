"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function MyPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div>
      <Map />
    </div>
  );
}
