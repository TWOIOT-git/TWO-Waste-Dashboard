import React, { Component } from 'react'
import { Container, Row } from 'react-grid-system'
import withLayout from '../../hoc/withLayout';
import onlyAuthenticated from '../../hoc/onlyAuthenticated';

import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import WasteBinPin from '../../components/WasteBinPin';
import WasteBinInfo from '../../components/WasteBinInfo';

import bin_data from '../../bin_data.json';

console.log("env var:", process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

class Realtime extends Component {


  constructor(props) {
    super(props);
    this.state = {
      bin_data: bin_data,
      viewport: {
        latitude: 25.079964,
        longitude: 121.546367,
        zoom: 16,
        width: '100%',
        height: 800
      },
      popupInfo: null
    };
  }

  _renderWasteBinMarker = (waste_bin, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={waste_bin.longitude}
        latitude={waste_bin.latitude} >
        <WasteBinPin size={20} onClick={() => this.setState({ popupInfo: waste_bin })} />
      </Marker>
    );
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({ popupInfo: null })} >
        <WasteBinInfo info={popupInfo} />
      </Popup>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  render() {
    console.log("bin_data", this.state.bin_data);
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <h1>Waste bin map showcase!</h1>
            <ReactMapGL
              {...this.state.viewport}
              mapStyle='mapbox://styles/mapbox/dark-v9'
              onViewportChange={(viewport) => this.setState({ viewport })} >
              {this.state.bin_data.map(this._renderWasteBinMarker)}
              {this._renderPopup()}
            </ReactMapGL>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default onlyAuthenticated(withLayout(Realtime))
