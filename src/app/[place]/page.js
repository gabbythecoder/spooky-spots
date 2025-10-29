import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import BookingFormNew from "@/components/BookingFormNew";

export default async function PlacePage({ params }) {
  const user = await currentUser();
  //console.log(user);

  const myParams = await params;

  const placeResponse = await db.query(
    `SELECT * FROM places LEFT JOIN images ON places.endpoint = images.place_name WHERE endpoint = $1`,
    [myParams.place]
  );
  const placeData = await placeResponse.rows[0];
  //console.log(placeData);
  if (!placeData) {
    notFound();
  }

  const commentsResponse = await db.query(
    `SELECT * FROM comments
JOIN places ON comments.place_id = places.endpoint WHERE comments.place_id = $1`,
    [myParams.place]
  );
  const commentsData = await commentsResponse.rows;

  async function handlePostComment(formData) {
    "use server";
    console.log(formData);
    const formValues = {
      place_id: myParams.place,
      users_id: user.id,
      comment: formData.get("comment"),
      rating: formData.get("rating"),
    };
    console.log(formValues);
    db.query(
      `INSERT INTO comments (place_id, users_id, comment, rating) VALUES ($1, $2, $3, $4)`,
      [
        formValues.place_id,
        formValues.users_id,
        formValues.comment,
        formValues.rating,
      ]
    );
  }

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
        <div>Services Section</div>
      </section>

      <section className="bg-blue-950">
        <h2>History:</h2>
        {placeData.history ? <p>{placeData.history}</p> : <p>No History Set</p>}
      </section>

      <section className="bg-blue-950">
        {user ? (
          <BookingFormNew user={user.id} data={placeData} />
        ) : (
          <p>Login to book</p>
        )}
      </section>

      <section className="bg-blue-950">
        <h2>Comments:</h2>
        {user ? (
          <form action={handlePostComment}>
            <textarea name="comment" id="" placeholder="Leave a comment..." />
            <label htmlFor="rating">Rating: </label>
            <input
              type="number"
              name="rating"
              max={10}
              min={1}
              className="border border-white"
              required
            />
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
