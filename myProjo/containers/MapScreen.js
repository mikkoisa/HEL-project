import React from 'react'
import Map from '../components/Map'
import fetchGetJSON from '../util/FetchGetJSON'
import { baseEventApiUrl } from '../constants/config'

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
      events: null,
    };
  }

  componentDidMount() {
    this.getInitialLocation()
    // this.followLocation()
    this.getEventList()
  }

  getEventList = () => {
    console.log(baseEventApiUrl)
    
    fetchGetJSON(`${baseEventApiUrl}/event/?start=today&end=today&division=haaga`)
      .then((result) => {
        // Results come here and data contains first 20-25 event
        // it there is 'next' which is needed if more events are needed
        const list = result.data
        console.log(list.length)
        this.getEventCoordinates(list);
      })
      .catch(() => {
        console.log('Went to catch')
      })   
  }

  getEventCoordinates = (list) => {
    const locationList = list.map(item => item.location['@id']);
    // console.log(locationUrls);
    const fullList = this.getLocations(locationList)
    fullList.then((values) => {
      console.log(values)
    })
    // console.log(fullList)
  }

  getLocations = (locationList) => {
    const locationResult = []
    for (let i = 0; i < locationList.length; i += 1) {
      locationResult.push(fetchGetJSON(locationList[i]))
    }
    return Promise.all(locationResult)
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
    const { position, events } = this.state
    return (
      <Map
        position={position}
        events={events}
      />
    );
  }
}

export default MapScreen
