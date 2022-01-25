import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { register } from "../redux/actions";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setNombre] = useState("");
  const [surname, setApellido] = useState("");
  const [username, setUsuario] = useState("");
  const [password, setContraseña] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <Link to="/">
        <button>Volver al Home</button>
      </Link>
      <h1>Crear nuevo Usuario</h1>
      <form>
        <div>
          nombre
          <input
            label="Nombre:"
            type="text"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div>
          apellido
          <input
            label="Apellido:"
            type="text"
            onChange={(e) => {
              setApellido(e.target.value);
            }}
          />
        </div>
        <div>
          usuario
          <input
            label="Usuario:"
            type="text"
            name="user"
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
          />
        </div>
        <div>
          contraseña
          <input
            label="Contraseña:"
            type="password"
            onChange={(e) => {
              setContraseña(e.target.value);
            }}
          />
        </div>
        <div></div>
        <div>
          email
          <input
            label="Email:"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          {name !== "" &&
          surname !== "" &&
          username !== "" &&
          password !== "" &&
          email !== "" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                let reg = {
                  username,
                  password,
                  profile: {
                    name,
                    surname,
                    email,
                  },
                };
                dispatch(register(reg));
                history.push('/login')
                console.log(register);
              }}
            >
              Crear Usuario
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
