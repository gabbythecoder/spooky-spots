import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";

export default async function UserProfilePage() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

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
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-2xl">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              {displayName}&apos;s Profile
            </h2>
          </div>

          <div className="mb-8 p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-xl">
            <h3 className="text-xl font-semibold mb-2 text-white-400">
              Contact Information
            </h3>
            {contactInfo ? (
              <div className="space-y-1 text-white-300">
                <p>
                  <span className="font-medium text-white">Phone Number:</span>{" "}
                  {contactInfo.usernumber}
                </p>
                <p>
                  <span className="font-medium text-white">
                    Optional Email:
                  </span>{" "}
                  {contactInfo.optionalemail}
                </p>
                <p>
                  <span className="font-medium text-white">
                    Additional Info:
                  </span>{" "}
                  {contactInfo.additionalinfo}
                </p>
              </div>
            ) : (
              <p>No contact information available in the database.</p>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-3 text-white-400">
            Bookings
          </h3>
          <div>
            {bookingInfo.length > 0 ? (
              <ul className="space-y-4">
                {bookingInfo.map((booking, index) => (
                  <li
                    key={index}
                    className="p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-lg text-white-300"
                  >
                    <p className="font-bold text-lg mb-1 text-white border-b border-gray-700 pb-2">
                      {booking.placeName}
                    </p>
                    <div className="space-y-1 text-sm pt-2">
                      <p>
                        <span className="font-medium text-white">Place:</span>{" "}
                        {booking.placeName}, {booking.city}
                      </p>
                      <p>
                        <span className="font-medium text-white">Date:</span>{" "}
                        {booking.date}
                      </p>
                      <p>
                        <span className="font-medium text-white">Status:</span>{" "}
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
                        <span className="font-medium text-white">
                          Group Size:
                        </span>{" "}
                        {booking.groupSize}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have no bookings at this time.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
