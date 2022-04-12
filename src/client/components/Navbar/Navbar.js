import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import "./Navbar.css";
function Navbar() {
  const [menu, setMenu] = useState("hidden");
  const showMenuHandler = () => {
    setMenu((prev) => (prev === "hidden" ? "" : "hidden"));
  };
  return (
    <nav>
      <div className="navlogo">
        <h2>MEAL SHARE</h2>
        <BiMenuAltLeft className="burger" onClick={showMenuHandler} />
      </div>
      <ul className={`navlist ${menu}`}>
        <li>Home</li>
        <li>Menu</li>
        <li>About</li>
      </ul>
    </nav>
  );
}

export default Navbar;
