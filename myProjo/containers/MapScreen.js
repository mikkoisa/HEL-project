import React from 'react'
import Map from '../components/Map'

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set default position
      position: {
        coords: {
          latitude: 60.1665342,
          longitude: 24.9350733,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: null,
      }, 
    };
  }

  componentDidMount() {
    this.getInitialLocation()
  // this.followLocation()
  }

  getInitialLocation = () => {
    // Get the coordinates and set them to states
    navigator.geolocation.getCurrentPosition(
      (position) => {
        position.coords.latitudeDelta = 0.02,
        position.coords.longitudeDelta = 0.02,
        this.updatePosition(position)
      },
    )
  }

  updatePosition = (position) => {
    this.setState({
      position,
    })
  }

  followLocation = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        console.log(position.coords)
      },
    )
  }

  render() {
    console.log('rendering')
    const { position } = this.state
    return (
      <Map
        position={position}
      />
    );
  }
}

export default MapScreen
