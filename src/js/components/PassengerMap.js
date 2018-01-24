import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import { connect } from 'react-redux';
import { selectPassengerLocation } from '../actions/map';
import ActiveDriverMarker from '../components/ActiveDriverMarker';
import passengerMarker from '../../static/user-marker.png';
import taxiMarkerStandard from '../../static/taxi-marker.png';
import taxiMarkerPremium from '../../static/taxi-marker-black.png';

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

  // renderRoute() {
  //   console.log('wchodze aaaaaa');
  //   const DirectionsService = new window.google.maps.DirectionsService();
  //   console.log(this.props.passengerLocation.lat, this.props.passengerLocation.lng);
  //   console.log(this.props.selectedDriver.latitude, this.props.selectedDriver.longitude);
  //   DirectionsService.route({
  //     origin: new window.google.maps.LatLng(this.props.passengerLocation.lat, this.props.passengerLocation.lng),
  //     destination: new window.google.maps.LatLng(this.props.selectedDriver.latitude, this.props.selectedDriver.longitude),
  //     travelMode: window.google.maps.TravelMode.DRIVING
  //   }, (result, status) => {
  //     if (status === window.google.maps.DirectionsStatus.OK) {
  //       this.setState({
  //         directions: result
  //       });
  //     } else {
  //       console.error(`error fetching directions ${result}`);
  //     }
  //   });
  // }

  render() {
    const { activeDrivers } = this.props;

    const activeDriversMarkers = activeDrivers.map(driver =>
      <ActiveDriverMarker
        lat={driver.latitude}
        lng={driver.longitude}
        serviceKind={driver.user.serviceKind}
        driver={driver}
      />);

    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 50.0727773, lng: 19.9366558 }}
        options={this.state.options}
        onClick={this.onUserLocationClick}
      >
        <Marker
          position={{
            lat: this.props.passengerLocation.lat,
            lng: this.props.passengerLocation.lng
          }}
          defaultIcon={passengerMarker}
        />
        { this.props.isAccepted &&
          <Marker
            position={{
              lat: this.props.selectedDriver.latitude,
              lng: this.props.selectedDriver.longitude
            }}
            defaultIcon={this.props.selectedDriver.user.serviceKind === 'STANDARD' ? taxiMarkerStandard : taxiMarkerPremium}
          />}
        { activeDriversMarkers }
        { this.props.directions && <DirectionsRenderer directions={this.state.directions} />}
      </GoogleMap>
    );
  }
}

const mapStateToProps = state => ({
  passengerLocation: state.map.passengerLocation,
  selectedDriver: state.map.selectedDriver
});

export default withScriptjs(withGoogleMap(connect(mapStateToProps, { selectPassengerLocation })(PassengerMap)));

