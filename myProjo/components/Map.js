import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'
import EventDetails from './EventDetails'
import userMarker from '../assets/userMarker.png'
import soccerBall from '../assets/soccerBall.png'


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      clickedEvent: { latlng: { latitude: 60.1695291, longitude: 24.9383613 }, title: 'Test in the city', shortDescription: 'Come and play football in the middle of the city!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id enim tincidunt, aliquet felis vel, lacinia nisi. Aenean rutrum posuere odio, quis faucibus dolor blandit a. Maecenas a turpis et magna convallis interdum. Etiam quis placerat est. Nam lacus purus, venenatis id volutpat blandit, congue in lectus. Aliquam augue diam, vestibulum in arcu sed, vehicula tristique felis. Phasellus convallis at ante non consequat. Nunc maximus ligula sed purus iaculis, sed ornare ligula tincidunt. Praesent faucibus nisl lacus, ac maximus mauris efficitur sed. In in dui pretium, porta metus nec, venenatis diam. Curabitur congue nisi in urna mattis, non sollicitudin ligula mattis. Aenean pharetra pulvinar nunc, sed aliquet ex eleifend eu. Aliquam erat volutpat. Sed velit orci, molestie nec tellus eu, iaculis elementum diam. Nunc odio neque, mattis eu semper nec, mattis eu odio. Suspendisse pulvinar semper eros non ullamcorper. Aliquam eu magna vitae metus egestas varius. Vivamus ac aliquam odio. Sed vestibulum vulputate cursus. Vivamus tempor dapibus purus nec interdum. Aliquam non volutpat ligula, eget pellentesque augue. Quisque consectetur lorem a turpis tincidunt euismod. Vestibulum urna odio, aliquam nec nisl et, finibus ultricies dolor. Praesent a ullamcorper ante. Phasellus sollicitudin sagittis rhoncus. Donec mi arcu, ornare ac quam eu, commodo.' },
      
      markerList: null,
      
      // List of events here, this is a test list
      /* events: [
        { location: { position: { coordinates: { latitude: 60.1695291, longitude: 24.9383613 } } }, name: { fi: 'suomalainen' }, shortDescription: { fi: 'lyhyt kuvaus' } },
      ], */
      /* events: [
        { latlng: { latitude: 60.1695291, longitude: 24.9383613 }, title: 'Football in the city', shortDescription: 'Come and play football in the middle of the city!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id enim tincidunt, aliquet felis vel, lacinia nisi. Aenean rutrum posuere odio, quis faucibus dolor blandit a. Maecenas a turpis et magna convallis interdum. Etiam quis placerat est. Nam lacus purus, venenatis id volutpat blandit, congue in lectus. Aliquam augue diam, vestibulum in arcu sed, vehicula tristique felis. Phasellus convallis at ante non consequat. Nunc maximus ligula sed purus iaculis, sed ornare ligula tincidunt. Praesent faucibus nisl lacus, ac maximus mauris efficitur sed. In in dui pretium, porta metus nec, venenatis diam. Curabitur congue nisi in urna mattis, non sollicitudin ligula mattis. Aenean pharetra pulvinar nunc, sed aliquet ex eleifend eu. Aliquam erat volutpat. Sed velit orci, molestie nec tellus eu, iaculis elementum diam. Nunc odio neque, mattis eu semper nec, mattis eu odio. Suspendisse pulvinar semper eros non ullamcorper. Aliquam eu magna vitae metus egestas varius. Vivamus ac aliquam odio. Sed vestibulum vulputate cursus. Vivamus tempor dapibus purus nec interdum. Aliquam non volutpat ligula, eget pellentesque augue. Quisque consectetur lorem a turpis tincidunt euismod. Vestibulum urna odio, aliquam nec nisl et, finibus ultricies dolor. Praesent a ullamcorper ante. Phasellus sollicitudin sagittis rhoncus. Donec mi arcu, ornare ac quam eu, commodo.' },
      ],  */
    }
  }

  setModalVisible(visible, clickedEvent) {
    StatusBar.setHidden(true);
    this.setState({ clickedEvent })
    this.setState({ modalVisible: visible })
  }

  constructMarker() {
    const { events } = this.props
    const markers = []
    events.map(event => (
      // console.log(event[Object.keys(event)[0]].position.coordinates[0])
      // name = event[Object.keys(event)[0]].name,
      // latitude = event[Object.keys(event)[0]].position.coordinates[0],
      // longitude = event[Object.keys(event)[0]].position.coordinates[0],
      // obj = {... name, ...latitude, ...longitude},

      /* markers.push({ 
        ...event[Object.keys(event)[0]].name,
        ...{ position: { latitude: event[Object.keys(event)[0]].position.coordinates[0], 
          longitude: event[Object.keys(event)[0]].position.coordinates[1] },
        },
      }) */

      // console.log({ latitude: event[Object.keys(event)[0]].position.coordinates[0], 
      //  longitude: event[Object.keys(event)[0]].position.coordinates[1] } )

      // markers.push(Object.assign({}))

      console.log(event.coordinates[0])
    ))
    // console.log(markers)
  } 

  render() {
    const { position, events } = this.props
    const { modalVisible, clickedEvent /* initialRegion */ } = this.state
    // console.log(events)
    this.constructMarker()
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <MapView
          loadingEnabled
          showsUserLocation
          showsMyLocationButton
          style={styles.container}
          // initialRegion={initialRegion}
          region={position.coords}
          /* onRegionChangeComplete={(region) => {
            this.setNewInitialRegion(region)
          }} */
        >
          {events.map((event, i) => (
            // This will iterate trhrough the events and display them as markers
            <Marker
              key={i}
              coordinate={{ latitude: event.coordinates[1], longitude: event.coordinates[0] }} 
              title={event.name.fi}
              // description={event[Object.keys(event)[0]].shortDescription.fi}
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

Map.propTypes = {
  // position: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
}

Map.defaultProps = {
  events: [{ latlng: { latitude: 60.1695291, longitude: 24.9383613 }, title: 'Football in the city', shortDescription: 'Come and play football in the middle of the city!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id enim tincidunt, aliquet felis vel, lacinia nisi. Aenean rutrum posuere odio, quis faucibus dolor blandit a. Maecenas a turpis et magna convallis interdum. Etiam quis placerat est. Nam lacus purus, venenatis id volutpat blandit, congue in lectus. Aliquam augue diam, vestibulum in arcu sed, vehicula tristique felis. Phasellus convallis at ante non consequat. Nunc maximus ligula sed purus iaculis, sed ornare ligula tincidunt. Praesent faucibus nisl lacus, ac maximus mauris efficitur sed. In in dui pretium, porta metus nec, venenatis diam. Curabitur congue nisi in urna mattis, non sollicitudin ligula mattis. Aenean pharetra pulvinar nunc, sed aliquet ex eleifend eu. Aliquam erat volutpat. Sed velit orci, molestie nec tellus eu, iaculis elementum diam. Nunc odio neque, mattis eu semper nec, mattis eu odio. Suspendisse pulvinar semper eros non ullamcorper. Aliquam eu magna vitae metus egestas varius. Vivamus ac aliquam odio. Sed vestibulum vulputate cursus. Vivamus tempor dapibus purus nec interdum. Aliquam non volutpat ligula, eget pellentesque augue. Quisque consectetur lorem a turpis tincidunt euismod. Vestibulum urna odio, aliquam nec nisl et, finibus ultricies dolor. Praesent a ullamcorper ante. Phasellus sollicitudin sagittis rhoncus. Donec mi arcu, ornare ac quam eu, commodo.' }],
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
