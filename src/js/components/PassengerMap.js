import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import { selectPassengerLocation } from '../actions/map';
import ActiveDriverMarker from '../components/ActiveDriverMarker';

class PassengerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        draggingCursor: 'move',
        draggableCursor: 'default'
      },
      userLocation: {}
    };

    this.onUserLocationClick = this.onUserLocationClick.bind(this);
  }

  onUserLocationClick(e) {
    switch (this.props.activeOrderStep) {
      case 0:
        this.props.selectPassengerLocation({
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
    const { activeDrivers } = this.props;

    const activeDriversMarkers = activeDrivers.map(driver =>
      <ActiveDriverMarker
        lat={driver.latitude}
        lng={driver.longitude}
        serviceKind={driver.serviceKind}
        driver={driver}
      />
    );

    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 50.0727773, lng: 19.9366558 }}
        options={this.state.options}
        onClick={this.onUserLocationClick}
      >
        <Marker position={{
          lat: this.props.passengerLocation.lat,
          lng: this.props.passengerLocation.lng
        }}
        />
        { activeDriversMarkers }
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  passengerLocation: state.map.passengerLocation
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, { selectPassengerLocation })(PassengerMap)));

