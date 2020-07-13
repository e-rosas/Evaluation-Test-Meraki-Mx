import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCustomer from "./components/customer/add-customer.component";
import Customer from "./components/customer/customer.component";
import CustomersList from "./components/customer/customers-list.component";

import AddProduct from "./components/product/add-product.component";
import Product from "./components/product/product.component";
import ProductsList from "./components/product/products-list.component";

import AddOrder from "./components/order/add-order.component";
import Order from "./components/order/order.component";
import OrdersList from "./components/order/orders-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/products" className="navbar-brand">
              e-commerce
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/customers"} className="nav-link">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/products"} className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/orders"} className="nav-link">
                  Orders
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route
                exact
                path={["/", "/customers"]}
                component={CustomersList}
              />
              <Route exact path="/customers/add" component={AddCustomer} />
              <Route path="/customers/:id" component={Customer} />
              <Route
                exact
                path={["/", "/products"]}
                component={ProductsList}
              />
              <Route exact path="/products/add" component={AddProduct} />
              <Route path="/products/:id" component={Product} />
              <Route
                exact
                path={["/", "/orders"]}
                component={OrdersList}
              />
              <Route exact path="/orders/add" component={AddOrder} />
              <Route path="/orders/:id" component={Order} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
