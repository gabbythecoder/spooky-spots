import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function UserProfilePage() {
  const user = await currentUser();

  const clerkId = user.id;
  let profile = [];
  let contactInfo = [];
  let bookingInfo = [];

  try {
    const profileResult = await db.query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [clerkId]
    );
    profile = profileResult.rows[0];

    if (profile) {
      contactInfo = {
        id: profile.id,
        usernumber: profile.user_number,
        optionalemail: profile.optional_email,
        additionalinfo: profile.additional_info,
      };
    }
  } catch (error) {
    if (error.message !== "NEXT_REDIRECT") {
      console.error("Error loading profile or contact info:", error);
    }
  }

  try {
    const bookingResult = await db.query(
      `
      SELECT
        b.id AS booking_id,
        b.date,
        b.completed,
        b.group_size,
        p.name AS place_name,
        p.city
      FROM bookings b
      JOIN places p ON b.place_id = p.endpoint
      WHERE b.user_id = $1 
      ORDER BY b.date DESC
      `,
      [clerkId]
    );

    bookingInfo = bookingResult.rows.map((booking) => ({
      id: booking.booking_id,
      placeName: booking.place_name,
      city: booking.city,
      date: booking.date,
      completed: booking.completed,
      groupSize: booking.group_size,
    }));
  } catch (error) {
    if (error.message !== "NEXT_REDIRECT") {
      console.error("Error loading bookings:", error);
    }
  }

  const displayName = user.username;

  return (
    <>
      <div>
        <h2>{displayName}&apos;s Profile</h2>
      </div>

      <br />

      <div>
        <h3>Contact Information</h3>
        {contactInfo ? (
          <div>
            <p>User Number: {contactInfo.usernumber}</p>
            <p>Optional Email: {contactInfo.optionalemail}</p>
            <p>Additional Info: {contactInfo.additionalinfo}</p>
          </div>
        ) : (
          <p>No contact information available in the database.</p>
        )}
      </div>

      <br />

      <div>
        <h3>Bookings</h3>
        {bookingInfo.length > 0 ? (
          <ul>
            {bookingInfo.map((booking) => (
              <li key={booking.id}>
                <p>
                  Place: {booking.placeName}, {booking.city}
                </p>
                <p>Date & Time: {booking.date}</p>
                <p>Status: {booking.completed ? "Completed" : "Upcoming"}</p>
                <p>Group Size: {booking.groupSize}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no bookings at this time.</p>
        )}
      </div>
    </>
  );
}
