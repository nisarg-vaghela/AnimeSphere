import React from "react";
import { CircularProgress } from "@material-ui/core";

const CircularSpinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
};

export default CircularSpinner;
