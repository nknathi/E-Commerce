import React from "react";

// defines a functional component named CartItem. 
// It accepts a single argument props, which is an object containing properties passed to the component.
const CartItem = props => {
    // the cartItem and cartKey properties are extracted from the props object. 
    // These properties are expected to be passed when using the CartItem component
    const { cartItem, cartKey } = props;

    // destructures the cartItem object to extract the product and amount properties.
    // It assumes that cartItem is an object with these properties
    const { product, amount } = cartItem;

    // defines the JSX that will be rendered when the CartItem component is used.
    // It creates a structured layout for displaying information about the product in the cart, including its name, price, description, and the quantity in the cart. 
    // Additionally, it provides a delete button that invokes the removeFromCart function when clicked, passing cartKey as an argument.
    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt={product.shortDesc} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <b style={{ textTransform: "capitalize" }}>
                            {product.name}{" "}
                            <span className="tag is-primary">${product.price}</span>
                        </b>
                        <div>{product.shortDesc}</div>
                        <small>{`${amount} in cart`}</small>
                    </div>
                    <div className="media-right" onClick={() => props.removeFromCart(cartKey)}>
                        <span className="delete is-large"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// CartItem component is exported so that it can be imported and used in other parts of your application.
export default CartItem;