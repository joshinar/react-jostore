import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductDetail, addToCart } from "../../actions/product";
import Spinner from "../layouts/Spinner";

class singleProduct extends Component {
  componentDidMount() {
    this.props.getProductDetail(this.props.match.params.id);
  }
  render() {
    const { product } = this.props;
    let cartLength = JSON.parse(localStorage.getItem("cartItems"));

    return (
      <Fragment>
        <Link to="/cart">
          {cartLength ? (
            <button className="ml-auto d-block mr-5 btn-primary btn">
              {"Items in Cart: " + cartLength.length}
            </button>
          ) : (
            <button className="ml-auto d-block mr-5 btn-primary btn">
              View Cart
            </button>
          )}
        </Link>

        {product !== null && product.length > 0 ? (
          <Fragment>
            <div className="container">
              <div className="row my-5">
                {product.map(product => {
                  return (
                    <Fragment key={product._id}>
                      <div className="col-md-5 mx-auto">
                        <img
                          src={product.image}
                          alt="dress"
                          style={{ height: "300px", width: "auto" }}
                          className="mx-auto d-block"
                        />
                      </div>
                      <div className="col-md-5 mx-auto">
                        <h3 className="text-center my-3">{product.title}</h3>
                        <p className="lead my-2 text-center">
                          {product.description}
                        </p>

                        <button className="btn btn-primary disabled my-4 d-block mx-auto">
                          <strong>Price: </strong> {product.price}
                        </button>
                        <button
                          className="btn btn-primary my-4 d-block mx-auto"
                          onClick={() => this.props.addToCart(product)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </Fragment>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.singleProduct,
  cartLength: state.product.addToCart
});

export default connect(
  mapStateToProps,
  { getProductDetail, addToCart }
)(singleProduct);
