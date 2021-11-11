import React, { useEffect } from "react";
import { getMovies } from "../redux/actions.js";
import { useDispatch } from "react-redux";
import Paginado from "../components/paginado.jsx";
import Navbar from "../components/navbar.jsx";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div>
      <Navbar/>
      <Paginado/>
    </div>
  );
}
