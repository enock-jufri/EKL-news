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
        to="/politics"
        className="nav-link"
      >
        Politics
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