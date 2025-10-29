import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function ManagePlace({ params }) {
  const placeParam = (await params).place;
  console.log(placeParam);

  const user = await currentUser();
  if (!user) {
    redirect(`/${placeParam}`);
  }

  const placeDataResponse = await db.query(
    `SELECT * FROM places WHERE endpoint = $1`,
    [placeParam]
  );

  const placeData = placeDataResponse.rows[0];

  if (user.username !== placeData.owner_username) {
    redirect(`/${placeParam}`);
  }

  const bookingsResponse = await db.query(
    `SELECT
      bookings.id,
      bookings.date,
      bookings.completed,
      bookings.group_size,
      bookings.name,
      bookings.phone,
      users.username
    FROM bookings
    JOIN users ON bookings.user_id = users.clerk_id
    WHERE bookings.place_id = $1
    ORDER BY bookings.id DESC`,
    [placeParam]
  );
  const allBookings = bookingsResponse.rows;

  const upcomingBookings = allBookings.filter(
    (booking) => booking.completed === false
  );
  const completedBookings = allBookings.filter(
    (booking) => booking.completed === true
  );

  async function handleUpdateBookingStatus(formData) {
    "use server";
    const bookingId = formData.get("bookingId");
    const newStatus = formData.get("status") === "true";

    await db.query(`UPDATE bookings SET completed = $1 WHERE id = $2`, [
      newStatus,
      bookingId,
    ]);

    revalidatePath(`/${placeParam}/manage`);
  }

  const BookingItem = ({ booking, handleUpdate }) => (
    <div key={booking.id}>
      <p>Booked by: {booking.name || booking.username}</p>
      <p>Date: {new Date(Number(booking.date)).toDateString()}</p>
      <p>Group Size: {booking.group_size}</p>
      <p>Phone: {booking.phone}</p>
      <p>
        Status:{" "}
        <span>{booking.completed === false ? "Upcoming" : "Completed"}</span>
      </p>

      <div>
        <form action={handleUpdate}>
          <input type="hidden" name="bookingId" value={booking.id} />
          {booking.completed === false ? (
            <>
              <input type="hidden" name="status" value="true" />
              <button type="submit">Completed</button>
            </>
          ) : (
            <>
              <input type="hidden" name="status" value="false" />
              <button type="submit">Upcoming</button>
            </>
          )}
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <h2>Manage: {placeData.name}</h2>
      <h3>Upcoming Bookings for {placeData.name}</h3>

      <br />
      <hr />
      <br />

      <section>
        {upcomingBookings.length > 0 ? (
          <div>
            {upcomingBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                handleUpdate={handleUpdateBookingStatus}
              />
            ))}
          </div>
        ) : (
          <p>No upcoming bookings at the moment.</p>
        )}
      </section>

      <br />
      <hr />
      <br />

      <section>
        <h3>Completed Bookings</h3>
        {completedBookings.length > 0 ? (
          <div>
            {completedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                handleUpdate={handleUpdateBookingStatus}
              />
            ))}
          </div>
        ) : (
          <p>No bookings have been completed yet.</p>
        )}
      </section>
    </div>
  );
}
