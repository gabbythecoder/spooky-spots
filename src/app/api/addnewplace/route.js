import { db } from "@/utils/dbConnection";

export async function POST(request) {
  const body = await request.json();
  console.log(body.formValues.endpoint);
  const query = db.query(
    `INSERT INTO places (endpoint, name, owner_username, x, y) VALUES ($1, $2, $3, $4, $5)`,
    [
      body.formValues.endpoint,
      body.formValues.name,
      body.formValues.owner_username,
      body.formValues.x,
      body.formValues.y,
    ]
  );

  return new Response(JSON.stringify(body), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
