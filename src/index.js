import React from "react";
import ReactDOM from "react-dom";
import UnalCanvas from "./Components/UnalTemplate/UnalCanvas";
import LoginForm from "./Components/Login/Login";
import Home from "./Components/Home/Home";
// import Edit from "./Components/Edit/Edit";
import Contact from "./Components/Contact/Contact";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Backend from "./serviceBackend";
import "./css/index.css";
var validToken = async () => {
  var res;
  await Backend.sendRequest("GET", "valid")
    .then(r => r.json())
    .then(r => {
      res = r.valid === "yes";
    });
  return res;
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      validToken() ? <Component {...props} /> : <Redirect to="/" />
    }
  ></Route>
);

ReactDOM.render(
  <BrowserRouter basename="/apoyo">
    <UnalCanvas>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/contact" component={Contact} />
        <PrivateRoute exact path="/home" component={Home} />
        {/* <PrivateRoute exact path="/edit/:id" component={Edit} /> */}
      </Switch>
    </UnalCanvas>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
