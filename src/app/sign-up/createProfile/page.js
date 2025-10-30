import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";

export default async function createProfilePage() {
  const user = await currentUser();

  const user_email = user.emailAddresses[0].emailAddress;

  const existingUser = await db.query(
    `SELECT * FROM users WHERE clerk_id = $1`,
    [user.id]
  );

  if (existingUser.rows.length > 0) {
    redirect("/");
  }

  async function handleSubmit(formData) {
    "use server";

    const formValues = {
      usernumber: formData.get("usernumber"),
      optionalemail: formData.get("optionalemail"),
      additionalinfo: formData.get("additionalinfo"),
    };

    await db.query(
      `INSERT INTO users (clerk_id, username, user_email, optional_email, user_number, additional_info) VALUES($1, $2, $3, $4, $5, $6)`,
      [
        user.id,
        user.username,
        user_email,
        formValues.optionalemail,
        formValues.usernumber,
        formValues.additionalinfo,
      ]
    );

    redirect("/user");
  }

  return (
    <div>
      <div>
        <form action={handleSubmit}>
          <input type="hidden" name="clerkId" value={user.id} />
          <fieldset>
            <legend>Contact Info</legend>
            <label htmlFor="optionalemail">Optional email: </label>
            <input type="text" name="optionalemail" />
            <label htmlFor="usernumber">Number: </label>
            <input type="text" name="usernumber" />
            <label htmlFor="additionalinfo">Additional information: </label>
            <textarea type="text" name="additionalinfo" />
          </fieldset>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
