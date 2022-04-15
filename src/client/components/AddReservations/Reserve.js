import React, { useState, useEffect } from "react";
import Reservation from "./AddReservation";
import Modal from "../Modal/Modal";
import { useParams } from "react-router-dom";

function SendReservation() {
  const params = useParams();
  console.log(params);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    style: "",
    title: "",
    message: "",
  });

  const getDataHandler = (inputValues) => {
    postData({
      meal_id: params.mealId,
      number_of_guests: Number(inputValues.number_of_guests),
      contact_phonenumber: Number(inputValues.contact_phonenumber),
      contact_name: inputValues.contact_name,
      contact_email: inputValues.contact_email,
    });
  };

  const postData = (reservation) => {
    console.log(reservation);
    fetch("http://localhost:8000/api/reservations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reservation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setIsOpen(true);
          setModalMessage({
            title: "Post sent 👍",
            message: `Reservation made for ${reservation.contact_name}`,
            style: "blue",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          setIsOpen(true);
          setModalMessage({
            title: "FAILED",
            message: `Could not send to database. Please make sure all the required fields are filled`,
            style: "red",
          });
        }
      });
  };

  return (
    <div>
      <Reservation getData={getDataHandler} />
      {isOpen && <Modal setIsOpen={setIsOpen} modalMessage={modalMessage} />}
    </div>
  );
}

export default SendReservation;
