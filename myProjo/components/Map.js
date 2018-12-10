import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import PropTypes from 'prop-types'
import { NavigationEvents } from 'react-navigation'
// import TopBar from './TopBar'
// import Modal from 'react-native-modal'
// import EventDetails from './EventDetails'
// import userMarker from '../assets/userMarker.png'
// import place from '../assets/place.png'

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBarHeight: 1,
      // modalVisible: false,
      /* clickedEvent: { 
        latlng: { latitude: 60.1695291, longitude: 24.9383613 }, 
        title: 'Test', shortDescription: 'Test', description: 'Test' }, */
    }
  }

  /* setModalVisible(visible, clickedEvent) {
    StatusBar.setHidden(true);
    this.setState({ clickedEvent })
    this.setState({ modalVisible: visible })
  } */
  componentWillMount() {
    // Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
    setTimeout(() => this.setState({ statusBarHeight: 0 }), 500);
  }

  render() {
    console.log('rendering')
    const { position, events, /* ownEvents, */ handleNavigation, refresh } = this.props
    const { mapStyle } = this.state

    for (let i = 0; i < events.length; i += 1) {
      console.log(events[i])
      if (events[i].custom_data) {
        events[i].location.position.coordinates[0] = parseFloat(events[i].custom_data.lng)
        events[i].location.position.coordinates[1] = parseFloat(events[i].custom_data.lat)
      } else {
        console.log('heiii')
      }
    }
  
    return (
      <View style={[styles.container, { paddingTop: this.state.statusBarHeight }]}>
        <NavigationEvents
          onWillFocus={(payload) => {
            if (payload.action.params) {
              Alert.alert(
                'Success',
                'Event created succesfully!',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              )
            }
            refresh()
          }}
        />
        {/*  <StatusBar hidden /> */}
        {/* <TopBar handleNavigation={handleNavigation} /> */}
        <MapView
          // loadingEnabled
          showsUserLocation
          showsMyLocationButton
          style={styles.container}
          initialRegion={position.coords}
          // customMapStyle={mapStyle}
          // region={position.coords}
          /* onRegionChangeComplete={(region) => {
            this.setNewInitialRegion(region)
          }} */
        >
          {events.map(event => (
            // This will iterate trhrough the events and display them as markers
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.location.position.coordinates[1],
                longitude: event.location.position.coordinates[0], 
              }} 
              title={event.name[Object.keys(event.name)[0]]}
              // description={event.location.name[Object.keys(event.location.name)[0]]}
              // image={place}
              pinColor='#bb4d00'
              onCalloutPress={() => {
                // this.setModalVisible(true, event)
                handleNavigation('Event', event)
              }}
            />
          ))}
        </MapView>
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
    justifyContent: 'center',
  },

  menuContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

})

export default Map
