import React from 'react'
// import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import TopBar from '../TopBar'
import EventListItem from './EventListItem'
import EventDetails from '../EventDetails'

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /* modalVisible: false,
      clickedEvent: { 
        images: { 0: 'https://api.hel.fi/linkedevents/media/images/Talvisirkus_Rakkaus_1kuva_.jpg' }, 
        name: { fi: 'Testevent' },
        short_description: { fi: 'Short Description' }, 
        description: { fi: 'Description' }, 
        locName: { fi: 'Location name' }, 
        locAddress: { fi: 'location address' }, 
      }, */
    }
  }

  setModalVisible = (visible, clickedEvent) => {
    // StatusBar.setHidden(true);
    // this.setState({ modalVisible: visible })
    // this.setState({ clickedEvent })
    const { handleNavigation } = this.props
    handleNavigation(EventDetails, clickedEvent)
  }
  

  render() {
    const { events, handleNavigation, refresh } = this.props
    // const { modalVisible, clickedEvent } = this.state
    console.log(events)

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            refresh()
          }
        }
        />
        <TopBar handleNavigation={handleNavigation} />
        <FlatList
          data={events}
          // onScrollBeginDrag={() => this.onSwipeUp()}
          // onMomentumScrollEnd={() => this.onSwipeDown()}
          renderItem={({ item }) => (
            <EventListItem
              item={item} 
              onHandlePress={handleNavigation}
            />
          )}
          keyExtractor={event => `${event.id}`}
        />
      </View>
    )
  }
}

EventList.defaultProps = {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})


export default EventList
