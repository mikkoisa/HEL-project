import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'

class EventDetails extends React.Component {
  render() {
    // const { event } = this.props
    const event = this.props.navigation.state.params
    if (!event.location.street_address) {
      event.location.street_address = { test: 'test' }
    } 
    
    if (!event.images[0]) {
      event.images = [{ url: 'https://images.pexels.com/photos/39562/the-ball-stadion-football-the-pitch-39562.jpeg?cs=srgb&dl=ball-football-game-39562.jpg&fm=jpg' }]
    }

    console.log(event)
    
    return (
      <View style={styles.modal}>
        <ScrollView>
          <View style={styles.top}>
            <Image 
              style={styles.image}
              resizeMethod='auto'
              source={{ uri: event.images[0].url }}
            />
          </View>
          <Text style={styles.title}>{event.name[Object.keys(event.name)[0]]}</Text>
          <Text style={styles.textfield}>
            {event.short_description[Object.keys(event.short_description)[0]]}
          </Text>
          <HTMLView 
            value={event.description[Object.keys(event.description)[0]]} 
            style={styles.textfield} 
          />
          <Text style={styles.textfield}>
            {event.location.name[Object.keys(event.location.name)[0]]}
            {'\n'}
            {event.location.street_address[Object.keys(event.location.street_address)[0]]}
          </Text>
        </ScrollView>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPress}
          >
            <Text style={styles.buttonText}>
              JOIN EVENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPress}
          >
            <Text style={styles.buttonText}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

EventDetails.Proptpes = {
  modalVisible: PropTypes.bool,
}

EventDetails.defaultProps = {
  modalVisible: false,
  event: { locAddress: { test: 'test' } },
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    //  alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    // borderRadius: 10,
    // borderColor: '#C0C0C0',
    // borderWidth: 2,
    marginHorizontal: 0,
    marginVertical: 0,
    // padding: 20,
    elevation: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: 'black',
  },
  textfield: {
    padding: 20,
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 20,
    // textAlign: 'center', 
    color: '#f57c00',
  },
  buttonText: {
    textAlign: 'center', 
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    padding: 5,
    margin: 10,
    width: '40%',
    borderRadius: 5,
    shadowRadius: 5,
    backgroundColor: '#f57c00',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    height: 200,
  },
  bottom: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default EventDetails
