import React, { useEffect } from "react";
import { getMovies } from "../redux/actions.js";
import { useDispatch } from "react-redux";
import Paginado from "../components/paginado.jsx";
import Navbar from "../components/navbar.jsx";
import { Link } from "react-router-dom";


export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div>
      <Link to="/">
        <button>login</button>
      </Link>      
      <Navbar/>
      <Paginado/> 
    </div>
  );
}
