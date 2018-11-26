import React from 'react'
import { View, StyleSheet, DatePickerAndroid, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TopBar from './TopBar'
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
      pickedLocation: { latitude: 60.1695291, longitude: 24.9383613 },

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

  moveMap = (location) => {
    this.setState({ pickedLocation: location })
  }

  changeTab = () => {
    const { oneHidden } = this.state
    if (!oneHidden) {
      this.setState({
        oneHidden: true,
        twoHidden: false,
      })
    } else {
      this.setState({
        oneHidden: false,
        twoHidden: true,
      })
    }
  }

  askDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        mode: 'default',
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day);
        console.log(newDate)
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.log(message);
    }
  }

  render() {
    const { pickedLocation, oneHidden, twoHidden,
      name, shortDescription, description, date, time, minAge, maxAge } = this.state
    return (
      <View style={styles.container}>
        <TopBar />
        <FormOne 
          name={name}
          shortDescription={shortDescription}
          description={description}
          hidden={oneHidden}
          saveText={this.saveText}
          saveDate={this.saveDate}
          saveTime={this.saveTime}
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
        />
        <TouchableOpacity
          style={twoHidden ? styles.nextbutton : styles.prevbutton}
          title='Change tab'
          onPress={
            this.changeTab
          }
        >
          <Icon
            style={{ color: '#f57c00' }}
            name={twoHidden ? 'arrow-circle-right' : 'arrow-circle-left'}
            size={30}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  nextbutton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: '15%',
    marginBottom: '5%',
    width: '10%',
    height: '10%',
    // backgroundColor: '#f57c00',
    borderRadius: 50,
  },
  prevbutton: {
    alignItems: 'center',
    marginLeft: '15%',
    marginBottom: '15%',
    width: '10%',
    height: '10%',
    // backgroundColor: '#f57c00',
    borderRadius: 50,
  },
})

export default CreateScreen
