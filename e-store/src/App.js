import React, { Component } from "react";

// handling routing and navigation in React applications.
// used for defining routes and navigation in your application.
import { 
  Routes,
  Route,
  Link,
  BrowserRouter as Router
} from "react-router-dom";

// used for interacting with APIs and fetching data from servers.
import axios from 'axios';
//  used for decoding JSON Web Tokens
import jwt_decode from 'jwt-decode';

import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';

// custom context component used for managing application state
import Context from "./Context";

// define some HTTP headers. 
// CORS headers are used to control which origins are allowed to access resources on the server.
const headers = {
  'Access-Control-Allow-Origin': 'https://localhost:3001',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

// declares a class called "App" that extends the "Component" class. 
// It is marked as the default export of the module,
// which means that when you import this module elsewhere, you can refer to it as "App."
export default class App extends Component {
  constructor(props) {
    // calling the constructor of the parent class (Component) using super(props)
    super(props);
    // initialize the component's state with default values.
    // The user is initially set to null, cart is an empty object, and products is an empty array
    this.state = {
      user: null,
      cart: {},
      products: []
    };
    // creates a reference to a React element using React.createRef(), which can be used later for DOM manipulation.
    this.routerRef = React.createRef();
  }

  // Component mount for user
 async componentDidMountUser() {
    // retrieves two items from the local storage: "user" and "cart."
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    // makes an asynchronous request to 'http://localhost:3001/products' using the Axios library.
    // The response is stored in the products constant
    const products = await axios.get('http://localhost:3001/products');

    // uses JSON.parse to convert them back into JavaScript objects if they exist.
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};

    // updates the component's state with the retrieved user, products, and cart data using this.setState.
    this.setState({ user, products: products.data, cart });
  }
  
  // Define login()
  // an asynchronous method for user login.
  // takes email and password as parameters
  login = async (email, password) => {
    // sends a POST request to a local server (http://localhost:3001/login) with the provided email and password.
    const res = await axios.post(
      'http://localhost:3001/login',
      { email, password },
      { headers: headers },
    ).catch((res) => {
      // If the request fails (status code 401), it returns false.
      return { status: 401, message: 'Unauthorized' }
    })

    // If the request is successful (status code 200),
    // it extracts the user's email from a JSON Web Token (JWT) and sets user-related information in the component's state and local storage.
    if(res.status === 200) {
      const { email } = jwt_decode(res.date.accessToken)
      const user = {
        email, token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  // Define logout()
  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    // removes the user-related information from the component's state and local storage
    localStorage.removeItem("user");
  };

  // This is a lifecycle method that runs when the component mounts.
  async componentDidMount() {
    // retrieves user information from local storage and fetches a list of products from a local server
    let user = localStorage.getItem("user");
    const products = await axios.get('http://localhost:3001/products');
    user = user ? JSON.parse(user) : null;

    // updates the component's state with the user and product data.
    this.setState({ user, products: products.data });
  }

  // AddProduct method
  // takes a product as a parameter and a callback function
  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    // adds the product to the list of products and then calls the callback function if it exists
    this.setState({ products }, () => callback && callback());
  };

  // AddToCart method
  // takes a cartItem as a parameter.
  addToCart = cartItem => {
    let cart = this.state.cart;

    // If the item already exists in the cart, it increases the item's quantity.
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }

    // It also checks if the quantity exceeds the product's stock limit and adjusts it if necessary.
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }

    // It updates the cart in both the component's state and local storage.
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  // removeFromCart method
  // It takes a cartItem as a parameter and deletes it from the cart.
  removeFromCart = cartItem => {
    let cart = this.state.cart;
    delete cart[cartItem];
    // It updates the cart in both the component's state and local storage.
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  // clearCart method
  //  removes the cart data from local storage and sets the cart in the component's state to an empty object.
  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  // Checkout method
  // This method is used to perform a checkout process.
  checkout = () => {
    // It checks if a user is logged in. If not, it redirects the user to the login page.
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const cart = this.state.cart;

    // It updates product stock based on the items in the cart and sends PUT requests to update product information on the server
    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;

        axios.put(`http://localhost:3001/products/${p.id}`, { ...p },)
      }
      return p;
    });

    this.setState({ products });
    // It then clears the cart and updates the component's state with the modified product data.
    this.clearCart();
  };

  // used to define what gets displayed by the component when it's rendered.
  render() { 
    return(
      //  part of React's context API.
      // It's a special type of component used to provide data and functions to its descendant components.
      <Context.Provider value={{
        // is the value prop of the <Context.Provider> component
        ...this.state, // spreads the current state of the component into the context's value
        removeFromCart: this.removeFromCart,
        addToCart: this.addToCart,
        login: this.login,
        AddProduct: this.AddProduct,
        clearCart: this.clearCart,
        checkout: this.checkout
      }}
      >
        // ets up the router for your React application and assigns a ref called routerRef to it
        <Router ref={this.routerRef}>
          <div className="App">
            <nav className="navbar container" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 ">ecommorce</b>
                <label role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" 
                data-target="navbarBasicExample" 
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div className={`navbar-menu ${
                this.state.showMenu ? "is-active" : ""
              }`}>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span className="tag is-primary" style={{ marginLeft: "5px" }}>
                    { Object.keys(this.state.cart).length }  
                  </span> 
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                )}
              </div>
            </nav>
            <Routes>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/product" component={ProductList} /> 
            </Routes>
          </div>
        </Router>
      </Context.Provider>
    );
  }
};