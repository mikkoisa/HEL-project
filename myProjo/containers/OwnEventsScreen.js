import React from 'react'
import { AsyncStorage } from 'react-native'
import OwnEvents from '../components/OwnEvents'

class OwnEventsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      eventList: null,
    }
  }

  handleNavigation = (routeName, event) => {
    const { navigation } = this.props
    navigation.navigate(routeName, event)
  }

  // Getting data from asyncStorage
  getOwnEvents = async () => {
    console.log('getting')
    try {
      const value = await AsyncStorage.getItem('SavedEvents');
      if (value !== null) {
        // We have data!!
        this.setState({ eventList: JSON.parse(value) })
      } 
      return 'no value found'
    } catch (error) {
      return error
      // Error retrieving data
    } 
  }

  componentDidMount = () => {
    this.getOwnEvents()
  }

  render() {
    const { eventList } = this.state
    return (
      <OwnEvents 
        eventList={eventList}
        handleNavigation={this.handleNavigation}
      />
    )
  }
}


export default OwnEventsScreen
