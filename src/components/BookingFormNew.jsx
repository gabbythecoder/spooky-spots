"use client";
import { useEffect, useState } from "react";
export default function BookingFormNew({ data, user }) {
  const [chosenDate, setChosenDate] = useState(0);
  const [bookings, setBookings] = useState({});

  function SetDate(formData) {
    console.log("submitted");
    const date = formData.get("date");
    const newDate = Date.parse(date);
    setChosenDate(newDate);
  }

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

  return (
    <>
      {bookings.rowCount < data.booking_slots ? (
        <p>Slots Available</p>
      ) : (
        <p>Fully Booked</p>
      )}
      <form action={SetDate}>
        <input
          type="date"
          name="date"
          defaultValue={chosenDate}
          onChange={(e) => {
            setChosenDate(Date.parse(e.target.value));
          }}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
