import React, { useState } from "react";
import "./Reservation.css";
function Reservation({ getData }) {
  const [inputValue, setInputValue] = useState({
    number_of_guests: "",
    contact_phonenumber: "",
    contact_name: "",
    contact_email: "",
  });
  const changeHandler = (e) => {
    const value = e.target.value;
    setInputValue({
      ...inputValue,
      [e.target.name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(inputValue);
    getData(inputValue);
    setInputValue("");
  };
  return (
    <>
      <h1>Add Reservation</h1>
      <form>
        <label>
          Full Name
          <input
            type="text"
            name="contact_name"
            onChange={changeHandler}
            placeholder="Enter your fullname..."
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            name="contact_email"
            onChange={changeHandler}
            placeholder="email@email.com"
          />
        </label>

        <label>
          Phone
          <input
            type="number"
            name="contact_phonenumber"
            onChange={changeHandler}
            placeholder="Phone Number..."
          />
        </label>

        <label>
          Number of Guests
          <input
            type="number"
            name="number_of_guests"
            onChange={changeHandler}
            placeholder="Number of guests..."
          />
        </label>

        <div className="submit-form">
          <button type="submit" className="btn " onClick={submitHandler}>
            Add Reservation
          </button>
        </div>
      </form>
    </>
  );
}

export default Reservation;
