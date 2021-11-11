import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getSearch } from "../redux/actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const [input, setinput] = useState('')
  function submit() {   
    dispatch(getSearch(input));
  }
  return (
    
      <div className="bar">
        <input className="navbar" type="search" onKeyUp={e => (e.key === 'Enter') ? submit(e): null} onChange={e => setinput(e.target.value)} id="header-search" placeholder="  Search Movies" /> 
        &nbsp;
        <input className="navbar"type="submit" value="Search" onClick={() => submit()}/>       
      </div>      
    
  );
}