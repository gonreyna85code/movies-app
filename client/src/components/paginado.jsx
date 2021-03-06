import React, { useEffect, useState } from "react";
import Card from "./card.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Paginado() {
  const movies = useSelector((state) => state.Movies);
  const [currentPage, setCurrentPage] = useState(0);

  const next_Page = () => {
    if (movies.length <= currentPage + 10) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 10);
  };
  const prev_Page = () => {
    if (currentPage < 9) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 10);
    }
  };
  const first_Page = () => {
    setCurrentPage(0);
  };
  const last_Page = () => {
    setCurrentPage(movies.length - 10);
  };
  useEffect(() => {
    first_Page();
  }, [movies]);
  

  const list = movies.slice(currentPage, currentPage + 10);
  return (
    <div>   
      <div className="cards">
        {list.length === 0 ? (<div><h4>Oops!, no results</h4></div>) : list.map((e) => (
          <Link key={e.id} to={`movie/${e.id}`} style={{ textDecoration: 'none' }}>
            <Card Titulo={e.title} Imagen={'https://image.tmdb.org/t/p/w500' + e?.poster_path}/>
          </Link>
        ))}  
      </div>       
      <div className='pager_container'> 
      <button className="pager" onClick={first_Page}>
        First Page
      </button>
      &nbsp;
      <button className="pager" onClick={prev_Page}>
        Prev Page
      </button>
      &nbsp;
      <button className="pager" onClick={next_Page}>
        Next Page
      </button>
      &nbsp;
      <button className="pager" onClick={last_Page}>
        Last Page
      </button>
      </div>       
    </div> 
  );
}