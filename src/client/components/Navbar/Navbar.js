import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const [menu, setMenu] = useState("hidden");
  const showMenuHandler = () => {
    setMenu((prev) => (prev === "hidden" ? "" : "hidden"));
  };
  return (
    <nav>
      <div className="navlogo">
        <Link to="/">
          <h2>MEAL SHARE</h2>
        </Link>
        <BiMenuAltLeft className="burger" onClick={showMenuHandler} />
      </div>
      <ul className={`navlist ${menu}`}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/meals">Menu</Link>
        </li>

        <Link to="/addmeal">
          <li>Add meal</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
