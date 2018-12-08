import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'
// import football from '../assets/ball-football-game-39562.jpg'

class EventDetails extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      localJoined: null,
    }
  }

  render() {
    console.log(this.props.navigation.state)
    const { event, storeOwnEvent, joined } = this.props.navigation.state.params
    const { localJoined } = this.state
    console.log(joined, localJoined)
    // const event = params.event
    // const { ownEvents } = event.ownEvents
    // console.log(ownEvents)
    let source = null

    /* if (!event.location.street_address) {
      event.location.street_address = { test: 'test' }
    } */
    
    if (!event.images[0]) {
      source = require('../assets/ball-football-game-39562.jpg') // eslint-disable-line global-require
      // event.images = [{ url: 'https://images.pexels.com/photos/39562/the-ball-stadion-football-the-pitch-39562.jpeg?cs=srgb&dl=ball-football-game-39562.jpg&fm=jpg' }]
    } else {
      source = { uri: event.images[0].url }
    }
    
    return (
      <View style={styles.modal}>
        <ScrollView>
          <View style={styles.top}>
            <Image 
              style={styles.image}
              resizeMethod='auto'
              source={source}
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
        </ScrollView>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (joined) {
                if (localJoined === null) {
                  this.setState({ localJoined: false })
                } else if (localJoined === false) {
                  this.setState({ localJoined: true })
                } else if (localJoined === true) {
                  this.setState({ localJoined: false })
                }
              } else if (!joined) {
                if (localJoined === null) {
                  this.setState({ localJoined: true })
                } else if (localJoined === false) {
                  this.setState({ localJoined: true })
                } else if (localJoined === true) {
                  this.setState({ localJoined: false })
                }
              }
            
              storeOwnEvent(event)
            }}
          >
            <Text style={styles.buttonText}>
              {
                joined 
                  ? localJoined === false ? 'Add to my event list' : 'Remove from my events list'
                  : localJoined === true ? 'Remove from my events list' : 'Add to my event list' /* eslint no-nested-ternary: 0 */
              } 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log('close pressed')
            }}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    // margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#00000012',
    // backgroundColor: '#f9f9f9',
  },
  title: {
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
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
