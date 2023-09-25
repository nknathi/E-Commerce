// core library for creating React components
// {Component} used to define a class-based component.
import React, { Component } from "react";

// used for managing application context
import withContext from "../withContext";

// used for navigation within the React application
import { Navigate } from "react-router-dom";

// making HTTP requests.
import axios from "axios";

//  initState constant is defined, which initializes the state of the AddProduct component with empty values for various product attributes
const initState = {
    name: "",
    price: "",
    stock: "",
    shortDesc: "",
    description: ""
};

// AddProduct is defined as a class that extends Component. 
// This means it's a class-based React component
class AddProduct extends Component {
    // constructor method is used to initialize the component's state. 
    // It sets the initial state to the values defined in initState.
    constructor(props) {
        super(props);
        this.state = initState;
    }

    // method is an async function that handles the logic for saving a new product when the user submits a form
    // takes an event (e) as an argument
    save = async (e) => {
        // first prevents the default form submission behavior (preventing the page from refreshing)
        e.preventDefault();
        // extracts values for name, price, stock, shortDesc, and description from the component's state
        const { name, price, stock, shortDesc, description } = this.state;

        if (name && price) {
            // generates a unique id for the product by combining a random string and the current timestamp.
            const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

            // make a POST request to http://localhost:3001/products with the product data (including the generated id).
            await axios.post(
                'http://localhost:3001/products',
                { id, name, price, stock, shortDesc, description },
            )

            // If the request is successful, it calls a function from the component's context
            // to add the new product to the application's state
            this.props.context.addProduct(
                {
                    name,
                    price,
                    shortDesc,
                    description,
                    stock: stock || 0
                },
                () => this.setState(initState) // resets the component's state to initState.
            );
            this.setState(
                // sets a "success" flash message in the state.
                { flash: { status: 'is-success', msg: 'Product created successfully' }}
            );
        } else {
            this.setState(
                // If the name or price is missing, it sets an error flash message in the state.
                { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
            );
        }
    };

    // method is used to update the component's state when the user enters data in input fields. 
    // It takes an event (e) as an argument.
    // dynamically sets the state property corresponding to the input field's name attribute to the input's current value.
    // example, if the input field has name="name", it updates this.state.name.
    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

    // method is responsible for rendering the component's output, which is typically what the user sees on the webpage
    render() {
        // name, price, stock, shortDesc, and description are extracted from the component's state.
        const { name, price, stock, shortDesc, description } = this.state;
        // user is extracted from the context prop
        const { user } = this.props.context;

        // a conditional rendering based on the user's access level. 
        // If the user's accessLevel is less than 1, it will render a Navigate component that redirects to the home page
        return !(user && user.accessLevel < 1) ? (
            <Navigate to="/" />
        ) : ( // If the user has the required access level, render the following
            <>
              <div className="hero is-primary">
                <div className="hero-body container">
                    <h4 className="title">Add Product</h4>
                </div>
              </div>
              <br />
              <br />
              <form onSubmit={this.save}>
                <div className="columns is-mobile is-centered">
                    <div className="column is-one-third">
                        <div className="field">
                            <label className="label">Product Name: </label>
                            <input className="input" type="text" name="name" value={name} onChange={this.handleChange} required />
                        </div>
                        <div className="field">
                            <label className="label">Price: </label>
                            <input className="input" type="number" name="price" value={price} onChange={this.handleChange} required />
                        </div>
                        <div className="field">
                            <label className="label">Available in Stock: </label>
                            <input className="input" type="number" name="stock" value={stock} onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <label className="label">Short Description: </label>
                            <input className="input" type="text" name="shortDesc" value={shortDesc} onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <label className="label">Description: </label>
                            <textarea className="textarea" typeof="text" rows="2" style={{ resize: "none" }} name="description" value={description} onChange={this.handleChange} />
                        </div>
                        {this.state.flash && (
                            <div className={`notification ${this.state.flash.status}`}>
                                {this.state.flash.msg}
                            </div>
                        )}
                        <div className="field is-clearfix">
                            <button className="button is-primary is-outlined is-pulled-right" type="submit" onClick={this.save}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
              </form>
            </>
        )
    }
}

export default withContext(AddProduct);