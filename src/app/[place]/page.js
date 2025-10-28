import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";

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

  return (
    <main className="flex flex-col gap-5">
      {placeData ? (
        <h1 className="text-3xl text-center">{placeData.name}</h1>
      ) : (
        <h1>No Place Found</h1>
      )}

      <section className="flex gap-5 bg-blue-950">
        <div>
          {placeData ? (
            <Image
              width={100}
              height={100}
              alt={placeData.services}
              src={placeData.image_url}
            />
          ) : null}
        </div>
        <div>Slug Section</div>
      </section>

      <section className="bg-blue-950">
        <h2>History:</h2>
        {placeData.history ? <p>{placeData.history}</p> : <p>No History Set</p>}
      </section>

      <section className="bg-blue-950">
        {user ? (
          <BookingForm user={user.id} data={placeData} />
        ) : (
          <p>Login to book</p>
        )}
      </section>

      <section className="bg-blue-950">
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
    </main>
  );
}
