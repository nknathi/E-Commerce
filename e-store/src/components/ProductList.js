import React from "react";
import ProductItem from "./ProductItem";

// imports a higher-order component (HOC) called withContext from a relative file path
import withContext from "../withContext";

// defines the ProductList component as a functional component. 
// It takes props as its argument, which can be used to pass data and functions to the component.
const ProductList = props => {
    // destructures the product property from the context object in the component's props
    const { product } = props.context;

    // a return statement that defines what the component renders.
    return (
        <>
          <div className="hero is-primary">
            <div className="hero-body container">
                <h4 className="title">Our Products</h4>
            </div>
          </div>
          <br />
          <div className="container">
            <div className="column columns is-multiline">
                {product && product.length ? ( // there are products (product && product.length evaluates to true)
                    product.map((product, index) => ( // maps over the products and renders a ProductItem component for each product
                        // The addToCart function is passed as a prop to ProductItem.
                        <ProductItem product={product} key={index} addToCart={props.context.addToCart} />
                    ))
                ) : ( // If there are no products, it displays a message ("No product found!").
                    <div className="column">
                        <span className="title has-text-grey-light">
                            No product found!
                        </span>
                    </div>
                )}
            </div>
          </div>
        </>
    );
};

// exports the ProductList component wrapped with the withContext higher-order component. 
// This suggests that the ProductList component expects to receive some context-related data or functions from the withContext HOC.
export default withContext(ProductList);