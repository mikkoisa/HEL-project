import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback, Alert } from 'react-native'
import FormOne from './FormOne'
import FormTwo from './FormTwo'
import PostData from '../../util/FetchPostJSON'
import ApiUrls from '../../constants/config'

class CreateScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneHidden: false,
      twoHidden: true,

      keyboard: false,

      newLocation: null,

      // Form data
      name: null,
      shortDescription: null,
      description: null,
      minAge: null,
      maxAge: null,
      date: { day: null, month: null, year: null },
      time: { hour: null, minute: null },
      pickedLocation: { lat: 60.1695291, lng: 24.9383613 },
      nameError: null,
      shortError: null,
      descError: null,
      ageError: null,
      dateError: null,
      timeError: null,
    }
  }

  moveKeyboard = (state) => {
    this.setState({ keyboard: state })
  }

  submitEvent = () => {
    const { name, shortDescription, description, date, time, minAge, maxAge } = this.state
    let { nameError, shortError, descError, ageError, dateError, timeError } = this.state
    
    if (!name) {
      nameError = 'Required' 
      this.setState({ nameError: 'Required' })
    }
    if (!shortDescription) {
      shortError = 'Required' 
      this.setState({ shortError: 'Required' })
    }
    if (!description) {
      descError = 'Required' 
      this.setState({ descError: 'Required' })
    }
    if (!minAge || !maxAge) {
      ageError = 'Required' 
      this.setState({ ageError: 'Required' })
    }
    if (!date.year) {
      dateError = 'Required' 
      this.setState({ dateError: 'Required' })
    }
    if (!time.hour) {
      timeError = 'Required' 
      this.setState({ timeError: 'Required' })
    }

    if (!nameError && !shortError && !descError && !ageError && !dateError && !timeError) {
      this.postEvent()
    } else {
      Alert.alert(
        'Error',
        'Required fields missing!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      )
      this.setState({ twoHidden: true, oneHidden: false })
    }
  }

  postEvent = () => {
    const { name, shortDescription, description, 
      date, time, pickedLocation, minAge, maxAge } = this.state

    const formData = {
      name: {
        fi: name,
      },
      keywords: [
        { '@id': 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/keyword/yso:p916/' },
        { '@id': 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/keyword/yso:p6409/' },
      ],
      short_description: {
        fi: shortDescription,
      },
      offers: [{
        price: {
          fi: 0,
        },
        is_free: true,
      }],
      description: {
        fi: description,
      },
      start_time: `20${date.year}-${date.month}-${date.day}T${time.hour}:${time.minute}:00.222Z`,
      end_time: `20${date.year}-${date.month}-${date.day}T${time.hour}:${time.minute}:00.222Z`,
      location: {
        '@id': 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/place/tprek:7256/',
      },
      custom_data: { lat: pickedLocation.lat, lng: pickedLocation.lng, locationName: 'Location name' },
      publication_status: 'public',
      audience_min_age: minAge,
      audience_max_age: maxAge,
    }

    console.log(formData)
    
    // Posts the event to api
    PostData(ApiUrls.postEvent, formData, this.refreshForm)
  }

  getCoordinates = (coordinates) => {
    console.log(coordinates)
  }

  refreshForm = (event) => {
    this.setState({
      oneHidden: false,
      twoHidden: true,
      name: null,
      shortDescription: null,
      description: null,
      minAge: null,
      maxAge: null,
      date: { day: null, month: null, year: null },
      time: { hour: null, minute: null },
      pickedLocation: { lat: 60.1695291, lng: 24.9383613 },
      nameError: null,
      shortError: null,
      descError: null,
      ageError: null,
      dateError: null,
      timeError: null,
    })
    const { handleNavigation } = this.props
    handleNavigation('Map', event)
  }

  saveText = (type, text) => {
    const { name, shortDescription, description, minAge, maxAge } = this.state
    if (type === 'name') {
      if (text === 'ended') {
        if (name === null || !name.trim()) {
          this.setState({ nameError: 'Required' })
        }
      } else {
        this.setState({ nameError: null })
        this.setState({ name: text }) 
      }
    } else if (type === 'shortDescription') {
      if (text === 'ended') {
        if (shortDescription === null || !shortDescription.trim()) {
          this.setState({ shortError: 'Required' })
        }
      } else {
        this.setState({ shortError: null })
        this.setState({ shortDescription: text }) 
      }
    } else if (type === 'description') {
      if (text === 'ended') {
        if (description === null || !description.trim()) {
          this.setState({ descError: 'Required' })
        }
      } else {
        this.setState({ descError: null })
        this.setState({ description: text }) 
      }
    } else if (type === 'minAge' || type === 'maxAge') {
      if (text === 'ended') {
        if (minAge === null || maxAge === null || !minAge.trim() || !maxAge.trim()) {
          this.setState({ ageError: 'Both fields required' })
        } else if (!minAge.match(/^[0-9]+$/)) {
          this.setState({ ageError: 'Only numbers allowed' })
        } else if (parseInt(maxAge, 10) < parseInt(minAge, 10)) {
          this.setState({ ageError: 'Max is lower than min' })
        } else {
          this.setState({ ageError: null })
        }
      } else if (type === 'minAge') {
        this.setState({ minAge: text }) 
      } else if (type === 'maxAge') {
        this.setState({ maxAge: text }) 
      }
    }
  }

  saveDate = (year, month, day) => {
    const { time } = this.state
    this.validateDate(year, month, day)
    const adjustedMonth = month + 1
    this.setState({ date: { year, month: adjustedMonth, day } })
    if (time.hour) {
      this.validateTime(time.hour, time.minute)
    }
  }

  saveTime = (hour, minute) => {
    this.validateTime(hour, minute)
    this.setState({ time: { hour, minute } })
  }

  validateDate = (year, month, day) => {
    const today = new Date();
    const thisYear = parseInt(today.getFullYear(), 10)
    const thisMonth = parseInt(today.getMonth(), 10)
    const thisDay = parseInt(today.getDate(), 10)

    if (year < thisYear) {
      this.setState({ dateError: 'Event can\'t be in the past' })
    } else if (month < thisMonth && year <= thisYear) {
      this.setState({ dateError: 'Event can\'t be in the past' })
    } else if (day < thisDay && year <= thisYear) {
      this.setState({ dateError: 'Event can\'t be in the past' })
    } else {
      this.setState({ dateError: null })
    }
  }

  validateTime = (hour, minute) => {
    const { date } = this.state
    console.log(date.year)
    if (date.year && date.month && date.day) {
      date.year = parseInt(`20${date.year}`, 10)
    }
    const today = new Date();

    if (
      date.year === parseInt(today.getFullYear(), 10) 
      && parseInt(date.month, 10) === parseInt(today.getMonth() + 1, 10) 
      && parseInt(date.day, 10) === parseInt(today.getDate(), 10)
    ) {
      if (parseInt(hour, 10) < today.getHours()) {
        this.setState({ timeError: 'Event can\'t be in the past' })
      } else if (parseInt(hour, 10) === today.getHours() && minute <= today.getMinutes()) {
        this.setState({ timeError: 'Event can\'t be in the past' })
      } else {
        this.setState({ timeError: null })
      }
    } else {
      this.setState({ timeError: null })
    }
  }

  moveMap = (location, type) => {
    if (type === 'move') {
      console.log(location) 
      this.setState({ pickedLocation: { lat: location.latitude, lng: location.longitude } })
    } else if (type === 'newLocation') {
      console.log('moving small map')
      this.setState({ newLocation: location })
    } else {
      this.setState({ pickedLocation: location })
    } 
    this.setState({ newLocation: null })
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
    const { pickedLocation, newLocation, oneHidden, twoHidden,
      name, shortDescription, description, date, time, minAge, maxAge,
      nameError, shortError, descError, dateError, timeError, ageError, keyboard } = this.state
    const { position } = this.props
    console.log(keyboard)
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
          formData={{ 
            name, shortDescription, description, date, time, minAge, maxAge,
            nameError, shortError, descError, dateError, timeError, ageError, 
            /* eslint object-property-newline : 0 */
          }}
          hidden={oneHidden}
          moveKeyboard={this.moveKeyboard}
          keyboard={keyboard}
          saveText={this.saveText}
          saveDate={this.saveDate}
          saveTime={this.saveTime}
          changeTab={this.changeToTabTwo}
        />
        <FormTwo
          position={position}
          newLocation={newLocation}
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
    paddingTop: '7%',
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
