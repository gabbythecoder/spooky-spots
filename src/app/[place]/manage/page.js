import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ManagePlace({ params }) {
  const placeParam = (await params).place;
  console.log(placeParam);

  const user = await currentUser();
  if (!user) {
    redirect(`/${placeParam}`);
  }

  const placeData = await db.query(`SELECT * FROM places WHERE endpoint = $1`, [
    placeParam,
  ]);

  if (user.username !== placeData.rows[0].owner_username) {
    redirect(`/${placeParam}`);
  }

  return (
    <div>
      <p>Manage Place Page</p>
    </div>
  );
}
