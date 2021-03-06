import React from "react";
import ReactDOM from "react-dom";
import UnalCanvas from "./Components/UnalTemplate/UnalCanvas";
import LoginForm from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Godson from "./Components/Godson/Godson";
import Contact from "./Components/Contact/Contact";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./css/index.css";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("jwt") != null ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
ReactDOM.render(
  <BrowserRouter basename="/apoyo">
    <UnalCanvas>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/contact" component={Contact} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/godson" component={Godson} />
      </Switch>
    </UnalCanvas>
  </BrowserRouter>,
  document.getElementById("root")
);
