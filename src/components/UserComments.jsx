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
      <h2 className="text-center text-xl py-3 text-(--accent-colour)">
        User Comments:
      </h2>
      <div className="flex gap-5">
        <Link
          href={`${endpoint}?commentSort=newest`}
          className="hover:text-(--accent-colour)"
        >
          Newest
        </Link>
        <Link
          href={`${endpoint}?commentSort=oldest`}
          className="hover:text-(--accent-colour)"
        >
          Oldest
        </Link>
        <Link
          href={`${endpoint}?commentRating=high`}
          className="hover:text-(--accent-colour)"
        >
          Highest Rated
        </Link>
        <Link
          href={`${endpoint}?commentRating=low`}
          className="hover:text-(--accent-colour)"
        >
          Lowest Rated
        </Link>
      </div>
      {commentsData.length > 0 ? (
        commentsData.map((comment) => {
          return (
            <div
              key={comment.id}
              className="flex items-center bg-(--card-colour) px-3 rounded-lg border border-(--accent-colour)"
            >
              <div className="flex items-center justify-between w-full gap-3 ">
                <div className="w-full p-2 flex flex-col gap-2">
                  <div className="flex gap-5 border-b border-(--accent-colour) justify-between items-center">
                    <p className="pb-2 text-lg">
                      {comment.username.charAt(0).toUpperCase() +
                        comment.username.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p>{`"${comment.comment}"`}</p>
                    <p className="flex gap-5 text-zinc-500 italic text-sm">
                      Posted on:
                      {` ${new Date(Number(comment.timestamp)).toDateString()}`}
                    </p>
                  </div>
                </div>

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
              </div>
            </div>
          );
        })
      ) : (
        <p>No Comments Have Been Posted For This Spooky Spot</p>
      )}
    </>
  );
}
