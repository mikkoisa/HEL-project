import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview'
import moment from 'moment'
import 'moment/locale/en-gb'


class EventDetails extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      localJoined: null,
    }
  }

  render() {
    const { event, storeOwnEvent, joined, handleNavigation } = this.props.navigation.state.params
    const { localJoined } = this.state
    let source = null
    moment.locale('en-gb')
    console.log(event.start_time)
    console.log(moment(event.start_time))
    
    if (!event.images[0]) {
      source = require('../assets/ball-football-game-39562.jpg') // eslint-disable-line global-require
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
          <Text style={styles.dateTime}>{moment(event.start_time).subtract(2, 'hours').locale('en-gb').format('LLLL')}</Text>
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
          <Text style={{ marginHorizontal: '8%', marginBottom: '10%' }}>
            {event.audience_min_age ? event.audience_min_age : '0' }
            {' - '}
            {event.audience_max_age ? event.audience_max_age : '99'}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.dispatch(NavigationActions.back())
              handleNavigation('Map', event.custom_data, 'Event')
            }}
          >
            <Text style={styles.buttonText}>SHOW ON MAP</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    marginHorizontal: 0,
    marginVertical: 0,
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
    borderBottomColor: '#00000012',
    color: '#000000de',
    fontSize: 14,
  },
  description: {
    marginHorizontal: '6%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#00000012',
  },
  title: {
    marginHorizontal: '6%',
    paddingTop: 10,
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#f57c00',
  },
  buttonText: {
    textAlign: 'center', 
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    paddingVertical: '3%',
    marginTop: '3%',
    marginHorizontal: '15%',
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#f57c00',
  },
  dateTime: {
    marginHorizontal: '6%',
    fontSize: 12,
    color: '#00000099',
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
