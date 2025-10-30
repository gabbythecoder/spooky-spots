import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function EditPlace({ params }) {
  const placeParam = (await params).place;
  console.log(placeParam);

  const user = await currentUser();
  if (!user) {
    redirect(`/${placeParam}`);
  }

  const placeData = await db.query(`SELECT * FROM places WHERE endpoint = $1`, [
    placeParam,
  ]);
  if (user.username !== placeData.rows[0].owner_username) {
    redirect(`/${placeParam}`);
  }

  const place = placeData.rows[0];

  //function to edit places information
  async function handlePlaceUpdate(formData) {
    "use server";

    const formValues = {
      name: formData.get("name"),
      address: formData.get("address"),
      city: formData.get("city"),
      services: formData.get("services"),
      description: formData.get("description"),
      history: formData.get("history"),
      booking_slots: formData.get("booking_slots"),
    };

    await db.query(
      `UPDATE places SET name = $1, address = $2, city = $3, services = $4, description = $5, history = $6, booking_slots = $7 WHERE endpoint = $8`,
      [
        formValues.name,
        formValues.address,
        formValues.city,
        formValues.services,
        formValues.description,
        formValues.history,
        formValues.booking_slots,
        placeParam,
      ]
    );
    revalidatePath(`/${placeParam}`);

    redirect(`/${placeParam}`);
  }

  //function to add new image URL
  async function addImageUrl(formData) {
    "use server";

    const formValues = {
      image_url: formData.get("image_url"),
    };

    await db.query(
      `INSERT INTO images (place_name, image_url) VALUES ($1, $2)`,
      [placeParam, formValues.image_url]
    );

    revalidatePath(`/${placeParam}`);

    redirect(`/${placeParam}`);
  }

  return (
    <section>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="page-title mb-4">
          Edit: {place.name}
        </h2>

        <div>
          <form action={handlePlaceUpdate} className="flex flex-col gap-2">
            <label htmlFor="name">Place Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={place.name}
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl bg-(--card-colour)"
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={place.address}
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl bg-(--card-colour)"
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              defaultValue={place.city}
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl bg-(--card-colour)"
            />

            <label htmlFor="services">Services:</label>
            <input
              type="text"
              name="services"
              id="services"
              defaultValue={place.services}
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl bg-(--card-colour)"
            />

            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              rows="4"
              cols="8"
              defaultValue={place.description}
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl resize-none bg-(--card-colour)"
            />

            <label htmlFor="history">History:</label>
            <textarea
              type="text"
              name="history"
              id="history"
              rows="4"
              cols="10"
              defaultValue={place.history}
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl resize-none bg-(--card-colour)"
            />

            <label htmlFor="booking_slots">Booking Slots:</label>
            <input
              type="number"
              name="booking_slots"
              id="booking_slots"
              min="0"
              max="50"
              defaultValue={place.booking_slots}
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl bg-(--card-colour)"
            />

            <div className="flex justify-center items-center gap-2 mt-5">
              <Link
                href={`/${placeParam}`}
                className="py-[0.65rem] px-4 w-[180px] hover:underline"
              >
                Go Back
              </Link>

              <button
                type="submit"
                className="cursor-pointer rounded-[50px] border-2 border-(--secondary-accent-colour) py-[0.65rem] px-4 w-[180px] hover:bg-(--hover-colour) hover:border-(--hover-colour) hover:text-black bg-(--card-colour)"
              >
                Confirm Changes
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 mb-8">
          <form action={addImageUrl} className="flex flex-col gap-2">
            <label htmlFor="image_url">Add New Image:</label>
            <input
              type="text"
              name="image_url"
              id="image_url"
              placeholder="Add your image URL here"
              className="border-2 border-(--secondary-accent-colour) p-[0.6rem] rounded-xl bg-(--card-colour)"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-[50px] border-2 border-(--secondary-accent-colour) py-[0.65rem] px-4 w-[180px] m-auto mt-5 hover:bg-(--hover-colour) hover:border-(--hover-colour) hover:text-black bg-(--card-colour)"
            >
              Add Image
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
