import React from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native'

class MapScreen extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 60.2218619,
        longitude: 24.8786849,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.042,
      },
      userLocation: {
        latitude: 60.2218619,
        longitude: 24.8786849
      },
      
    //  latitude: null,
     // longitude: null,
      error: null
    };
  }

  componentDidMount() {
    // Get the coordinates and set them to states
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        console.log(position)
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.042,
          },
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
        })
      },
      // If error, set the error state
      (error) => this.setState({ error: error.message }),
    )
  }

  render() {
    const { region } = this.state
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}>
        <Marker
          coordinate={this.state.userLocation}/>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7'
  }
})

  export default MapScreen