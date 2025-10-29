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
      date: new Date(Number(booking.date)).toDateString(),
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
      <div className="flex flex-col items-center p-4 main-content">
        <div className="w-full max-w-2xl">
          <div>
            <h2
              className="text-5xl font-bold mb-6 text-center mt-8 
                   text-(--font-colour)]"
            >
              {displayName}&apos;s Profile
            </h2>
          </div>

          <div className="mb-8 p-4 rounded-lg shadow-xl place-card">
            <h3
              className="text-xl font-semibold mb-2 
                   text-(--secondary-accent-colour)]"
            >
              Contact Information
            </h3>
            {contactInfo ? (
              <div className="space-y-1 text-(--font-colour)]">
                <p>
                  <span className="font-medium text-(--font-colour)]">
                    Phone Number:
                  </span>{" "}
                  {contactInfo.usernumber}
                </p>
                <p>
                  <span className="font-medium text-(--font-colour)]">
                    Optional Email:
                  </span>{" "}
                  {contactInfo.optionalemail}
                </p>
                <p>
                  <span className="font-medium text-(--font-colour)]">
                    Additional Info:
                  </span>{" "}
                  {contactInfo.additionalinfo}
                </p>
              </div>
            ) : (
              <p className="text-(--font-colour)]">
                No contact information available in the database.
              </p>
            )}
          </div>

          <h3
            className="text-xl font-semibold mb-3 
                 text-(--secondary-accent-colour)]"
          >
            Bookings
          </h3>

          <div>
            {bookingInfo.length > 0 ? (
              <ul className="space-y-4">
                {bookingInfo.map((booking, index) => (
                  <li
                    key={index}
                    className="p-4 rounded-lg shadow-lg place-card"
                  >
                    <p
                      className="font-bold text-lg mb-1 
                           text-(--font-colour)] 
                           border-(--secondary-accent-colour)] 
                           pb-2"
                    >
                      {booking.placeName}
                    </p>
                    <div className="space-y-1 text-sm text-(--font-colour)] pt-2">
                      <p>
                        <span className="font-medium text-(--font-colour)]">
                          Place:
                        </span>{" "}
                        {booking.placeName}, {booking.city}
                      </p>
                      <p>
                        <span className="font-medium text-(--font-colour)]">
                          Date:
                        </span>{" "}
                        {booking.date}
                      </p>
                      <p>
                        <span className="font-medium text-(--font-colour)]">
                          Status:
                        </span>{" "}
                        <span
                          className={
                            booking.completed
                              ? "text-green-400"
                              : "text-yellow-400"
                          }
                        >
                          {booking.completed ? "Completed" : "Upcoming"}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium text-(--font-colour)]">
                          Group Size:
                        </span>{" "}
                        {booking.groupSize}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-(--font-colour)]">
                You have no bookings at this time.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
