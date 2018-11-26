import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import FormOne from './FormOne'
import FormTwo from './FormTwo'

class CreateScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneHidden: false,
      twoHidden: true,

      name: '',
      shortDescription: '',
      description: '',
      minAge: '',
      maxAge: '',
      date: { year: '00', month: '00', day: '00' },
      time: { hour: '00', minute: '00' },
      pickedLocation: { lat: 60.1695291, lng: 24.9383613 },

      // latText: null,
      // lngText: null,
      // marker: { latitude: 60.1695291, longitude: 24.9383613 },
    }
  }

  submitEvent = () => {
    const { name, shortDescription, description, 
      date, time, pickedLocation, minAge, maxAge } = this.state

    console.log(date.year, date.month, date.day)
    console.log(time.hour, time.minute)
    const adjustedMonth = date.month - 1
    const adjustedHour = time.hour + 2
    const newDate = new Date(date.year, adjustedMonth, date.day, adjustedHour, time.minute)

    console.log(newDate)
    
    console.log(name, shortDescription, description, 
      newDate, pickedLocation, minAge, maxAge)
  }

  getCoordinates = (coordinates) => {
    console.log(coordinates)
  }

  saveText = (type, text) => {
    if (type === 'name') {
      this.setState({ name: text })
    } else if (type === 'shortDescription') {
      this.setState({ shortDescription: text })
    } else if (type === 'description') {
      this.setState({ description: text })
    } else if (type === 'minAge') {
      this.setState({ minAge: text })
    } else if (type === 'maxAge') {
      this.setState({ maxAge: text })
    }
  }

  saveDate = (year, month, day) => {
    console.log(day, month, year)
    const adjustedMonth = month + 1
    this.setState({ date: { year, month: adjustedMonth, day } })
  }

  saveTime = (hour, minute) => {
    console.log(hour, minute)
    this.setState({ time: { hour, minute } })
  }

  moveMap = (location, type) => {
    if (type === 'move') {
      console.log(location)
      this.setState({ pickedLocation: { lat: location.latitude, lng: location.longitude } })
    } else {
      this.setState({ pickedLocation: location })
    }  
  }

  changeToTabTwo = () => {
    this.setState({
      oneHidden: true,
      twoHidden: false,
    })
  }

  changeToTabOne = () => {
    this.setState({
      oneHidden: false,
      twoHidden: true,
    })
  }


  render() {
    const { pickedLocation, oneHidden, twoHidden,
      name, shortDescription, description, date, time, minAge, maxAge } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Create Event</Text>
        <View style={styles.tabTitles}>
          <TouchableWithoutFeedback onPress={this.changeToTabOne}>
            <View style={{ width: '50%' }}>
              <Text style={oneHidden ? styles.title : styles.titleFocused}>Information</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.changeToTabTwo}>
            <View style={{ width: '50%' }}>
              <Text style={twoHidden ? styles.title : styles.titleFocused}>Location</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <FormOne 
          name={name}
          shortDescription={shortDescription}
          description={description}
          hidden={oneHidden}
          saveText={this.saveText}
          saveDate={this.saveDate}
          saveTime={this.saveTime}
          changeTab={this.changeToTabTwo}
          date={date}
          time={time}
          minAge={minAge}
          maxAge={maxAge}
        />
        <FormTwo
          hidden={twoHidden}
          pickedLocation={pickedLocation} 
          moveMap={this.moveMap}
          submitEvent={this.submitEvent}
          changeTab={this.changeToTabOne}
        />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabTitles: {
    paddingHorizontal: '15%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleFocused: {
    // flex: 1,
    // width: '50%',
    textAlign: 'center',
    // paddingHorizontal: '5%',
    // marginHorizontal: '5%',
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#f57c00',
    borderBottomWidth: 1,
    borderBottomColor: '#f57c00',
  },
  title: {
    // flex: 1,
    // width: '50%',
    textAlign: 'center',
    // paddingHorizontal: '5%',
    // marginHorizontal: '5%',
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#00000087',
  },
  pageTitle: {
    paddingBottom: '5%',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'sans-serif',
    color: '#00000087',
  }, 
})

export default CreateScreen
