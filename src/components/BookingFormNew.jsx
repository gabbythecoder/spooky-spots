"use client";
import { useEffect, useState } from "react";
export default function BookingFormNew({ data, user }) {
  const [chosenDate, setChosenDate] = useState("");
  const [bookings, setBookings] = useState([]);

  function SetDate(formData) {
    console.log("submitted");
    const date = formData.get("date");
    const newDate = Date.parse(date);
    setChosenDate(newDate);
  }

  const endpoint = data.endpoint;

  useEffect(() => {
    async function getBookingsData(endpoint) {
      console.log(`endpoint: ${endpoint}`);
      console.log(`date: ${chosenDate}`);
      const response = await fetch(
        `http://localhost:3000/api/getBookingsForDate/${data.endpoint}/${chosenDate}`
      );
      const myData = await response.json();
      setBookings(myData.rows);
    }
    getBookingsData(endpoint);
  }, [chosenDate]);

  return (
    <>
      <p>{chosenDate}</p>
      <form action={SetDate}>
        <input type="date" name="date" defaultValue={chosenDate} required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
