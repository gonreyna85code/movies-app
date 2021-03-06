import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import home from "./routes/home.jsx";
import register from "./routes/register.jsx";
import login from "./routes/login.jsx";
import detail from "./routes/detail.jsx";
import stream from "./routes/stream.jsx";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"} component={home}></Route>           
        </Switch>
        <Switch>
          <Route exact path={"/register"} component={register}></Route>           
        </Switch>
        <Switch>
          <Route exact path={"/login"} component={login}></Route>           
        </Switch>
        <Switch>
        <Route exact path={"/movie/:id"} component={detail}></Route>
        </Switch>
        <Switch>
        <Route exact path={"/video/:title/:id/:poster/:magnet"} component={stream}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
