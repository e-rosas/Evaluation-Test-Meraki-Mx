import React, { Component } from "react";
import CustomerDataService from "../../services/customer.service";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);

    this.state = {
      currentCustomer: {
        id: null,
        name: "",
        address: "",
        country: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          name: name
        }
      };
    });
  }

  onChangeAddress(e) {
    const address = e.target.value;
    
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        address: address
      }
    }));
  }

  onChangeCountry(e) {
    const country = e.target.value;
    
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        country: country
      }
    }));
  }

  getCustomer(id) {
    CustomerDataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCustomer() {
    CustomerDataService.update(
      this.state.currentCustomer.id,
      this.state.currentCustomer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The customer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCustomer() {    
    CustomerDataService.delete(this.state.currentCustomer.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/customers')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Customer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCustomer.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentCustomer.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={currentCustomer.country}
                  onChange={this.onChangeCountry}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCustomer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCustomer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    );
  }
}
