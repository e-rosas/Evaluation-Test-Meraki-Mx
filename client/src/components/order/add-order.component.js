import React, { Component } from "react";
import OrderDataService from "../../services/order.service";
import CustomerDataService from "../../services/customer.service";
import ProductDataService from "../../services/product.service";

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCustomer = this.onChangeCustomer.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.newOrder = this.newOrder.bind(this);

    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);

    this.state = {
      id: null,
      date: new Date(),
      quantity: 1,
      total: 0,
      productId: 0,
      customerId: 0,
      customer: null,
      product: null,
      customers: [],
      products: [],
      currentPrice: 0,

      submitted: false,
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
    this.retrieveProducts();
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangeCustomer(e) {
    this.setState({
      customerId: e.target.value,
    });
  }
  async onChangeProduct(e) {
    var productId = Number(e.target.value);
    if (productId > 0) {
      const price = Number(
        this.state.products.find((p) => p.id === productId).price
      );
      await this.setState(
        {
          productId: productId,
          currentPrice: price,
        }
      );
      this.updateTotal();
    }
  }
  async onChangeQuantity(e) {
    var quantity = Number(e.target.value);
    await this.setState({
      quantity: quantity,
    });
    this.updateTotal();
  }

  updateTotal() {
    if (this.state.productId > 0) {
      var total = Number(this.state.quantity * this.state.currentPrice);
      this.setState({
        total: total,
      });
    }
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

  saveOrder() {
    var data = {
      date: this.state.date,
      customerId: this.state.customerId,
      productId: this.state.productId,
      quantity: this.state.quantity,
      total: this.state.total,
    };

    OrderDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          date: response.data.date,
          customerId: response.data.customerId,
          productId: response.data.productId,
          quantity: response.data.quantity,
          total: response.data.total,
          product: response.data.product,
          customer: response.data.customer,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newOrder() {
    this.setState({
      id: null,
      date: new Date().toLocaleString(),
      quantity: 1,
      total: 0,
      productId: 0,
      customerId: 0,
      customer: null,
      product: null,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newOrder}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                value={this.state.date}
                onChange={this.onChangeDate}
                name="date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerId">Customer</label>
              <select
                className="form-control"
                id="customerId"
                required
                value={this.state.customerId}
                onChange={this.onChangeCustomer}
                name="customerId"
              >
                <option value="0">Select customer</option>
                {this.state.customers &&
                  this.state.customers.map((customer, index) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="productId">Product</label>
              <select
                className="form-control"
                id="productId"
                required
                value={this.state.productId}
                onChange={this.onChangeProduct}
                name="productId"
              >
                <option value="0">Select product</option>
                {this.state.products &&
                  this.state.products.map((product, index) => (
                    <option key={product.id} value={product.id}>
                      {product.name + " -$" + product.price}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                min="1"
                className="form-control"
                id="quantity"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="quantity"
              />
            </div>
            <div className="form-group">
              <label htmlFor="total">Total</label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="total"
                disabled
                value={this.state.total}
                name="total"
              />
            </div>

            <button onClick={this.saveOrder} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
