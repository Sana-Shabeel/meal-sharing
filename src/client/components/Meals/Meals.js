import React, { useState, useEffect } from "react";
import Meal from "./Meal";
import Reservation from "../AddReservations/Reserve";
import { Link } from "react-router-dom";
import "./Meal.css";

function Menu() {
  const [menu, setMenu] = useState({ originalMenu: [], filteredMenu: [] });
  useEffect(() => {
    fetch("/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setMenu({ originalMenu: data, filteredMenu: data });
      });
  }, []);
  return (
    <>
      <h1>All the meals in our database</h1>
      <div className="meals-container menu">
        {menu.filteredMenu.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
      </div>
    </>
  );
}

export default Menu;
