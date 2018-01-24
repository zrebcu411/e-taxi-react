import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import { selectDriverLocation } from '../actions/map';
import taxiMarkerStandard from '../../static/taxi-marker.png';
import taxiMarkerPremium from '../../static/taxi-marker-black.png';
import passengerMarker from '../../static/user-marker.png';

class PassengerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        draggingCursor: 'move',
        draggableCursor: 'default'
      }
    };

    this.onUserLocationClick = this.onUserLocationClick.bind(this);
  }

  onUserLocationClick(e) {
    switch (this.props.activeActivationStep) {
      case 0:
        this.props.selectDriverLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
        break;
      case 1:
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 50.0727773, lng: 19.9366558 }}
        options={this.state.options}
        onClick={this.onUserLocationClick}
      >
        <Marker
          position={{
            lat: this.props.driverLocation.lat,
            lng: this.props.driverLocation.lng
          }}
          defaultIcon={this.props.user.user.serviceKind === 'STANDARD' ? taxiMarkerStandard : taxiMarkerPremium}
        />
        <Marker
          position={{
            lat: this.props.passengerLocation.latitude,
            lng: this.props.passengerLocation.longitude
          }}
          defaultIcon={passengerMarker}
        />
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  driverLocation: state.map.driverLocation,
  passengerLocation: state.map.passengerLocation,
  user: state.user
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, { selectDriverLocation })(PassengerMap)));

