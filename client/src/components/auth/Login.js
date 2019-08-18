import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const seller = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(seller);
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container my-3">
        <h4 className="text-center my-3">Login to access dashboard</h4>
        <div className="row">
          <div className="col-md-5 bg-light mx-auto card card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter registered Email ID..."
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password..."
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn btn-primary my-2"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
