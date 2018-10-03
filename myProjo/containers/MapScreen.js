import React from 'react'
import Map from '../components/Map'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native'

class MapScreen extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      // Set default position
      position: {
        coords: {
            latitude: 60.1665342,
            longitude: 24.9350733,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        },
        timestamp: null,
    }, 

      error: null
    };
  }

  componentDidMount() {
    this.getInitialLocation();
  }

  getInitialLocation = () => {
    // Get the coordinates and set them to states
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        position.coords.latitudeDelta = 0.02,
        position.coords.longitudeDelta = 0.02,
        console.log(position)
        this.setState({
          position: position,
          error: null,
        })
      },
      // If error, set the error state
      (error) => this.setState({ error: error.message }),
    )
  }

  render() {
    const { position } = this.state
    return (
      <Map
        position={position}
      />
    );
  }
}

  export default MapScreen