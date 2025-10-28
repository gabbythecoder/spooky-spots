import { db } from "@/utils/dbConnection";

export async function GET(request, params) {
  const myParams = await params;
  const placeParam = myParams.params.place;
  const dateParam = myParams.params.date;
  try {
    const query = await db.query(
      `SELECT * FROM bookings WHERE place_id = $1 AND date = `,
      [placeParam, dateParam]
    );
    console.log(placeParam);
    console.log(query.rows);

    return new Response(JSON.stringify(query));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    response.status(500).json({ success: false });
  }
}
