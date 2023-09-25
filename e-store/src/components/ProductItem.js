import React from "react";

// defines a functional React component named ProductItem. 
// It takes a single argument, props, which represents the properties passed to this component. 
// In this case, it expects a product prop to be passed to it.
const ProductItem = props => {
    // extracts the product prop from the props object, 
    // making it easier to access the properties of the product inside the component.
    const { product } = props;

    // return statement defines the JSX code that will be rendered when this component is used.
    // It describes how a single product item should be displayed on a webpage.
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
                        {product.stock > 0 ? (
                            <small>{product.stock + " Available"}</small>
                        ) : (
                            <small className="has-text-danger">Out of Stock</small>
                        )}
                        <div className="is-clearfix">
                            <button 
                              className="button is-small is-outlined is-primary is-pulled-right" onClick={() => 
                                props.addToCart({
                                    id: product.name,
                                    product,
                                    amount: 1
                                })
                              }
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;