import React, { useState } from "react";
import Modal from "../Modal/Modal";
import AddMeal from "./AddMeal";
import Navbar from "../Navbar/Navbar";
export default function PostMeal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    style: "",
    title: "",
    message: "",
  });

  const postData = (meal) => {
    console.log(meal);
    fetch("api/meals", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(meal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setIsOpen(true);
          setModalMessage({
            title: "Post sent 👍",
            message: `Meal succesfully created`,
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
      <Navbar />
      <AddMeal postMeal={postData} />
      {isOpen && <Modal setIsOpen={setIsOpen} modalMessage={modalMessage} />}
    </div>
  );
}
