import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartItem } from "../actions/product";

class Cart extends Component {
  render() {
    const items = JSON.parse(localStorage.getItem("cartItems"));

    return (
      <div>
        {items === null || !items.length || items.length === 0 ? (
          <h3 className="text-center mt-4">Your cart is empty</h3>
        ) : (
          <div>
            <h3 className="text-center mt-4">List of items</h3>

            <div className="row mt-4">
              <div className="col-md-4 mx-auto">
                <ul
                  className="list-group"
                  style={{ height: "250px", overflow: "auto" }}
                >
                  {items.map(item => {
                    return (
                      <Fragment>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-2">
                              <img
                                src={item.product.image}
                                alt="product"
                                style={{ height: "80px", width: "auto" }}
                              />
                            </div>
                            <div className="col-md-5 mx-auto">
                              {item.product.title}
                            </div>
                            <div className="col-md-4 mx-auto">
                              &#8377;: {item.product.price}{" "}
                              <span
                                className="text-danger mx-1"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  this.props.deleteCartItem(item.id)
                                }
                              >
                                X
                              </span>
                            </div>
                          </div>
                        </li>
                      </Fragment>
                    );
                  })}
                </ul>

                {items.length === 0 ? null : (
                  <Fragment>
                    <button className="btn btn-primary d-block mx-auto mt-3">
                      Total:{" "}
                      {items.reduce((a, el) => {
                        return a + el.product.price;
                      }, 0)}
                    </button>

                    <Link
                      to="/checkout"
                      className="btn btn-primary d-block mx-auto mt-3"
                    >
                      Checkout
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.product.addToCart
});
export default connect(
  mapStateToProps,
  { deleteCartItem }
)(Cart);
