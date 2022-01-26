import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../redux/actions";
import "../styles/auth.css";

export default function Loginform() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPasword] = useState("");
  const history = useHistory();

  return (
    <div className="login">
      <div>
        <div>          
          <div className="form">
            <h1>USER & PASSWORD</h1>
            <form>
              <div className="input">
                USER:{'   '}
                <input
                className="field"
                  label="Usuario"
                  type="text"
                  required
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div className="input2">
                PASSWORD:{'   '}
                <input
                className="field"
                  label="Contraseña"
                  type="password"
                  onChange={(e) => {
                    setPasword(e.target.value);
                  }}
                />
              </div>
            </form>
            <div className="but-form">
              <button
                className="login-button"
                onClick={() => {
                  dispatch(login({ username, password }));
                  history.push("/");
                  setTimeout(() => {
                  window.location.reload();
                  }, 2000);
                }}
              >
                {" "}
                LOGIN{" "}
              </button>
            </div>
            <div className="log-reg">
              <button className="login-button" onClick={() => history.push("/register")}>
                REGISTER
              </button>
            </div>
            <Link to="/">
            <button className="return">RETURN HOME</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
