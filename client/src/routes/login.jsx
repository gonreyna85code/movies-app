import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../redux/actions";

export default function Loginform() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPasword] = useState("");
  const history = useHistory();

  return (
    <div>
      <div>
        <div>
          <Link to="/">
            <button>Volver al Home</button>
          </Link>
          <h1>Por favor, Ingrese su Usuario y Contraseña</h1>
          <form>
            <div className="input">
              usuario
              <input
                label="Usuario"
                type="text"
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="input">
              contraseña
              <input
                label="Contraseña"
                type="password"
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
              />
            </div>
          </form>
          <div>
            <button
              onClick={() => {
                dispatch(login({ username, password }));
                history.push("/");
                window.location.reload();
              }}
            >
              {" "}
              INGRESAR{" "}
            </button>
          </div>          
          <div>          
            <button onClick={() => history.push("/register")}>
              Aún no estoy registrado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
