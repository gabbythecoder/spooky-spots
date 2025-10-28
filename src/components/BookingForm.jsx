"use client";
import { useState } from "react";

export default function BookingForm({ slots }) {
  const [groupSize, setGroupSize] = useState(0);
  const [date, setDate] = useState(null);

  function handleBooking(formData) {
    const formDate = formData.get("date");
    //console.log(Date.parse(formDate));
    const formValues = {
      date: formData.get("date"),
      groupsize: formData.get("groupsize"),
    };
    console.log(formValues);
  }

  return (
    <>
      <section>
        <h1>Booking Form</h1>
        <form action={handleBooking} className="flex">
          <div>
            <label htmlFor="date">Pick a date:</label>
            <input
              type="date"
              name="date"
              defaultValue={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                setGroupSize(groupSize - 1);
              }}
            >
              -
            </button>

            <input
              type="text"
              name="groupsize"
              onChange={(e) => {
                setGroupSize(e.target.value);
              }}
              value={groupSize}
            />

            <button
              onClick={() => {
                setGroupSize(groupSize + 1);
              }}
            >
              +
            </button>
          </div>
          <button
            type="submit"
            className="bg-zinc-500 p-1 border border-1-zinc-200"
          >
            Confirm Booking
          </button>
        </form>
      </section>
    </>
  );
}
