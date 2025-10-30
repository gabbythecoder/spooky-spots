import { db } from "@/utils/dbConnection";

export default async function BookingForm({ data, user }) {
  async function handleBooking(formData) {
    "use server";

    const formDate = formData.get("date");
    const parsedDate = Date.parse(formDate);

    const formValues = {
      place_id: data.endpoint,
      user_id: user,
      date: parsedDate,
      group_size: 3,
    };

    async function CheckAvailability(parsedDate, endpoint) {
      if (parsedDate > 0) {
        const response = await db.query(
          `SELECT * FROM bookings WHERE place_id = $1 AND date = $2 AND completed = FALSE`,
          [endpoint, parsedDate]
        );
        if (response.rowCount < data.booking_slots) {
          return true;
        } else {
          return false;
        }
      }
    }
    const availability = await CheckAvailability(
      formValues.date,
      formValues.place_id
    );
    if (availability) {
      console.log(formValues);
      db.query(
        `INSERT INTO bookings (place_id, user_id, date, group_size) VALUES ($1, $2, $3, $4)`,
        [
          formValues.place_id,
          formValues.user_id,
          formValues.date,
          formValues.group_size,
        ]
      );
    } else {
      console.log("No availability for this date");
    }
  }

  return (
    <>
      <section>
        <h1>Booking Form</h1>
        <form
          action={handleBooking}
          className="flex gap-10 justify-evenly border border-white"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="date">Choose a date:</label>
              <input type="date" name="date" />
            </div>

            <button
              type="submit"
              className="bg-zinc-500 p-1 border border-1-zinc-200"
            >
              Place Booking
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
