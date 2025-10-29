import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import BookingFormNew from "@/components/BookingFormNew";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function PlacePage({ params }) {
  const user = await currentUser();

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
    `SELECT id, place_id, rating, users.username, comments.comment FROM comments
JOIN places ON comments.place_id = places.endpoint
JOIN users ON comments.users_id = users.clerk_id WHERE comments.place_id = $1`,
    [myParams.place]
  );
  const commentsData = await commentsResponse.rows;

  async function handlePostComment(formData) {
    "use server";
    if (!user) {
      return;
    }
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

    revalidatePath(`/${myParams.place}`);
  }

  return (
    <main className="flex flex-col gap-5">
      {placeData ? (
        <div className="flex flex-col">
          <h1 className="text-3xl text-center">{placeData.name}</h1>
          {placeData.owner_username === user?.username ? (
            <div className="text-center">
              <Link
                href={`/${myParams.place}/manage`}
                className="border border-white p-1 bg-red-900"
              >
                Manage
              </Link>{" "}
              <Link
                href={`/${myParams.place}/edit`}
                className="border border-white p-1 bg-red-900"
              >
                Edit
              </Link>
            </div>
          ) : null}
        </div>
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
        <h2>Leave a comment:</h2>
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
      </section>

      <section className="flex flex-col gap-5">
        <h2>User Comments:</h2>
        {commentsData.length > 0 ? (
          commentsData.map((comment) => {
            return (
              <div key={comment.id} className="bg-blue-950">
                <p>comment by: {comment.username}</p>
                <p>comment: {comment.comment}</p>
                <p>rating: {comment.rating}</p>
              </div>
            );
          })
        ) : (
          <p>No Comments</p>
        )}
      </section>
    </main>
  );
}
