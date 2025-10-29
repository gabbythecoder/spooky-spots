"use client";
import { useEffect, useState } from "react";
export default function BookingFormNew({ data, user }) {
  const [chosenDate, setChosenDate] = useState(0);
  const [bookings, setBookings] = useState({});

  // function SetDate(formData) {
  //   console.log("submitted");
  //   const date = formData.get("date");
  //   const newDate = Date.parse(date);
  //   setChosenDate(newDate);
  // }

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
        <form className="flex flex-col border border-white">
          <label htmlFor="">Group Size:</label>
          <input type="number" className="border border-white m-2" />
          <button type="submit">Confirm Booking</button>
        </form>
      ) : (
        <p>No Availability For Selected Date</p>
      )}
    </div>
  );
}
