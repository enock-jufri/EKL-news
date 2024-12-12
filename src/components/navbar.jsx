import { NavLink } from "react-router-dom";
import "./navbar.css";
import Search from "./search";

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className="nav-link"
      >
        Trending
      </NavLink>
      <NavLink
        to="/science"
        className="nav-link"
      >
        Science
      </NavLink>
      <NavLink
        to="/health"
        className="nav-link"
      >
        Health
      </NavLink>
      <NavLink
        to="/sports"
        className="nav-link"
      >
        Sports
      </NavLink>
    </nav>
  );
};

export default Navbar;