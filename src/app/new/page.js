import "leaflet/dist/leaflet.css";

import NewPlaceHandler from "@/components/PlaceMapHandler";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/dbConnection";

export async function generateMetadata({ params }) {
  const myParams = await params;
  return {
    title: `Add New Spooky Spot`,
  };
}

export default async function NewPlace() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const { rows: loggedInUser } = await db.query(
    `SELECT clerk_id, role_id FROM users WHERE clerk_id = $1`,
    [user?.id]
  );

  if (loggedInUser[0].role_id !== 2) {
    redirect("/");
  }

  return (
    <>
      <NewPlaceHandler />
    </>
  );
}
