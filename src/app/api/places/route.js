import { db } from "@/utils/dbConnection";

export async function GET() {
  try {
    const query = await db.query(
      `SELECT DISTINCT ON (places.endpoint)
        places.*,
        images.image_url
      FROM places 
      LEFT JOIN images
        ON places.endpoint = images.place_name
      ORDER BY places.endpoint, images.id`
    );

    return new Response(JSON.stringify(query));
  } catch (error) {
    console.error("Error fetching places:", error);
    response.status(500).json({ success: false });
  }
}
