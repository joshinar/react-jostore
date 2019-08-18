import React, { Component } from "react";
import axios from "axios";

class Checkout extends Component {
  componentDidMount() {
    const cartItems = [];
    const products = JSON.parse(localStorage.getItem("cartItems"));
    products.forEach(product =>
      cartItems.push({ title: product.title, seller: product.seller })
    );
    this.setState({ products: cartItems });
  }
  state = {
    name: "",
    email: "",
    phone: "",
    address: "",
    products: []
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "Application/json"
      }
    };
    await axios.post("/item-cusinfo", this.state, config);
    alert("Order placed succesfully");
    localStorage.removeItem("cartItems");
  };
  render() {
    const { name, email, phone, address } = this.state;
    return (
      <div className="container my-5">
        <h5 className="text-center">Enter shipping details</h5>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your phone no."
                  name="phone"
                  value={phone}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={this.onChange}
                />
              </div>

              <button
                className="btn btn-primary d-block mx-auto mt-3"
                type="submit"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
