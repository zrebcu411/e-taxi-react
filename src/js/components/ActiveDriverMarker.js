import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { setDriver } from '../actions/map';
import taxiMarkerStandard from '../../static/taxi-marker.png';
import taxiMarkerPremium from '../../static/taxi-marker-black.png';

class ActiveDriverMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfoBoxOpen: false
    };

    this.onDriverClick = this.onDriverClick.bind(this);
  }

  onDriverClick() {
    this.props.setDriver(this.props.driver);
  }

  render() {
    return (
      <Marker
        position={{ lat: this.props.lat, lng: this.props.lng }}
        defaultIcon={this.props.serviceKind === 'STANDARD' ? taxiMarkerStandard : taxiMarkerPremium}
        onMouseOver={() => this.setState({ isInfoBoxOpen: true })}
        onMouseOut={() => this.setState({ isInfoBoxOpen: false })}
        onClick={this.onDriverClick}
      >
        { this.state.isInfoBoxOpen &&
        <InfoBox
          cos="1"
          dwa="5"
          options={{ pixelOffset: {
            height: -130,
            width: -75
          } }}
        >
          <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px`, position: 'relative', top: '-100' }}>
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
              Hello, Kaohsiung!
            </div>
          </div>
        </InfoBox>}
      </Marker>
    );
  }
}

// const mapStateToProps = state => ({
//   selectedDriver: state.user
// });

export default connect(null, { setDriver })(ActiveDriverMarker);
