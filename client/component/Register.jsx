import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
      home: "",
      type: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSelect(e) {
    this.setState({ type: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password === this.state.confirmPassword) {
      fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          home: this.state.home,
          name: this.state.name,
          type: this.state.type,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.addCurrentUser(data);
          this.props.history.push("/");
        })
        .catch((err) => console.warn(err));
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleSelect}>
            <option value="Traveler">Traveler</option>
            <option value="Local">Local</option>
          </select>
          <input
            type="text"
            value={this.state.username}
            name="username"
            placeholder="Enter Username"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.name}
            name="name"
            placeholder="Enter Name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.home}
            name="home"
            placeholder="Enter Home"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.email}
            name="email"
            placeholder="Enter Email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            value={this.state.password}
            name="password"
            placeholder="Enter Password"
            onChange={this.handleChange}
          />
          <input
            type="password"
            value={this.state.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <button type="submit">Register</button>
        </form>
        <span>
          Have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    );
  }
}

export default withRouter(Register);
