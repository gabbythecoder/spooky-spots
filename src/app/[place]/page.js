import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function PlacePage({ params }) {
  const user = await currentUser();
  console.log(user);
  const myParams = await params;

  const placeResponse = await db.query(
    `SELECT * FROM places LEFT JOIN images ON places.endpoint = images.place_name WHERE endpoint = $1`,
    [myParams.place]
  );
  const placeData = await placeResponse.rows[0];
  console.log(placeData);
  if (!placeData) {
    notFound();
  }

  const commentsResponse = await db.query(
    `SELECT * FROM comments
JOIN places ON comments.place_id = places.endpoint WHERE comments.place_id = $1`,
    [myParams.place]
  );
  const commentsData = await commentsResponse.rows;

  async function handleBooking(formData) {
    "use server";
    console.log(formData);
  }

  return (
    <>
      {placeData ? <h1>{placeData.name}</h1> : <h1>No Place Found</h1>}

      <section className="flex gap-5">
        <div>
          {placeData ? (
            <Image
              width={100}
              height={100}
              alt={"test"}
              src={placeData.image_url}
            />
          ) : null}
        </div>
        <div>Slug Section</div>
      </section>

      <section>
        <h2>History:</h2>
        {placeData.history ? <p>{placeData.history}</p> : <p>No History Set</p>}
      </section>

      <section>
        <h1>
          Booking Form Section
          <form action={handleBooking}>
            <button
              type="submit"
              className="bg-zinc-500 p-1 border border-1-zinc-200"
            >
              Confirm Booking
            </button>
          </form>
        </h1>
      </section>

      <section>
        <h2>Comments:</h2>
        {user ? (
          <form>
            <textarea name="comment" id="" placeholder="Leave a comment..." />
            <button type="submit">Post Comment</button>
          </form>
        ) : (
          <p>Login to leave a comment</p>
        )}
        {commentsData.length > 0 ? (
          commentsData.map((comment) => {
            return <p key={comment.id}>{comment.comment}</p>;
          })
        ) : (
          <p>No Comments</p>
        )}
      </section>
    </>
  );
}
