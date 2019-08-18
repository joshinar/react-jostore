import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

class Register extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, email, phone, password, password2 } = this.state;
    if (password !== password2) {
      return this.props.setAlert("Passwords do not match", "danger");
    }
    const seller = {
      name,
      email,
      phone,
      password
    };

    this.props.register(seller);
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    const { name, email, phone, password, password2 } = this.state;
    return (
      <div className="container my-3">
        <h4 className="text-center my-3">
          Register quick, before you begin to sell
        </h4>
        <div className="row">
          <div className="col-md-5 bg-light mx-auto card card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email ID"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password with 6 or more chars"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={this.onChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
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
  { register, setAlert }
)(Register);
