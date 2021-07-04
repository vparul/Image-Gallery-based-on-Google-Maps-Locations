import React, { Component } from "react";
import http from "../services/httpService";
import { API_KEY, BASE_URL } from "../utils/config";
import Pics from "./Pics";
import Pagination from "./Pagination";

export default class Gallery extends Component {
  state = {
    pics: [],
    loading: false,
    currentPage: 1,
    picsPerPage: 250,
    totalPages: 0,
    pageNo: 1,
    totalPics: 0,
  };

  fetchPics = async () => {
    this.setState({ loading: true });

    try {
      let res = await http.get(
        `${BASE_URL}?method=flickr.photos.search&api_key=${API_KEY}&lat=${this.props.lat}&lon=${this.props.lng}&format=json&page=${this.state.currentPage}`
      );
      res = JSON.parse(res.data.slice(14, -1));
      const { page, pages, perPage, photo, total } = res.photos;

      //set pics details
      this.setState({
        pageNo: page,
        totalPages: pages,
        picsPerPage: perPage,
        pics: photo,
        totalPics: total,
      });
    } catch (e) {
      console.log("Error: ", e);
      this.setState({ pics: [] });
    }
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.fetchPics();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.lat !== this.props.lat ||
      prevProps.lng !== this.props.lng ||
      prevState.currentPage !== this.state.currentPage
    )
      this.fetchPics();
  }
  paginate = (pageNumber) => {
    this.props.setChange(false);
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const { loading, pics, totalPages, currentPage } = this.state;
    return (
      <div>
        <div className="info-table ml-2"></div>
        <p className="text-white">
          {!loading && pics.length === 0 && `No Result Found!!`}
        </p>
        <Pics pics={pics} loading={loading} change={this.props.change} />
        {!loading && pics.length && (
          <Pagination
            paginate={this.paginate}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
      </div>
    );
  }
}
