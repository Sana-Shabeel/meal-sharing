import React from "react";
import HeroImage from "./components/HeroImage";
import About from "./components/About/About";
import Meals from "./components/Meals/TopMeals";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./Home.css";
function Home() {
  return (
    <div>
      <Navbar />
      <HeroImage />
      <About />
      <Meals />
      <Footer />
    </div>
  );
}

export default Home;
