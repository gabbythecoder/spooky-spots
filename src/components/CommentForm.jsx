import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import style from "./CommentForm.module.css";

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
      `INSERT INTO comments (place_id, users_id, comment, timestamp) VALUES ($1, $2, $3, $4)`,
      [
        formValues.place_id,
        formValues.users_id,
        formValues.comment,
        formValues.timestamp,
      ]
    );

    revalidatePath(`/${myParams}`);
  }
  return (
    <>
      {user ? (
        <form action={handlePostComment} className={`${style.form}`}>
          <div className={`${style.formGroup}`}>
            <label htmlFor="comment" className="text-xl">
              Comment
            </label>
            <textarea
              name="comment"
              id=""
              placeholder="Enter your comment here"
              required
            />
          </div>
          <div className={`${style.formGroup}`}>
            <input
              type="text"
              name="userid"
              value={user.id || null}
              readOnly
              hidden
            />
          </div>
          <button type="submit" className="confirmButton w-fit mx-auto">
            Post Comment
          </button>
        </form>
      ) : (
        <p>Login to leave a comment</p>
      )}
    </>
  );
}
