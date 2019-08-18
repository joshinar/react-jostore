import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getStores, getLocation } from "../../actions/store";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

class Landing extends Component {
  state = {
    lat: "",
    long: ""
  };
  componentDidMount() {
    this.props.getStores();
  }

  geo = () => {
    const { lat, long } = this.state;
    this.setState({
      lat: this.props.geolocation.lat,
      long: this.props.geolocation.long
    });

    this.props.getLocation(lat, long);
  };
  render() {
    const { stores } = this.props;
    return (
      <Fragment>
        {stores !== null && stores.length > 0 ? (
          <div className="container">
            <button
              onClick={() => {
                this.geo();
              }}
              className="btn btn-primary my-3"
            >
              Stores near me
            </button>

            <div className="row">
              {stores.map(store => {
                return (
                  <Fragment key={store._id}>
                    <div className="col-sm-6 col-md-4">
                      <h3 className="text-center my-2">{store.name}</h3>
                      <Link
                        to={`/stores/${store.name}/${
                          store.seller
                        }/all-products`}
                      >
                        <img
                          src={store.image}
                          alt="store"
                          style={{
                            height: "200px",
                            width: "auto",
                            borderRadius: "5px"
                          }}
                          className="text-center d-block mx-auto p-2"
                          onClick={() => this.geo()}
                        />
                      </Link>
                      <h5 className="text-center">City: {store.city} </h5>
                      <h5 className="text-center">Deals In: {store.dealsIn}</h5>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  stores: state.store.allStores,
  geolocation: state.store.geolocation
});

export default connect(
  mapStateToProps,
  { getStores, getLocation }
)(Landing);
