import React from 'react'
import Map from '../components/Map'
import fetchGetJSON from '../util/FetchGetJSON'
import apiUrls from '../constants/config'


class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  
      isLoading: true,
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
      events: [
        { location: { position: { coordinates: [60.1695291, 24.9383613] }, name: { fi: 'sijainnin nimi' } }, name: { fi: 'suomalainen' }, short_description: { fi: 'lyhyt kuvaus' }, id: '5' },
      ],
    };
  }

  componentDidMount() {
    // console.log(baseEventApiUrl)
    this.getInitialLocation()
    // this.followLocation()
    this.getEventList()
  }

  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    navigation.navigate(routeName, event)
  }

  getEventList = () => {
    fetchGetJSON(`${apiUrls.baseEventApiUrl}${apiUrls.helsinkiToday}`)
      .then((result) => {
        // console.log(result.data)
        this.setState({
          events: result.data,
          isLoading: false,
        })
      })
  }

  getInitialLocation = () => {
    // Get the coordinates and set them to states
    let currentPos = null
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) { 
        currentPos = position
        currentPos.coords.latitudeDelta = 0.02
        currentPos.coords.longitudeDelta = 0.02
      }
        
      
      this.setState({
        position: currentPos,
      })
    })
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
    // console.log(this.props)
    const { position, events, isLoading } = this.state
    return (
      <Map
        isLoading={isLoading}
        handleNavigation={this.handleNavigation}
        position={position}
        events={events}
      />
    );
  }
}

export default MapScreen
