import React from "react";
import Context from "./Context";

// function is a HOC that takes a single argument, WrappedComponent. 
// WrappedComponent is expected to be another React component that you want to enhance with some additional context.
const withContext = WrappedComponent => {
    // functional component called WithHOC is defined. 
    // This component uses the React Context.Consumer component, which allows it to access and consume data from a context provider.
    const WithHOC = props => {
        return (
            // WrappedComponent is rendered with the original props passed to WithHOC,
            // as well as an additional prop called context,
            // which receives the value of the context data.
            <Context.Consumer>
                {context => <WrappedComponent {...props} context={context} />}
            </Context.Consumer>
        );
    };

    // withContext function returns the WithHOC component,
    // which is now a Higher Order Component.
    // When you use this HOC, you wrap your existing components,
    // and they will receive the context data as a prop called context.
    return WithHOC;
};

export default withContext;