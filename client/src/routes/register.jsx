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
    <div className="register">
      <div className="form2">
        <h1>CREATE NEW USER!</h1>
        <form>
          <div>
            NAME:{" "}
            <input
              label="Nombre:"
              type="text"
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </div>
          <div>
            LAST NAME:{" "}
            <input
              label="Apellido:"
              type="text"
              onChange={(e) => {
                setApellido(e.target.value);
              }}
            />
          </div>
          <div>
            USER:{" "}
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
            PASSWORD:{" "}
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
            EMAIL:{" "}
            <input
              label="Email:"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mag-but">
            {name !== "" &&
            surname !== "" &&
            username !== "" &&
            password !== "" &&
            email !== "" ? (
              <button
                className="login-button"
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
                  history.push("/login");
                  console.log(register);
                }}
              >
                CREATE USER
              </button>
            ) : null}
          </div>
        </form>
        <Link to="/">
          <button className="login-button2">RETURN HOME</button>
        </Link>
      </div>
    </div>
  );
}
