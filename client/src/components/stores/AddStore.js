import React, { Component } from "react";
import { connect } from "react-redux";
import { addStore } from "../../actions/store";

class AddStore extends Component {
  state = {
    name: "",
    image: "",
    city: "",
    country: "",
    dealsIn: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addStore(this.state, this.props.history);
  };
  render() {
    const { name, image, city, country, dealsIn } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-5 mx-auto card card-body">
            <h4 className="text-center">Add Store Details</h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter store name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Paste image url"
                  name="image"
                  value={image}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city name"
                  name="city"
                  value={city}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter country name"
                  name="country"
                  value={country}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  name="dealsIn"
                  value={dealsIn}
                  onChange={this.onChange}
                >
                  <option value="menswear" selected>
                    Mens wear
                  </option>
                  <option value="kidswear">Kids wear</option>
                  <option value="womenswear">Womens wear</option>
                </select>
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary mx-auto d-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addStore }
)(AddStore);
