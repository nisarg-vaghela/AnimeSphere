import React, { Component } from "react";

class Info extends Component {
  render() {
    return (
      <h2
        style={{ textAlign: "center", fontFamily: "monospace", color: "#8cdf97" }}
      >
        ~We Have Seen{" "}
        <span className="text-light" style={{textColor: "green"}}>{this.props.numberOfAnimes}</span> Animes~
      </h2>
    );
  }
}

export default Info;
