import React from 'react'
import Map from '../components/Map'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native'
import fetchGetJSON from '../util/FetchGetJSON'
import { baseEventApiUrl } from '../constants/config'

class MapScreen extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      // Set default position
      position: {
        coords: {
            latitude: 60.1665342,
            longitude: 24.9350733,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        },
        timestamp: null,
      },
      events: 0,
      error: null
    };
  }

  componentDidMount() {
    this.getEventList();
    this.getInitialLocation();
  }

  getEventList = () => {
    console.log(baseEventApiUrl)
    
    fetchGetJSON(`${baseEventApiUrl}/event/?start=today&end=today&division=haaga`)
      .then((result) => {
        // Results come here and data contains first 20-25 event
        // it there is 'next' which is needed if more events are needed
        const list = result.data
        console.log('list of data ' + list);
        this.setState({
          events: list,
        })
        console.log(events);

      })
      .catch(() => {
        console.log('Went to catch')
      }) 
    
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
    const { position, events} = this.state
    return (
      <Map
        position={position}
        events = {events}
      />
    );
  }
}

  export default MapScreen