import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../actions/product";
class AddProduct extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    image: "",
    wear: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addProduct(this.state, this.props.history);
  };
  render() {
    const { title, image, description, price, wear } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-5 mx-auto card card-body">
            <h4 className="text-center">Add product</h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter product title"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="description"
                  value={description}
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
                  placeholder="Enter product price"
                  name="price"
                  value={price}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  name="wear"
                  value={wear}
                  onChange={this.onChange}
                >
                  <option value="menswear">Mens wear</option>
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
  { addProduct }
)(AddProduct);
