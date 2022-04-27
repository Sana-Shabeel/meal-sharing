import React, { useState } from "react";
import "./AddMeal.css";
function AddMeal({ postMeal }) {
  const [mealData, setMealData] = useState();

  const changeHandler = (e) => {
    const value = e.target.value;
    setMealData({
      ...mealData,
      [e.target.name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    postMeal(mealData);
    console.log(mealData);
  };
  return (
    <>
      <h1>Add a meal from your area</h1>
      <form>
        <label>
          Add meal title:
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="Add meal title..."
          />
        </label>
        <label>
          Origin of the meal:
          <input
            type="text"
            name="location"
            onChange={changeHandler}
            placeholder="Origin of the meal..."
          />
        </label>
        <label className="flex-column">
          Add meal description:
          <textarea
            name="title"
            rows="3"
            cols="100"
            name="description"
            onChange={changeHandler}
            placeholder="Add meal description"
          ></textarea>
        </label>

        <div className="flex-container">
          <label className="flex">
            Amount of serving:
            <input
              type="number"
              onChange={changeHandler}
              name="max_reservation"
            />
          </label>
          <label className="flex">
            Price:
            <input type="number" onChange={changeHandler} name="price" />
          </label>
        </div>
        <div className="submit-form">
          <button type="submit" className="btn " onClick={submitHandler}>
            Add Meal
          </button>
        </div>
      </form>
    </>
  );
}

export default AddMeal;
