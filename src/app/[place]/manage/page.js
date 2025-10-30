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
    <div
      key={booking.id}
      className="flex flex-col justify-start gap-2 m-4 mx-auto p-4 px-8 w-[600px] max-w-[90%] border-2 border-(--secondary-accent-colour) rounded-xl bg-(--card-colour) shadow-[0_2px_6px_rgba(255,107,53,0.3)] transition-shadow duration-300 ease-in-out"
    >
      <p>Booked by: {booking.name || booking.username}</p>
      <p className="italic text-zinc-400">
        Date: {new Date(Number(booking.date)).toDateString()}
      </p>
      <p>Group Size: {booking.group_size}</p>
      <p>Phone: {booking.phone}</p>
      <p>
        Status:{" "}
        <span>{booking.completed === false ? "Upcoming" : "Completed"}</span>
      </p>

      <div>
        <form action={handleUpdate} className="text-right">
          <input type="hidden" name="bookingId" value={booking.id} />
          {booking.completed === false ? (
            <>
              <input type="hidden" name="status" value="true" />
              <button
                type="submit"
                className="border-2 rounded-[50px] py-[0.4rem] px-4 text-sm cursor-pointer hover:bg-[#2ecc71] hover:border-[#2ecc71] hover:shadow-[0_0_12px_#2ecc71] hover:text-black transition duration-300 ease-in-out"
              >
                Mark As Completed
              </button>
            </>
          ) : (
            <>
              <input type="hidden" name="status" value="false" />
              <button
                type="submit"
                className="border-2 rounded-[50px] py-[0.4rem] px-4 text-sm cursor-pointer hover:bg-[#60a5fa] hover:border-[#60a5fa] hover:shadow-[0_0_12px_#60a5fa] hover:text-black transition duration-300 ease-in-out"
              >
                Mark As Upcoming
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="page-title">Manage: {placeData.name}</h2>
      <h3 className="text-xl font-semibold mt-4">Upcoming Bookings</h3>

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
        <h3 className="text-xl font-semibold">Completed Bookings</h3>
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
