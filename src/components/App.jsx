import React, { useState } from "react";
import "./App.css";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";


function App() {

  const [articles, setArticles] = useState()

  function handleLike(article) {
    setArticles([...articles, article])
  }
  console.log(articles)
  return (
    <>
      <header>
        <h1>EKL NEWS</h1>
        <Navbar />
        <div>
          <NavLink to="/search" className="nav-link">search</NavLink>
          <NavLink to="/login" className="nav-link">Sign up</NavLink>
          <NavLink to="/read" className="nav-link">Read Later</NavLink>
        </div>
      </header>
      <Outlet context={{ handleLike, articles }} />
    </>
  );
}

export default App;
