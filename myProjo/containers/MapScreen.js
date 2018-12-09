import React from 'react'
import Map from '../components/Map'
import fetchGetJSON from '../util/FetchGetJSON'
import asyncGetData from '../util/AsyncStorageGetData'
import asyncSaveData from '../util/AsyncStorageSaveData'
import Loader from '../components/Loader'
import apiUrls from '../constants/config'


class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  
      eventsLoading: true,
      ownEventsLoading: true,
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
        { location: { position: { coordinates: [60.1695291, 24.9383613] }, name: { fi: 'sijainnin nimi' } }, name: { fi: 'suomalainen' }, short_description: { fi: 'lyhyt kuvaus' }, id: '5', custom_data: { lat: 60.1695291, lng: 24.9383613 } },
      ],
      ownEvents: null,
    };
  }

  componentDidMount() {
    console.log('component mounted')
    this.getInitialLocation()
    // this.followLocation()
    this.refreshContent()
    // asyncRemoveData()
  }

  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    // const { ownEvents } = this.state
    const joined = this.checkDuplicate(event)

    navigation.navigate(routeName, { storeOwnEvent: this.storeOwnEvent, event, joined })
  }

  refreshContent = () => {
    console.log('updating events and own events')
    this.getEventList()
    this.getOwnEvents()
  }

  getEventList = () => {
    fetchGetJSON(`${apiUrls.baseEventApiUrl}${apiUrls.helsinkiToday}`)
      .then((result) => {
        console.log(result.data)
        this.setState({
          events: result.data,
          eventsLoading: false,
        })
      })
  }

  getOwnEvents = () => {
    asyncGetData()
      .then((result) => {
        console.log('got from async: ', JSON.parse(result))
        if (result) {
          this.setState({
            ownEvents: JSON.parse(result),
            ownEventsLoading: false,
          })
        } else {
          this.setState({
            ownEvents: {},
            ownEventsLoading: false,
          })
        }   
      })
  }

  storeOwnEvent = (event) => {
    const { ownEvents } = this.state
    let data = null

    if (Object.keys(ownEvents).length !== 0) {
      data = ownEvents
    }

    if (!this.checkDuplicate(event)) {
      // data.push(ownEvents)
      if (data) {
        data.push(event)
      } else {
        data = [event]
      }    
    } else {
      data = data.filter(obj => obj.id !== event.id);
    }    
    asyncSaveData(data)
      .then((result) => {
        console.log(result)
        if (result === 'success') {
          this.getOwnEvents()
        }
      })
  }

  checkDuplicate = (event) => {
    const { ownEvents } = this.state
    if (event) {
      for (let i = 0; i < ownEvents.length; i += 1) {
        if (ownEvents[i].id === event.id) {
          console.log('is in own events')
          return true
        }
      }
    }
    console.log('not in own events')
    return false
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
    const { position, events, eventsLoading, ownEventsLoading, ownEvents } = this.state
    if (!eventsLoading && !ownEventsLoading) {
      return (
        <Map
          handleNavigation={this.handleNavigation}
          position={position}
          events={events}
          ownEvents={ownEvents}
          refresh={this.refreshContent}
        />
      )
    } 
    return (
      <Loader />
    )
  }
}

export default MapScreen
