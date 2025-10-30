import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import BookingFormNew from "@/components/BookingFormNew";
import Link from "next/link";
import UserComments from "@/components/UserComments";
import CommentForm from "@/components/CommentForm";
import style from "./placepage.module.css";

export async function generateMetadata({ params }) {
  const myParams = await params;
  return {
    title: `Spooky Spot: ${myParams.place}`,
  };
}

export default async function PlacePage({ params, searchParams }) {
  const queryString = await searchParams;
  const user = await currentUser();

  const myParams = await params;

  const placeResponse = await db.query(
    `SELECT * FROM places LEFT JOIN images ON places.endpoint = images.place_name WHERE endpoint = $1`,
    [myParams.place]
  );
  const placeData = await placeResponse.rows[0];

  if (!placeData) {
    notFound();
  }

  const commentsResponse = await db.query(
    `SELECT id, place_id, rating, users.username, comments.comment, comments.timestamp FROM comments
JOIN places ON comments.place_id = places.endpoint
JOIN users ON comments.users_id = users.clerk_id WHERE comments.place_id = $1 ORDER BY timestamp DESC`,
    [myParams.place]
  );
  const commentsData = commentsResponse.rows;
  console.log(commentsData);

  if (queryString.commentSort === "oldest") {
    commentsData.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  } else if (queryString.commentSort === "newest") {
    commentsData.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  } else if (queryString.commentRating === "high") {
    commentsData.sort((a, b) => b.rating - a.rating);
  } else if (queryString.commentRating === "low") {
    commentsData.sort((a, b) => a.rating - b.rating);
  }

  return (
    <main className="flex flex-col gap-5">
      {placeData ? (
        <div className="flex flex-col mt-5">
          <h1 className="text-3xl text-center">{placeData.name}</h1>
          {placeData.owner_username === user?.username ? (
            <div className="text-center mt-2 flex gap-2 justify-center">
              <Link
                href={`/${myParams.place}/manage`}
                className="text-sm border border-gray-500 px-3 py-1 rounded hover:bg-blue-500 hover:border-blue-500 transition-colors text-white"
              >
                Manage
              </Link>
              <Link
                href={`/${myParams.place}/edit`}
                className="text-sm border border-gray-500 px-3 py-1 rounded hover:bg-blue-500 hover:border-blue-500 transition-colors text-white"
              >
                Edit
              </Link>
            </div>
          ) : null}
        </div>
      ) : (
        <h1>No Place Found</h1>
      )}

      <section className={`${style.first}`}>
        <div className={`${style.ImageContainer}`}>
          {placeData ? (
            <Image
              className={`${style.image}`}
              draggable="false"
              fill
              alt={placeData.services}
              src={placeData.image_url}
            />
          ) : null}
        </div>
        <div className={`${style.services}`}>
          <p className="text-xl text-center text-(--accent-colour)">
            {placeData.services}
          </p>
          <div className={`${style.section}`}>
            <h2>Description:</h2>
            <p className="text-center">{placeData.description}</p>
          </div>
        </div>
      </section>

      <section className={`${style.section}`}>
        <h2>History:</h2>
        {placeData.history ? <p>{placeData.history}</p> : <p>No History Set</p>}
      </section>

      <section className={`${style.BookingSection}`}>
        <h2 className="text-center text-xl py-3">Booking Form</h2>
        {user ? (
          <BookingFormNew user={user.id} data={placeData} />
        ) : (
          <p>Login to book</p>
        )}
      </section>

      <section>
        <CommentForm user={user} endpoint={myParams.place} />
      </section>

      <section className="flex flex-col gap-5 mb-10">
        <UserComments
          commentsData={commentsData}
          user={user}
          endpoint={myParams.place}
        />
      </section>
    </main>
  );
}
