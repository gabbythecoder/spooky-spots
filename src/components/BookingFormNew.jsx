"use client";
import { useEffect, useState } from "react";
export default function BookingFormNew({ data, user }) {
  const [chosenDate, setChosenDate] = useState(0);
  const [bookings, setBookings] = useState({});

  const endpoint = data.endpoint;

  useEffect(() => {
    async function getBookingsData() {
      // console.log(`endpoint: ${endpoint}`);
      // console.log(`date: ${chosenDate}`);
      const response = await fetch(
        `http://localhost:3000/api/getBookingsForDate/${endpoint}/${chosenDate}`
      );
      const myData = await response.json();
      setBookings(myData);
    }
    getBookingsData();
  }, [chosenDate]);

  function ConfirmBooking(formData) {
    const formValues = {
      place_id: endpoint,
      user_id: user,
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date: chosenDate,
      groupsize: formData.get("groupsize"),
    };

    fetch("http://localhost:3000/api/confirmbooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formValues }),
    });

    console.log(formValues);
  }

  return (
    <div className="flex justify-evenly">
      <form className="flex flex-col border border-white">
        <label htmlFor="date">Select Date:</label>
        <input
          className="m-2 border border-white"
          type="date"
          name="date"
          defaultValue={chosenDate}
          onChange={(e) => {
            setChosenDate(Date.parse(e.target.value));
          }}
          required
        />
      </form>
      {bookings.rowCount < data.booking_slots && chosenDate > 0 ? (
        <form
          action={ConfirmBooking}
          className="flex flex-col border border-white"
        >
          <div>
            <label htmlFor="name">Contact Name:</label>
            <input
              type="text"
              name="name"
              className="border border-white m-2"
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="border border-white m-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="border border-white m-2"
              required
            />
          </div>

          <div>
            <label htmlFor="">Group Size:</label>
            <input
              type="number"
              name="groupsize"
              className="border border-white m-2"
            />
          </div>
          <button type="submit">Confirm Booking</button>
        </form>
      ) : (
        <p>No Availability For Selected Date</p>
      )}
    </div>
  );
}
