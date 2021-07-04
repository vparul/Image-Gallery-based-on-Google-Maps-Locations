import React, { Component } from "react";
import "../styles/pics.scss";

export default class Pics extends Component {
  render() {
    const { change, pics, loading } = this.props;
    !change && window.scrollTo({top: 0});
    return (
      <div>
        {loading && (
          <div className="text-white">
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <span className="pl-2">Loading Pics...</span>
          </div>
        )}
        {!loading && (
          <div className="mb-4">
            {pics.map((pic, i) => (
              <a
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
                download
              >
                <img
                  src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
                  alt="IMG"
                  className="img-fluid gallery-img"
                />{" "}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
}
