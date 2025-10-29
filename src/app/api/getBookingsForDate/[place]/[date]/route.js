import { db } from "@/utils/dbConnection";

export async function GET(request, params) {
  const myParams = await params;
  const placeParam = await myParams.params.place;
  const dateParam = await myParams.params.date;

  try {
    const query = await db.query(
      `SELECT * FROM bookings WHERE place_id = $1 AND date = $2`,
      [placeParam, dateParam]
    );
    console.log(query.rows);

    return new Response(JSON.stringify(query));
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}
