import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'
import EventDetails from './EventDetails'
import userMarker from '../assets/userMarker.png'
import soccerBall from '../assets/soccerBall.png'

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      clickedEvent: null,

      // List of events here, this is a test list
      events: [
        { latlng: { latitude: 60.1695291, longitude: 24.9383613 }, title: 'Football in the city', shortDescription: 'Come and play football in the middle of the city!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id enim tincidunt, aliquet felis vel, lacinia nisi. Aenean rutrum posuere odio, quis faucibus dolor blandit a. Maecenas a turpis et magna convallis interdum. Etiam quis placerat est. Nam lacus purus, venenatis id volutpat blandit, congue in lectus. Aliquam augue diam, vestibulum in arcu sed, vehicula tristique felis. Phasellus convallis at ante non consequat. Nunc maximus ligula sed purus iaculis, sed ornare ligula tincidunt. Praesent faucibus nisl lacus, ac maximus mauris efficitur sed. In in dui pretium, porta metus nec, venenatis diam. Curabitur congue nisi in urna mattis, non sollicitudin ligula mattis. Aenean pharetra pulvinar nunc, sed aliquet ex eleifend eu. Aliquam erat volutpat. Sed velit orci, molestie nec tellus eu, iaculis elementum diam. Nunc odio neque, mattis eu semper nec, mattis eu odio. Suspendisse pulvinar semper eros non ullamcorper. Aliquam eu magna vitae metus egestas varius. Vivamus ac aliquam odio. Sed vestibulum vulputate cursus. Vivamus tempor dapibus purus nec interdum. Aliquam non volutpat ligula, eget pellentesque augue. Quisque consectetur lorem a turpis tincidunt euismod. Vestibulum urna odio, aliquam nec nisl et, finibus ultricies dolor. Praesent a ullamcorper ante. Phasellus sollicitudin sagittis rhoncus. Donec mi arcu, ornare ac quam eu, commodo.' },
      ],
    }
  }

  setModalVisible(visible, clickedEvent) {
    this.setState({ clickedEvent })
    this.setState({ modalVisible: visible });
  }

  render() {
    const { position } = this.props
    const { modalVisible, clickedEvent, events } = this.state
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          region={position.coords}
        >
          {events.map((event, i) => ( 
            // This will iterate trhrough the events and display them as markers
            <Marker
              key={i}
              coordinate={event.latlng}
              title={event.title}
              description={event.shortDescription}
              image={soccerBall}
              onCalloutPress={() => {
                this.setModalVisible(true, event)
              }}
            />
          ))}
          <Marker // This is the marker for the user's location
            image={userMarker}
            coordinate={position.coords}
          />
              
        </MapView>
        <Modal
          animationType='slide'
          // transparent
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
            event={clickedEvent}
          />
        </Modal>
      </View>
    )
  }
}

Map.propTypes = {
  // position: PropTypes.object.isRequired,
}

Map.defaultProps = {
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

})

export default Map
