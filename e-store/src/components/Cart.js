import React from "react";

// higher-order component (HOC) for providing context to this component
import withContext from "../withContext";

// component used to render individual items in the cart
import CartItem from "./CartItem";

// functional component that receives props as its argument
const Cart = props => {
    // destructures the cart property from the context prop. 
    // It assumes that the context prop contains information about the shopping cart.
    const { cart } = props.context;

    // extracts the keys of the cart object (or an empty object if cart is falsy) and stores them in the cartKeys variable
    // These keys likely represent unique identifiers for items in the cart.
    const cartKeys = Object.keys(cart || {});

    // component uses JSX to render the contents of the cart
    // starts with a title and a hero section, presumably for styling purposes.
    // 
    return (
        <>
          <div className="hero is-primary">
            <div className="hero-body container">
                <h4 className="title">My Cart</h4>
            </div>
          </div>
          <br />
          <div className="container">
            // then checks if there are items in the cart cartKeys.length and conditionally renders either the list of items or a message indicating that the cart is empty.
            {cartKeys.length ? (
                <div className="column columns is-multiline">
                    // If there are items in the cart, it maps over cartKeys and renders a CartItem component for each key, passing relevant information such as cartKey, cartItem, and a removeFromCart function as props.
                    {cartKeys.map(keys => (
                        <CartItem cartKey={keys} key={keys} cartItem={cart[keys]} removeFromCart={props.context.removeFromCart} />
                    ))}
                    <div className="column is-12 is-clearfix">
                        <br />
                        <div className="is-pulled-right">
                            <button onClick={props.context.clearCart} className="button is-warning ">
                                Clear Cart
                            </button>{" "}
                            <button className="button is-success" onClick={props.context.checkout}>
                                Checout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="column">
                    <div className="title has-text-grey-light">No item in cart! </div>
                </div>
            )}
          </div>
        </>
    );
};

// Cart component is exported as the default export. 
// It appears to be wrapped with the withContext HOC, 
// suggesting that it needs access to some context (possibly related to the cart state or actions).
export default withContext(Cart);