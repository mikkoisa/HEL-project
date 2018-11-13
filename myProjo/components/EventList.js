import React from 'react'
// import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import EventListItem from './EventListItem'
import EventDetails from './EventDetails'


class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      clickedEvent: { 
        images: { 0: 'https://api.hel.fi/linkedevents/media/images/Talvisirkus_Rakkaus_1kuva_.jpg' }, 
        name: { fi: 'Testevent' },
        short_description: { fi: 'Short Description' }, 
        description: { fi: 'Description' }, 
        locName: { fi: 'Location name' }, 
        locAddress: { fi: 'location address' }, 
      },
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
    const { events, handleNavigation, isLoading } = this.props
    const { modalVisible, clickedEvent } = this.state
    
    return (
      
      <View style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator animating={isLoading} size={70} color="#f57c00" />
        </View>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <EventListItem
              item={item} 
              onHandlePress={handleNavigation}
            />
          )}
          keyExtractor={event => `${event.id}`}
        />

        <Modal // Modal containing the details of the event
          animationType='slide'
          // transparent
          backdropColor='black'
          backdropOpacity={0.70}
          visible={modalVisible}
          onBackdropPress={() => {
            this.setModalVisible(false)
          }}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}
        >
          <EventDetails
            modalVisible={modalVisible}
            event={clickedEvent}
          />
        </Modal>
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
  loader: {
    position: 'absolute',
    marginHorizontal: '50%',
    height: 50,
  },
})


export default EventList
