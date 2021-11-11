import React from "react";

export default function Card(props) {
  const { Titulo, Imagen } = props;
  return (
    <div className="card">
      <h2>{Titulo}</h2>
      <div>
        <img src={Imagen} width="150px" alt="No imagen" className="card-img" />
      </div>
    </div>
  );
}
