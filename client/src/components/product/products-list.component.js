import React, { Component } from "react";
import ProductDataService from "../../services/product.service";
import { Link } from "react-router-dom";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then((response) => {
        this.setState({
          products: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1,
    });
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index,
    });
  }

  removeAllProducts() {
    ProductDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchName() {
    ProductDataService.findByName(this.state.searchName)
      .then((response) => {
        this.setState({
          products: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchName, products, currentProduct, currentIndex } = this.state;

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
          <Link to={"/products/add"} className="btn btn-outline-primary">
            Add
          </Link>
        </div>
        <div className="col-md-6">
          <h4>Products List</h4>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <td>Name</td>
                <td>Category</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <tr
                    className={index === currentIndex ? "table-active" : ""}
                    onClick={() => this.setActiveProduct(product, index)}
                    key={index}
                  >
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProducts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProduct.name}
              </div>
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentProduct.category}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentProduct.price}
              </div>

              <Link
                to={"/products/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
