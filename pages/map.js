import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import FlagMarker from "../components/FlagMarker";
import TopTools from "../components/TopTools";
import { withAuthSync, ClientContext } from '../utils/auth'

class Map extends React.Component {
  static contextType = ClientContext;
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 25.033209,
        longitude: 121.552708,
        zoom: 14,
        width: "100%",
        height: "100vh"
      },
      popupInfo: null
    };
  }

  static async getInitialProps() {
    const res = await fetch(
      "https://api.lidbot.com/device/customers/taipei-city/sensors"
    );

    const data = await res.json();

    return { data, token: process.env.MAPBOX_ACCESS_TOKEN };
  }

  renderWasteBinMarker = (wasteBin, index) => {
    let time = moment(wasteBin.updated_on).fromNow();
    return (
      <Marker
        key={`marker-${index}`}
        longitude={wasteBin.longitude}
        latitude={wasteBin.latitude}
      >
        <FlagMarker name={wasteBin.sensor_id} eta={time.toString()} porcentage={wasteBin.fill_percentage} />
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
        <div className="TopToolsAbsolute">
          <TopTools />
        </div>
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={newViewport =>
            this.setState({ viewport: newViewport })
          }
          mapboxApiAccessToken={token}
        >
          {data.results.map(this.renderWasteBinMarker)}
          {this.renderPopup()}
        </ReactMapGL>
        <style jsx>{`
          .TopToolsAbsolute {
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 22px;
            background: white;
            width: 800px;
            right: calc(50% - 400px);
            z-index: 1;
            padding-bottom: 22px
          }
        `}</style>
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

export default withAuthSync(Map)
