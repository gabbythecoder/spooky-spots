"use client";
import { useEffect, useState } from "react";
import style from "./BookingForm.module.css";

export default function BookingFormNew({ data, user }) {
  const [chosenDate, setChosenDate] = useState(0);
  const [bookings, setBookings] = useState({});

  const endpoint = data.endpoint;

  useEffect(() => {
    async function getBookingsData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBookingsForDate/${endpoint}/${chosenDate}`
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

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/confirmbooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formValues }),
    });
  }

  return (
    <div className={`${style.forms}`}>
      <form className={`${style.datePicker}`}>
        <label htmlFor="date">Select Date:</label>
        <input
          className="m-2 border border-(--accent-colour) p-1"
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
        <form action={ConfirmBooking} className={`${style.bookingDetails}`}>
          <div className={`${style.bookingFormGroup}`}>
            <label htmlFor="name">Contact Name:</label>
            <input type="text" name="name" required />
          </div>

          <div className={`${style.bookingFormGroup}`}>
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" required />
          </div>

          <div className={`${style.bookingFormGroup}`}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required />
          </div>

          <div className={`${style.bookingFormGroup}`}>
            <label htmlFor="">Group Size:</label>
            <input type="number" name="groupsize" />
          </div>
          <button type="submit" className="confirmButton w-fit mx-auto">
            Confirm Booking
          </button>
        </form>
      ) : (
        <p className="text-(--accent-colour)">
          No Availability For Selected Date
        </p>
      )}
    </div>
  );
}
