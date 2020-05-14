import React, { Component } from "react";

class Registration extends Component {
  state = {
    username: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={async () => {
            const user = {
              username: this.state.username,
              password: this.state.password,
            };
            const response = await fetch("/register", {
              method: "POST",
              headers: {
                "Content-Type": "application.json",
              },
              body: JSON.stringify(user),
            });

            if (response.ok) {
              console.log("response worked!");
            }
          }}
        >
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
