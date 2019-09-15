import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classnames from "classnames";

import "./Signup.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;

    return (
      // <div className="auth-box">
      //   <h2>Sign up</h2>
      //   <hr />
      //   <div className="content">
      //     <form noValidate onSubmit={this.onSubmit}>
      //       <input
      //         type="text"
      //         name="username"
      //         className={classnames("form-control form-control-md", {
      //           "is-invalid": errors.username
      //         })}
      //         placeholder="Username"
      //         value={this.state.username}
      //         onChange={this.onChange}
      //       />
      //       {errors.username && (
      //         <div className="invalid-feedback">{errors.username}</div>
      //       )}
      //       <input
      //         type="email"
      //         name="email"
      //         className={classnames("form-control form-control-md", {
      //           "is-invalid": errors.email
      //         })}
      //         placeholder="Email"
      //         value={this.state.email}
      //         onChange={this.onChange}
      //       />
      //       {errors.email && (
      //         <div className="invalid-feedback">{errors.email}</div>
      //       )}
      //       <input
      //         type="password"
      //         name="password"
      //         className={classnames("form-control form-control-md", {
      //           "is-invalid": errors.password
      //         })}
      //         placeholder="Password"
      //         value={this.state.password}
      //         onChange={this.onChange}
      //       />
      //       {errors.password && (
      //         <div className="invalid-feedback">{errors.password}</div>
      //       )}
      //       <div className="submit-wrap"></div>
      //       <input type="submit" value="Create Account" className="submit" />
      //     </form>
      //   </div>
      // </div>
      <div className="signup-form">
        <form noValidate onSubmit={this.onSubmit}>
          <h2 className="text-center">Sign Up</h2>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className={classnames("form-control form-control-md", {
                "is-invalid": errors.username
              })}
              value={this.state.username}
              onChange={this.onChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              className={classnames("form-control form-control-md", {
                "is-invalid": errors.email
              })}
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              name="password"
              className={classnames("form-control form-control-md", {
                "is-invalid": errors.password
              })}
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Sign Up
            </button>
          </div>
          <p className="small text-center">
            By clicking the Sign Up button, you agree to our <br />
            <Link to="#">Terms &amp; Conditions</Link>, and{" "}
            <Link to="#">Privacy Policy</Link>
          </p>
          <div className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
