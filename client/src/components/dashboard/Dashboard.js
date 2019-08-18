import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSellerProducts, deleteProduct } from "../../actions/product";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getSellerProducts();
  }
  render() {
    const { sellerProducts } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Link to="/add-store-details">
              {" "}
              <button className="btn btn-primary d-inline mx-3">
                Add store details
              </button>
            </Link>
            <Link to="/add-product">
              {" "}
              <button className="btn btn-primary d-inline">Add Products</button>
            </Link>
          </div>
        </div>
        <div className="container">
          <h5 className="text-center">Your Products</h5>
          <div className="row my-5">
            {sellerProducts.map(product => {
              return (
                <div className="col-md-4 mx-auto my-2 text-center">
                  <h5>{product.title}</h5>
                  <img
                    src={product.image}
                    alt="product"
                    style={{ height: "200px", width: "auto" }}
                    className="mx-auto my-2 d-block"
                  />
                  <button
                    className="btn btn-danger"
                    onClick={() => this.props.deleteProduct(product._id)}
                  >
                    Delete Product
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sellerProducts: state.product.sellerProducts
});

export default connect(
  mapStateToProps,
  { getSellerProducts, deleteProduct }
)(Dashboard);
