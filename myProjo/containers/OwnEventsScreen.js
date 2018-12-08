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
      console.log('error getting ', error)
      return error
      // Error retrieving data
    } 
  }

  componentDidMount = () => {
    this.getOwnEvents()
  }

  render() {
    const { eventList } = this.state
    console.log(eventList)
    return (
      <OwnEvents 
        eventList={eventList}
        handleNavigation={this.handleNavigation}
      />
    )
  }
}


export default OwnEventsScreen
