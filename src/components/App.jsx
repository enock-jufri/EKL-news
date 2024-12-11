import React from "react";
import "./App.css";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Search from "./searchbar";


function App() {
  return (
    <>
      <header>
        <h1>EKL NEWS</h1>
        <Navbar />
        <Search />
        <NavLink to="/login" className="nav-link">Sign up</NavLink>
      </header>
      <Outlet />
    </>
  );
}

export default App;
