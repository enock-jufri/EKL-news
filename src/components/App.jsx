import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function App() {
  let navigate=useNavigate()
  const [articles, setArticles] = useState([]);

  function onBookmark(n) {
    setArticles([...articles, n]);
  }

  function home(){
    navigate('/')
  }

  return (
    <>
      <header>
        <h1 onClick={home}>EKL NEWS</h1>
        <div>
          <NavLink to="/search" className="nav-link">search</NavLink>
          <NavLink to="/read" className="nav-link">Read Later</NavLink>
          <NavLink to="/login" className="nav-link">sign up</NavLink>
          </div>
      </header>
      <Outlet context={{ onBookmark, articles }} />
    </>
  );
}

export default App;
