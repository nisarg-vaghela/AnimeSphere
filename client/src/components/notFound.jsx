import React from "react";
import cry from "../icons/cry.gif";

const NotFound = (props) => {
  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <div
          className="d-flex justify-content-center"
          style={{
            boxShadow:
              "12px 12px 20px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={cry}
            alt="Not Found"
            style={{
              width: "500px",
              borderRadius: "10px",
            }}
            loading="lazy"
          />
        </div>
        <h1>
          <code>Page Not Found</code>
        </h1>
      </div>
    </>
  );
};

export default NotFound;
