import React from "react";
import Header from "./Components/Header"; // Import the Header component
import Breadcrumbs from "./Components/Breadcrumbs";

const withHeader = (WrappedComponent) => (props) => {
  return (
    <div>
      <Header />
      <WrappedComponent {...props} />
    </div>
  );
};

export default withHeader;
