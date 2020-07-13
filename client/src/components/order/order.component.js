import React, { Component } from "react";
import OrderDataService from "../../services/order.service";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.getOrder = this.getOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);

    this.state = {
      currentOrder: {
        id: null,
         date: new Date().toLocaleString(),
      quantity: 1,
      total: 0,
      productId: 0,
      customerId: 0,
      customer: null,
      product: null,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getOrder(this.props.match.params.id);
  }

  onChangeDate(e) {
    const date = e.target.value;

    this.setState(function(prevState) {
      return {
        currentOrder: {
          ...prevState.currentOrder,
          date: date
        }
      };
    });
  }


  getOrder(id) {
    OrderDataService.get(id)
      .then(response => {
        this.setState({
          currentOrder: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateOrder() {
    OrderDataService.update(
      this.state.currentOrder.id,
      this.state.currentOrder
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The order was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteOrder() {    
    OrderDataService.delete(this.state.currentOrder.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/orders')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentOrder } = this.state;

    return (
      <div>
        {currentOrder ? (
          <div className="edit-form">
            <h4>Order</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  disabled
                  value={currentOrder.id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={currentOrder.date}
                  onChange={this.onChangeDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Total</label>
                <input
                  type="text"
                  className="form-control"
                  id="total"
                  disabled
                  value={currentOrder.total}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteOrder}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateOrder}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Order...</p>
          </div>
        )}
      </div>
    );
  }
}
