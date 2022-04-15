import React, { useState, useEffect } from "react";
import Meal from "./Meal";
import "./Meal.css";

function Meals() {
  const [menu, setMenu] = useState({ originalMenu: [], filteredMenu: [] });
  useEffect(() => {
    fetch("http://localhost:8000/api/meals?limit=6&stars")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenu({ originalMenu: data, filteredMenu: data });
      });
  }, []);
  return (
    <>
      <h1 className="top-meals-title">Our top rated meals</h1>
      <div className="meals-container">
        {menu.filteredMenu.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
      </div>
    </>
  );
}

export default Meals;
