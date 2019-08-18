import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-dark navbar-expand-lg mb-3"
        style={{ background: "#2874F0" }}
      >
        <div className="container">
          {this.props.isAuthenticated ? (
            <Link to="/dashboard" className="navbar-brand">
              Jostore
            </Link>
          ) : (
            <Link to="/" className="navbar-brand">
              Jostore
            </Link>
          )}

          {this.props.isAuthenticated ? (
            <Fragment>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className="nav-link btn btn-primary text-white mx-2"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link btn btn-primary text-white "
                    onClick={() => this.props.logout()}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </Fragment>
          ) : (
            <Fragment>
              {/* <form>
                <input
                  type="text"
                  className="form-control form"
                  placeholder="search..."
                />
              </form> */}
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link btn btn-primary text-white mx-2 my-2"
                  >
                    Sell on Jostore
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link btn btn-primary text-white mx-2 my-2"
                  >
                    Login as seller
                  </Link>
                </li>
              </ul>
            </Fragment>
          )}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
