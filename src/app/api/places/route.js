import { db } from "@/utils/dbConnection";

export async function GET() {
  const query = await db.query(
    `SELECT * FROM places LEFT JOIN images ON places.endpoint = images.place_name`
  );
  // console.log(query);

  return new Response(JSON.stringify(query));
}
