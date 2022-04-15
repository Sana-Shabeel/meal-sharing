import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import Home from "./Home";
import MealsTemplate from "./MealsTemplate";
import PostMeal from "./components/AddMeal/PostMeal";
import AddReservationTemp from "./AddReservationTemp";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/addmeal" element={<PostMeal />} />

        <Route exact path="/meals" element={<MealsTemplate />} />
        <Route path="meals/:mealId" element={<AddReservationTemp />} />
      </Routes>
    </>
  );
}

export default App;
