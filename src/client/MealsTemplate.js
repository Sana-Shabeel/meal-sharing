import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Meals from "./components/Meals/Meals";

function MealsTemplate() {
  return (
    <div>
      <Navbar />
      <Meals />
      <Footer />
    </div>
  );
}

export default MealsTemplate;
