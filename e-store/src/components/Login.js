//  imports the Component class
import React, { Component } from "react";
// used for programmatic navigation in the application.
import { Navigate } from "react-router-dom";
// higher-order component (HOC) that wraps the Login component with some additional context-related functionality
import withContext from "../withContext";

// class named Login is declared, and it extends the Component class from React
// means Login is a React class component.
class Login extends Component {
    constructor(props) {
      super(props);

      // component initializes its state with two properties:
      // username and password, both initially set to empty strings.
      this.state = {
        username: "",
        password: ""
      };
    }
  
    // method that is used to update the state when input fields change.
    // It uses the e.target.name to dynamically update the corresponding state property with the new value entered by the user.
    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });
  
    // method that handles the form submission 
    login = (e) => {
      // prevents the default form submission behavior (page refresh)
      e.preventDefault();
  
      // extracts the username and password from the component's state.
      const { username, password } = this.state;

      // checks if both fields are filled; if not, it sets an error message in the state
      if (!username || !password) {
        return this.setState({ error: "Fill all fields!" });
      }
      // If both fields are filled, it calls a login function provided via props from the context 
      this.props.context.login(username, password)
        .then((loggedIn) => { // expects the login function to return a Promise that resolves to a boolean value indicating whether the login was successful or not.
          if (!loggedIn) { // unsuccessful (the Promise resolves to false), it sets an "Invalid Credentials" error message in the state.
            this.setState({ error: "Invalid Credentails" });
          }
        })
    };
  
    //  render method contains a conditional statement that checks the value of this.props.context.user.
    // Depending on whether user is falsy (likely indicating that the user is not logged in) or truthy (indicating that the user is logged in),
    // different JSX elements are returned.
    render() {
      // If this.props.context.user is falsy (not logged in), the following JSX is returned:
      return !this.props.context.user ? (
        <>
          <div className="hero is-primary ">
            <div className="hero-body container">
              <h4 className="title">Login</h4>
            </div>
          </div>
          <br />
          <br />
          <form onSubmit={this.login}>
            <div className="columns is-mobile is-centered">
              <div className="column is-one-third">
                <div className="field">
                  <label className="label">Email: </label>
                  <input
                    className="input"
                    type="email"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Password: </label>
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error && (
                  <div className="has-text-danger">{this.state.error}</div>
                )}
                <div className="field is-clearfix">
                  <button className="button is-primary is-outlined is-pulled-right">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        // If this.props.context.user is truthy (logged in), it renders a <Navigate to="/products" /> component. 
        // This suggests that the user is redirected to a "/products" route upon successful login.
        <Navigate to="/products" />
      );
    }
  }  

export default withContext(Login);
