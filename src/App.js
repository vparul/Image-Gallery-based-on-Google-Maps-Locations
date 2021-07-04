import React, { Component } from "react";
import "./App.scss";
import ScrollToTop from "./components/scrollToTop";
import Button from "./components/Button";
import Gallery from "./components/Gallery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  state = {
    //by default, lat and lng are for Sydney, Australia
    lat: -33.868820,
    lng: 151.209290,
    //new position as per user input - lat , lng
    latInput: undefined,
    lngInput: undefined,
    change: false,
  };

  componentDidMount() {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };

    this.mapRenderer();
  }

  mapRenderer = () => {
    const lat = this.state.lat;
    const lng = this.state.lng;
    const latLng = { lat, lng };

    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: latLng,
      });

      // Create the initial InfoWindow.
      let infoWindow = new window.google.maps.InfoWindow({
        content: "Click to set any location",
        position: latLng,
      });
      infoWindow.open(map);

      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        let lat = mapsMouseEvent.latLng.lat();
        let lng = mapsMouseEvent.latLng.lng();
        this.setLatLng(lat, lng);

        // Create a new InfoWindow.
        infoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(mapsMouseEvent.latLng.toString());
        infoWindow.open(map);
      });
    }
  };

  setLatLng = (lat, lng) => {
    this.setState({ lat, lng, change: false });
  };

  setChange = (boolean) => this.setState({ change: boolean });

  searchImages = (e) => {
    e.preventDefault();

    if (
      this.state.latInput &&
      this.state.lngInput &&
      !isNaN(this.state.latInput) &&
      !isNaN(this.state.lngInput)
    ) {
      const lat = this.state.latInput;
      const lng = this.state.lngInput;
      this.setState({ lat, lng, change: true });
      return;
    }

    toast.error("Please enter valid coordinates");
  };

  render() {
    const { lat, lng, latInput, lngInput, change } = this.state;
    return (
      <div className="container mt-4">
        <ToastContainer position="top-right" />

        <h3 className="heading text-center">Image Gallery</h3>
        <div id="map" className="mb-4"></div>
        {/* Additional Search option */}
        <h4 className="sub-heading text-center">
          Enter Coordinates to search any location{" "}
        </h4>
        <div className="input-container d-md-flex justify-content-between">
          <input
            type="number"
            placeholder="Enter Latitude"
            value={latInput}
            onChange={(e) =>
              this.setState({ latInput: e.target.value, change: true })
            }
          />
          <input
            type="number"
            placeholder="Enter Longitude"
            value={lngInput}
            onChange={(e) =>
              this.setState({ lngInput: e.target.value, change: true })
            }
          />
          <Button text="SEARCH" searchImages={this.searchImages} />
        </div>

        <ScrollToTop />
        <Gallery
          lat={lat}
          lng={lng}
          change={change}
          setChange={this.setChange}
        />
      </div>
    );
  }
}
