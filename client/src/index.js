import React from "react";
import ReactDOM from "react-dom";
import "./css/index.min.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Callback from "./sections/User/Callback";
import Index from "./sections/User/Index";
import Login from "./sections/Admin/Login";
import Orders from "./sections/Admin/Orders";
import Error from "./sections/Error";
import AppOrders from "./sections/User/Orders";
import History from "./sections/User/History";
import Order from "./sections/User/Order";
import Rating from "./sections/User/Rating";
import Testimonial from "./sections/Testimonial";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/testimonial">
          <Testimonial />
        </Route>
        <Route path="/auth/google/callback">
          <Callback />
        </Route>
        <Route exact path="/app">
          <Index />
        </Route>
        <Route path="/order">
          <AppOrders />
        </Route>
        <Route path="/delivered">
          <History />
        </Route>
        <Route path="/orders">
          <Order />
        </Route>
        <Route path="/rating">
          <Rating/>
        </Route>
        <Route exact path="/admin">
          <Login />
        </Route>
        <Route path="/admin/orders">
          <Orders />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
