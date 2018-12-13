import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types'
import { NavigationEvents } from 'react-navigation'
import moment from 'moment'

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusBarHeight: 1,
      targetRegion: null,
    }
  }

  componentWillMount() {
    // Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
    setTimeout(() => this.setState({ statusBarHeight: 0 }), 500);
  }

  render() {
    const { position, events, /* ownEvents, */ handleNavigation, refresh } = this.props
    const { targetRegion } = this.state
    
    console.log(targetRegion)

    for (let i = 0; i < events.length; i += 1) {
      if (events[i].custom_data) {
        events[i].location.position.coordinates[0] = parseFloat(events[i].custom_data.lng)
        events[i].location.position.coordinates[1] = parseFloat(events[i].custom_data.lat)
      } else {
        console.log('wetn to else')
      }
    }
  
    return (
      <View style={[styles.container, { paddingTop: this.state.statusBarHeight }]}>
        <NavigationEvents
          onWillFocus={(payload) => {
            console.log(payload)
            if (payload.action.params && payload.action.params.from === 'Create') {
              Alert.alert(
                'Success',
                'Event created succesfully!',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              )
            } else if (payload.action.params && payload.action.params.from === 'Event') {
              this.setState({ 
                targetRegion: payload.action.params.event,
              })
            }
            refresh()
          }}
        />
        <MapView
          showsUserLocation
          showsMyLocationButton
          style={styles.container}
          initialRegion={position.coords}
          region={targetRegion ? {
            latitude: parseFloat(targetRegion.lat, 10),
            longitude: parseFloat(targetRegion.lng, 10),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02, 
          } : {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02, 
          }}
           onRegionChangeComplete={() => {
            targetRegion 
              ? this.setState({ targetRegion: null })
              : (console.log('already null'))
          }}
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
              description={event.start_time ? moment(event.start_time).locale('en-gb').format('LLLL') : ''}
              // image={place}
              pinColor='#bb4d00'
              onCalloutPress={() => {
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
