import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function UserComments({ commentsData, user, endpoint }) {
  async function DeleteComment(formData) {
    "use server";
    db.query(`DELETE FROM comments WHERE id = $1`, [formData.get("commentid")]);
    revalidatePath(`/${endpoint}`);
  }
  return (
    <>
      <div className="flex gap-5">
        <Link
          href={`${endpoint}?commentSort=newest`}
          className="hover:underline"
        >
          Newest
        </Link>
        <Link
          href={`${endpoint}?commentSort=oldest`}
          className="hover:underline"
        >
          Oldest
        </Link>
        <Link
          href={`${endpoint}?commentRating=high`}
          className="hover:underline"
        >
          Highest Rated
        </Link>
        <Link
          href={`${endpoint}?commentRating=low`}
          className="hover:underline"
        >
          Lowest Rated
        </Link>
      </div>
      <h2>User Comments:</h2>
      {commentsData.length > 0 ? (
        commentsData.map((comment) => {
          return (
            <div key={comment.id} className="">
              {user?.username === comment.username ? (
                <form action={DeleteComment}>
                  <input
                    type="text"
                    name="commentid"
                    value={comment.id}
                    readOnly
                    hidden
                  />
                  <button
                    type="submit"
                    className="text-sm border border-gray-500 px-3 py-1 rounded hover:bg-red-600 hover:border-red-600 transition-colors text-white"
                  >
                    Delete
                  </button>
                </form>
              ) : null}

              <p>comment by: {comment.username}</p>
              <p>comment: {comment.comment}</p>
              <p>rating: {comment.rating}</p>
              <p>
                timestamp:
                {` ${new Date(Number(comment.timestamp)).toDateString()}`}
              </p>
            </div>
          );
        })
      ) : (
        <p>No Comments</p>
      )}
    </>
  );
}
