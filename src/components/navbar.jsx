import { NavLink } from "react-router-dom";
import "./navbar.css";

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
      <NavLink
        to="/technology"
        className="nav-link"
      >
        Technology
      </NavLink>
    </nav>
  );
};

export default Navbar;