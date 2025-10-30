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

    redirect("/");
  }

  return (
    <div>
      <form action={handleSubmit} class="max-w-xl mx-auto my-8 p-6">
        <input type="hidden" name="clerkId" value={user.id} />
        <fieldset class="border border-(--secondary-accent-colour) p-4 rounded-lg space-y-4">
          <legend class="text-3xl font-semibold px-2">Contact Info</legend>

          <div>
            <label
              htmlFor="optionalemail"
              class="block font-medium mb-1 text-xl"
            >
              Optional email:
            </label>
            <input
              type="text"
              name="optionalemail"
              class="w-full p-2 rounded-md border border-(--secondary-accent-colour)"
            />
          </div>

          <div>
            <label htmlFor="usernumber" class="block text-xl font-medium mb-1">
              Number:
            </label>
            <input
              type="text"
              name="usernumber"
              class="w-full p-2 rounded-md border border-(--secondary-accent-colour)"
            />
          </div>

          <div>
            <label
              htmlFor="additionalinfo"
              class="block text-xl font-medium mb-1"
            >
              Additional information:
            </label>
            <textarea
              name="additionalinfo"
              rows="4"
              class="w-full p-2 rounded-md border border-(--secondary-accent-colour)"
            ></textarea>
          </div>
          <button
            type="submit"
            class="mt-6 w-full confirmButton text-lg transition-all"
          >
            Create
          </button>
        </fieldset>
      </form>
    </div>
  );
}
