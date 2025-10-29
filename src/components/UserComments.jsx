import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

export default function UserComments({ commentsData, user, endpoint }) {
  async function DeleteComment(formData) {
    "use server";
    db.query(`DELETE FROM comments WHERE id = $1`, [formData.get("commentid")]);
    revalidatePath(`/${endpoint}`);
  }
  return (
    <>
      <h2>User Comments:</h2>
      {commentsData.length > 0 ? (
        commentsData.map((comment) => {
          return (
            <div key={comment.id} className="bg-blue-950">
              {user.username === comment.username ? (
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
