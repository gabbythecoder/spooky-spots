import { db } from "@/utils/dbConnection";

export async function POST(request) {
  const body = await request.json();
  const query = db.query(
    `INSERT INTO bookings (place_id, user_id, name, phone, email, date, group_size) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      body.formValues.place_id,
      body.formValues.user_id,
      body.formValues.name,
      body.formValues.phone,
      body.formValues.email,
      body.formValues.date,
      body.formValues.groupsize,
    ]
  );

  return new Response(JSON.stringify(query), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
