import React, { Component } from "react";
import OrderDataService from "../../services/order.service";
import { Link } from "react-router-dom";

export default class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchProductName = this.onChangeSearchProductName.bind(this);
    this.onChangeSearchCustomerName = this.onChangeSearchCustomerName.bind(this);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrder = this.setActiveOrder.bind(this);
    this.removeAllOrders = this.removeAllOrders.bind(this);
    this.searchName = this.searchName.bind(this);
    
    this.state = {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      searchProductName: "",
      searchCustomerName: "",
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }

  onChangeSearchProductName(e) {
    const searchName = e.target.value;

    this.setState({
      searchProductName: searchName,
    });
  }
  onChangeSearchCustomerName(e) {
    const searchName = e.target.value;

    this.setState({
      searchCustomerName: searchName,
    });
  }

  retrieveOrders() {
    OrderDataService.getAll()
      .then((response) => {
        this.setState({
          orders: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOrders();
    this.setState({
      currentOrder: null,
      currentIndex: -1,
    });
  }

  setActiveOrder(order, index) {
    this.setState({
      currentOrder: order,
      currentIndex: index,
    });
  }

  removeAllOrders() {
    OrderDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchName() {
    OrderDataService.findByName(this.state.searchProductName, this.state.searchCustomerName)
      .then((response) => {
        this.setState({
          orders: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchProductName, searchCustomerName, orders, currentOrder, currentIndex } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by product name"
                value={searchProductName}
                onChange={this.onChangeSearchProductName}
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by customer name"
                value={searchCustomerName}
                onChange={this.onChangeSearchCustomerName}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="input-group mb-3">
              <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchName}
                >
                  Search
                </button>
              </div>
            </div>
        </div>
        <div className="row">
          <div className="col-md-11 text-right">
            <Link to={"/orders/add"} className="btn btn-outline-primary">
              Add
            </Link>
          </div>
        </div>

        <div className="row">
        <div className="col-md-7">
          <h4>Orders List</h4>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <td>Order</td>
                <td>Date</td>
                <td>Customer</td>
                <td>Product</td>
                <td>Quantity</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => (
                  <tr
                    className={index === currentIndex ? "table-active" : ""}
                    onClick={() => this.setActiveOrder(order, index)}
                    key={index}
                  >
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.customer.name}</td>
                    <td>{order.product.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllOrders}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-5">
          {currentOrder ? (
            <div>
              <h4>Order</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentOrder.id}
              </div>
              <div>
                <label>
                  <strong>Date:</strong>
                </label>{" "}
                {currentOrder.date}
              </div>
              <div>
                <label>
                  <strong>Total:</strong>
                </label>{" "}
                {currentOrder.total}
              </div>

              <Link
                to={"/orders/" + currentOrder.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Order...</p>
            </div>
          )}
        </div>
        </div>
        
        
      </div>
    );
  }
}
