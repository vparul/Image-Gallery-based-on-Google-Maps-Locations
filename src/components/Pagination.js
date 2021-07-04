import React, { Component } from "react";
import "../styles/pagination.scss";

export default class Pagination extends Component {
  pages = [...Array(this.props.totalPages).keys()].map((num) => num + 1);

  render() {
    const { paginate, currentPage } = this.props;
    return (
      <div className="pagination">
        {this.pages.map((num) => (
          <button
            key={num}
            className={currentPage === num ? "active" : undefined}
            onClick={() => paginate(num)}
          >
            {num}
          </button>
        ))}
      </div>
    );
  }
}
