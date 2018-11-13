import React from 'react'
import Map from '../components/Map'
// import fetchGetJSON from '../util/FetchGetJSON'
import FetchHelper from '../helpers/FetchHelper'
import baseEventApiUrl from '../constants/config'

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
    console.log(baseEventApiUrl)
    this.getInitialLocation()
    // this.followLocation()
    this.getEventList()
  }

  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    navigation.navigate(routeName, event)
  }

  getEventList = () => {
    FetchHelper()
      .then((result) => {
        console.log(result.data)
        this.setState({
          events: result.data,
          isLoading: false,
        })
      })

    // console.log(baseEventApiUrl)
    /*
    fetchGetJSON(`${baseEventApiUrl}/event/?start=today&end=today&division=helsinki`)
      .then((result) => {
        // Results come here and data contains first 20-25 event
        // it there is 'next' which is needed if more events are needed
        // const list = result.data
        // console.log(list.length)
        this.getEventCoordinates(result.data);
      })
      .catch(() => {
        console.log('Went to catch')
      })    */
  }

  /* getEventCoordinates = (list) => {
     FetchHelper(list)
      .then((result) => {
        console.log('heiiiiiiiiiiiiiiiii')
        this.setState({
          events: result,
        })
      }) 

    // Gets location id from object and puts it to new array.
    const locationList = list.map(item => item.location['@id']);
    // gets promises from fetches and then gets array that contains all place information
    this.getLocations(locationList)
      .then((values) => {
        this.combineEventInfo(list, values)
      }).catch((e) => {
        console.log(e)
      })
} 

  getLocations = (locationList) => {
    // Multiple fetches and after fetching it continues
    const locationResult = []
    for (let i = 0; i < locationList.length; i += 1) {
      console.log('fetchaa sijainnin')
      locationResult.push(fetchGetJSON(locationList[i]))
    }
    return Promise.all(locationResult)
  }

  combineEventInfo = (list, values) => {
    const combinedList = []
    for (let i = 0; i < list.length; i += 1) {
      combinedList.push({ ...list[i], 
        ...values[i].position, 
        ...{ locName: values[i].name }, 
        ...{ locAddress: values[i].street_address,
        } })
    }
    console.log(combinedList)
    
    this.setState({
      events: combinedList,
    })
  }  */

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
