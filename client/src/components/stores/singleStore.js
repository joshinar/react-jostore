import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { singleStoreProducts, handleSort } from "../../actions/store";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";

class singleStore extends Component {
  state = {
    sort: ""
  };
  componentDidMount() {
    this.props.singleStoreProducts(this.props.match.params.seller);
  }
  componentDidUpdate() {
    this.props.handleSort(this.state.sort);
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.props.sort);
    const { singleStore } = this.props;
    return (
      <Fragment>
        {singleStore !== null && singleStore.length > 0 ? (
          <Fragment>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label />
                  <h4 className="text-center">
                    {singleStore.length} products found
                  </h4>
                </div>
                <div className="col-md-4 text-center">
                  <label>Sort By</label>
                  <select
                    className="form-control"
                    name="sort"
                    onChange={this.onChange}
                    value={this.state.sort}
                  >
                    <option value="lowest" selected>
                      Lowest to Highest
                    </option>
                    <option value="highest">Highest to Lowest</option>
                  </select>
                </div>
                <div className="col-md-4" />
              </div>
              <div className="row">
                {singleStore.map(store => {
                  return (
                    <div className="col-md-4 text-center" key={store._id}>
                      <h5>{store.title}</h5>
                      <Link to={`/products/${store._id}`}>
                        <img
                          src={store.image}
                          alt="denim"
                          className="my-3"
                          style={{ height: "220px", width: "auto" }}
                        />

                        <h4>Price: {store.price}</h4>
                      </Link>
                    </div>
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
  singleStore: state.store.singleStoreProducts,
  sort: state.store.sort
});

export default connect(
  mapStateToProps,
  { singleStoreProducts, handleSort }
)(singleStore);
