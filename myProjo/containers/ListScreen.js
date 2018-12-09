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
      ownEventsLoading: true,
      ownEvents: null,
    }
  }

  componentDidMount() {
    this.getEventList()
    this.getOwnEvents()
  }

  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    const joined = this.checkDuplicate(event)

    navigation.navigate(routeName, { storeOwnEvent: this.storeOwnEvent, event, joined })
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

  getEventList = () => {
    this.setState({
      // isLoading: true,
    })
    fetchGetJSON(`${apiUrls.baseEventApiUrl}${apiUrls.helsinkiToday}`)
      .then((result) => {
        console.log(result.data)
        this.setState({
          events: result.data,
          isLoading: false,
        })
      })
  }

  getEvents = () => {
    const events = [
      { latlng: { latitude: 60.1695291, longitude: 24.9383613 }, title: 'Football in the city', shortDescription: 'Come and play football in the middle of the city!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id enim tincidunt, aliquet felis vel, lacinia nisi. Aenean rutrum posuere odio, quis faucibus dolor blandit a. Maecenas a turpis et magna convallis interdum. Etiam quis placerat est. Nam lacus purus, venenatis id volutpat blandit, congue in lectus. Aliquam augue diam, vestibulum in arcu sed, vehicula tristique felis. Phasellus convallis at ante non consequat. Nunc maximus ligula sed purus iaculis, sed ornare ligula tincidunt. Praesent faucibus nisl lacus, ac maximus mauris efficitur sed. In in dui pretium, porta metus nec, venenatis diam. Curabitur congue nisi in urna mattis, non sollicitudin ligula mattis. Aenean pharetra pulvinar nunc, sed aliquet ex eleifend eu. Aliquam erat volutpat. Sed velit orci, molestie nec tellus eu, iaculis elementum diam. Nunc odio neque, mattis eu semper nec, mattis eu odio. Suspendisse pulvinar semper eros non ullamcorper. Aliquam eu magna vitae metus egestas varius. Vivamus ac aliquam odio. Sed vestibulum vulputate cursus. Vivamus tempor dapibus purus nec interdum. Aliquam non volutpat ligula, eget pellentesque augue. Quisque consectetur lorem a turpis tincidunt euismod. Vestibulum urna odio, aliquam nec nisl et, finibus ultricies dolor. Praesent a ullamcorper ante. Phasellus sollicitudin sagittis rhoncus. Donec mi arcu, ornare ac quam eu, commodo.' },
      { 
        images: { 0: 'https://api.hel.fi/linkedevents/media/images/Talvisirkus_Rakkaus_1kuva_.jpg' }, 
        name: { fi: 'Testevent' },
        short_description: { fi: 'Short Description' }, 
        description: { fi: 'Description' }, 
        locName: { fi: 'Location name' }, 
        locAddress: { fi: 'location address' }, 
      },
    ]
    this.setState({ events })
  }

  render() {
    const { events, isLoading, ownEventsLoading } = this.state 
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
