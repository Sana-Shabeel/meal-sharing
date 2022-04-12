import React from "react";
import Navbar from "./components/Navbar/Navbar";
import HeroImage from "./components/HeroImage";
import About from "./components/About/About";
import "./Home.css";
function Home() {
  return (
    <div>
      <Navbar />
      <HeroImage />
      <About />
    </div>
  );
}

export default Home;
