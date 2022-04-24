import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

function Rating(props) {
  const starArr = [];
  for (let i = 0; i < props.stars; i++) {
    starArr.push(<AiFillStar className="star" />);
  }
  return (
    <div className="meal-rating">
      Rating:<div>{starArr}</div>
    </div>
  );
}

export default Rating;
