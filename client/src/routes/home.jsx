import React, { useEffect } from "react";
import { getMovies, logout, getUser } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../components/paginado.jsx";
import Navbar from "../components/navbar.jsx";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User);
  useEffect(() => {
    dispatch(getUser());
    dispatch(getMovies());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="home">
      <div>
      <div className="user">
        { user === 'No Disponible' ? <Link to="/login">
          <button className="loger">LOGIN</button>
        </Link> : <button className="loger" onClick={handleLogout}>LOGOUT</button>}        
      </div>
      <Navbar />
      </div>
      <Paginado />
    </div>
  );
}
