import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
  // console.log(placeData);

  const place = placeData.rows[0];
  // console.log(place);

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
    };

    await db.query(
      `UPDATE places SET name = $1, address = $2, city = $3, services = $4, description = $5, history = $6 WHERE endpoint = $7`,
      [
        formValues.name,
        formValues.address,
        formValues.city,
        formValues.services,
        formValues.description,
        formValues.history,
        placeParam,
      ]
    );
    revalidatePath(`/${placeParam}`);

    redirect(`${placeParam}`);
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
  }

  return (
    <section>
      <div>
        <h2>Edit Page</h2>

        <div>
          <form action={handlePlaceUpdate} className="flex flex-col gap-2">
            <label htmlFor="name">Place Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={place.name}
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={place.address}
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              defaultValue={place.city}
            />

            <label htmlFor="services">Services:</label>
            <input
              type="text"
              name="services"
              id="services"
              defaultValue={place.services}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              rows="3"
              cols="8"
              defaultValue={place.description}
            />

            <label htmlFor="history">History:</label>
            <textarea
              type="text"
              name="history"
              id="history"
              rows="4"
              cols="10"
              defaultValue={place.history}
            />

            <button type="submit">Confirm Changes</button>
          </form>
        </div>

        <div>
          <form action={addImageUrl}>
            <label htmlFor="image_url">Add New Image:</label>
            <input
              type="text"
              name="image_url"
              id="image_url"
              placeholder="Add your image URL here"
            />
            <button type="submit">Add Image</button>
          </form>
        </div>
      </div>
    </section>
  );
}
