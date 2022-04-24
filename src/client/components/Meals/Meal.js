import React from "react";
import Rating from "./Rating";
import "./Meal.css";
import { Link } from "react-router-dom";
import Reserve from "../AddReservations/Reserve";
function Meal(props) {
  return (
    <section className="meal-container">
      <h2 className="meal-city">{props.meal.location}</h2>
      <Link to={`/meals/${props.meal.id}`} element={<Reserve />}>
        <div>
          <h3 className="meal-title">{props.meal.title}</h3>
          <p className="meal-description">{props.meal.description}</p>
          <div className="meal-footer">
            <Rating key={props.meal.id} stars={props.meal.stars} />
            <div>
              Price: <strong>DKK {props.meal.price}</strong>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default Meal;
