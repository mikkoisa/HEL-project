import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'
import moment from 'moment'
import 'moment/locale/en-gb'
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
    console.log(event.description[Object.keys(event.description)[0]])
    // const event = params.event
    // const { ownEvents } = event.ownEvents
    // console.log(ownEvents)
    // moment.locale('en-gb')  
    console.log(moment(event.start_time).locale('en-gb').format('LLLL'))
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
          <Text style={styles.dateTime}>{moment(event.start_time).locale('en-gb').format('LLLL')}</Text>
          <Text style={styles.textfield}>
            {event.short_description[Object.keys(event.short_description)[0]]}
          </Text>
          <HTMLView 
            value={event.description[Object.keys(event.description)[0]]} 
            style={styles.description}
            textComponentProps={{ style: { color: '#00000099', fontSize: 14 } }}
          />
          <Text style={[styles.dateTime, { marginTop: '3%' }]}>
            {'Ages:'}
          </Text>
          <Text style={{ marginHorizontal: '8%' }}>
            {event.audience_min_age ? event.audience_min_age : '0' }
            {' - '}
            {event.audience_max_age ? event.audience_max_age : '99'}
          </Text>
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
                  ? localJoined === false ? 'ADD TO MY EVENTS' : 'REMOVE FORM MY EVENTS'
                  : localJoined === true ? 'REMOVE FORM MY EVENTS' : 'ADD TO MY EVENTS' /* eslint no-nested-ternary: 0 */
              } 
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginHorizontal: '6%',
    paddingTop: '8%',
    // margin: 5,
    // borderBottomWidth: 1,
    borderBottomColor: '#00000012',
    color: '#000000de',
    fontSize: 14,
    // backgroundColor: '#f9f9f9',
  },
  description: {
    marginHorizontal: '6%',
    paddingVertical: 15,
    // margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#00000012',
    // color: '#00000099',
    // backgroundColor: '#f9f9f9',
  },
  title: {
    marginHorizontal: '6%',
    paddingTop: 10,
    fontSize: 24,
    fontFamily: 'Roboto',
    // fontWeight: 'bold',
    // textAlign: 'center', 
    color: '#f57c00',
  },
  buttonText: {
    textAlign: 'center', 
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    // fontFamily: 'Rubik',
  },
  button: {
    paddingVertical: '3%',
    marginTop: '10%',
    // margin: '6%',
    marginHorizontal: '15%',
    // width: '90%',
    borderRadius: 5,
    // shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#f57c00',
    // alignItems: 'center',
    //  justifyContent: 'center',
  },
  dateTime: {
    marginHorizontal: '6%',
    fontSize: 12,
    color: '#00000099',
    // paddingVertical: 15,
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
