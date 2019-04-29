import React from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import FlagMarker from "../components/FlagMarker";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 25.079964,
        longitude: 121.546367,
        zoom: 16,
        width: "100%",
        height: "100vh"
      },
      popupInfo: null
    };
  }

  static async getInitialProps() {
    const res = await fetch(
      "https://raw.githubusercontent.com/TWOIOT-git/TWO-Waste-Dashboard/master/src/bin_data.json"
    );

    const data = await res.json();

    return { data, token: process.env.MAPBOX_ACCESS_TOKEN };
  }

  renderWasteBinMarker = (wasteBin, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={wasteBin.longitude}
        latitude={wasteBin.latitude}
      >
        <FlagMarker name="ROBIN XL" eta="0h 11 min" porcentage={53} />
      </Marker>
    );
  };

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <h1>{popupInfo}</h1>
        </Popup>
      )
    );
  }

  render() {
    const {
      props: { data, token },
      state: { viewport }
    } = this;
    return (
      <LayoutMenuNavegation>
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={newViewport =>
            this.setState({ viewport: newViewport })
          }
          mapboxApiAccessToken={token}
        >
          {data.map(this.renderWasteBinMarker)}
          {this.renderPopup()}
        </ReactMapGL>
      </LayoutMenuNavegation>
    );
  }
}

Map.propTypes = {
  token: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      longitude: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Map;
