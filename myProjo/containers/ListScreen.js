import React from 'react'
import EventList from '../components/event list components/EventList'
import asyncGetData from '../util/AsyncStorageGetData'
import asyncSaveData from '../util/AsyncStorageSaveData'
import fetchGetJSON from '../util/FetchGetJSON'
import apiUrls from '../constants/config'
import Loader from '../components/Loader'

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      isLoading: true,
      ownEvents: null,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleBarNavigation: this.handleBarNavigation })
    this.getEventList()
    this.getOwnEvents()
  }

  handleNavigation = (routeName, event, from) => {
    const { navigation } = this.props
    const joined = this.checkDuplicate(event)

    navigation.navigate(routeName, { storeOwnEvent: this.storeOwnEvent, event, joined, handleNavigation: this.handleNavigation, from })
  }

  handleBarNavigation = () => {
    this.handleNavigation('Own')
  }

  getOwnEvents = () => {
    asyncGetData()
      .then((result) => {
        if (result) {
          this.setState({
            ownEvents: JSON.parse(result),
          })
        } else {
          this.setState({
            ownEvents: {},
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
          return true
        }
      }
    }
    return false
  }

  getEventList = () => {
    this.setState({
      // isLoading: true,
    })
    fetchGetJSON(`${apiUrls.baseEventApiUrl}${apiUrls.helsinkiToday}`)
      .then((result) => {
        this.setState({
          events: result.data,
          isLoading: false,
        })
      })
  }

  render() {
    const { events, isLoading/* , ownEventsLoading */ } = this.state 
    if (!isLoading) {
      return (
        <EventList
          isLoading={isLoading}
          handleNavigation={this.handleNavigation}
          refreshList={this.getEventList}
          refreshOwnEvents={this.getOwnEvents}
          events={events}
        />
      )
    } 
    return (
      <Loader />
    )
  }
}

export default ListScreen
