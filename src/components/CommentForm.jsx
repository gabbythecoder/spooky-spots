import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

export default function CommentForm({ user, endpoint }) {
  async function handlePostComment(formData) {
    "use server";
    const myParams = endpoint;

    const formValues = {
      place_id: myParams,
      users_id: formData.get("userid"),
      comment: formData.get("comment"),
      rating: formData.get("rating"),
      timestamp: Date.now(),
    };

    db.query(
      `INSERT INTO comments (place_id, users_id, comment, rating, timestamp) VALUES ($1, $2, $3, $4, $5)`,
      [
        formValues.place_id,
        formValues.users_id,
        formValues.comment,
        formValues.rating || null,
        formValues.timestamp,
      ]
    );

    revalidatePath(`/${myParams}`);
  }
  return (
    <>
      {user ? (
        <form action={handlePostComment} className="flex flex-col">
          <textarea
            name="comment"
            id=""
            placeholder="Leave a comment..."
            required
          />
          <label htmlFor="rating">Rating: </label>
          <input
            type="text"
            name="userid"
            value={user.id || null}
            readOnly
            hidden
          />
          <input
            type="number"
            name="rating"
            max={10}
            min={1}
            className="border border-white"
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p>Login to leave a comment</p>
      )}
    </>
  );
}
