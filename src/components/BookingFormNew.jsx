"use client";
import { useEffect, useState } from "react";
export default function BookingFormNew({ data, user }) {
  const [chosenDate, setChosenDate] = useState("");
  const [bookings, setBookings] = useState([]);

  function SetDate(formData) {
    console.log("submitted");
    const date = formData.get("date");
    const newDate = new Date(date).toLocaleDateString();
    setChosenDate(newDate);
  }
  useEffect(() => {
    async function getBookingsData() {
      const response = await fetch(
        `http://localhost:3000/api/getBookingsForDate/${data.endpoint}/${chosenDate}}`
      );
      const data = await response.json();
      console.log(data.rows);
      setBookings(data.rows);
    }
    getBookingsData();
  }, [chosenDate]);

  return (
    <>
      {bookings.map((i) => {
        console.log(i);
      })}
      <p>{chosenDate}</p>
      <form action={SetDate}>
        <input type="date" name="date" defaultValue={chosenDate} required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
