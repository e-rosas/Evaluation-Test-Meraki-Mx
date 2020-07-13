import React, { Component } from "react";
import CustomerDataService from "../../services/customer.service";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.removeAllCustomers = this.removeAllCustomers.bind(this);
    this.searchName = this.searchName.bind(this);
    this.searchName = this.searchName.bind(this);
    this.state = {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then((response) => {
        this.setState({
          customers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1,
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index,
    });
  }

  removeAllCustomers() {
    CustomerDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchName() {
    CustomerDataService.findByName(this.state.searchName)
      .then((response) => {
        this.setState({
          customers: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchName, customers, currentCustomer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
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
        <div className="col-md-4">
          <Link to={"/customers/add"} className="btn btn-outline-primary">
            Add
          </Link>
        </div>
        <div className="col-md-6">
          <h4>Customers List</h4>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <td>Name</td>
                <td>Address</td>
                <td>Country</td>
              </tr>
            </thead>
            <tbody>
              {customers &&
                customers.map((customer, index) => (
                  <tr
                    className={index === currentIndex ? "table-active" : ""}
                    onClick={() => this.setActiveCustomer(customer, index)}
                    key={index}
                  >
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.country}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCustomers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCustomer.name}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentCustomer.address}
              </div>
              <div>
                <label>
                  <strong>Country:</strong>
                </label>{" "}
                {currentCustomer.country}
              </div>

              <Link
                to={"/customers/" + currentCustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
