import React, { Component } from "react";
import "../styles/button.scss";

export default class Button extends Component {
  render() {
    const { text, searchImages } = this.props;
    return (
      <div className="button-container" onClick={searchImages}>
        <a href="/">
          <i className="fa fa-search" />
          {text}
        </a>
      </div>
    );
  }
}
