import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Alert from "./components/layouts/Alert";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/layouts/Landing";
import singleStore from "./components/stores/singleStore";
import singleProduct from "./components/products/singleProduct";
import AddStore from "./components/stores/AddStore";
import AddProduct from "./components/products/AddProduct";
import Cart from "./components/Cart";
import Checkout from "./components/layouts/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="container text-center">
              <Alert />
            </div>

            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/products/:id" component={singleProduct} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route
                exact
                path="/stores/:id/:seller/all-products"
                component={singleStore}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/add-store-details"
                component={AddStore}
              />
              <PrivateRoute exact path="/add-product" component={AddProduct} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
