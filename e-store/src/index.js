import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // style
import App from './App'; // root component
import reportWebVitals from './reportWebVitals';
import "bulma/css/bulma.css" // style for react

// creates a root element in your HTML document where your React application will be rendered. 
// The document.getElementById('root') part finds an HTML element with the id 'root' in your HTML file
const root = ReactDOM.createRoot(document.getElementById('root'));
// code renders your React application by calling root.render().
// It uses JSX syntax to define the structure of the application.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// invokes a function (reportWebVitals) that is used to record and report web performance metrics
reportWebVitals();