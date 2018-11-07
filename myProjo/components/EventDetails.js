import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

class EventDetails extends React.Component {
  render() {
    const { event } = this.props
    // console.log(event)

    return (
      <View style={styles.modal}>
        <ScrollView>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.textfield}>{event.shortDescription}</Text>
          <Text style={styles.textfield}>{event.description}</Text>
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
  event: { title: 'Event' },
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 2,
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 20,
    elevation: 1,
  },
  textfield: {
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    textAlign: 'center', 
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
  bottom: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default EventDetails
