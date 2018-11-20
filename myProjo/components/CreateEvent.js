import React from 'react'
import { View, StyleSheet, Button, DatePickerAndroid } from 'react-native'
import TopBar from './TopBar'
import FormOne from './FormOne'
import FormTwo from './FormTwo';

class CreateScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneHidden: false,
      twoHidden: true,

      name: '',
      shortDescription: '',
      description: '',

      pickedDate: '',
      pickedTime: '',
      pickedLocation: { latitude: 60.1695291, longitude: 24.9383613 },

      // latText: null,
      // lngText: null,
      // marker: { latitude: 60.1695291, longitude: 24.9383613 },
    }
  }

  submitEvent = () => {
    const { name, shortDescription, description, 
      pickedDate, pickedTime, pickedLocation } = this.state
    
    console.log(name, shortDescription, description, 
      pickedDate, pickedTime, pickedLocation)
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
    }
  }

  saveDate = (date) => {
    this.setState({ pickedDate: date })
  }

  saveTime = (time) => {
    this.setState({ pickedTime: time })
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
      name, shortDescription, description } = this.state
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
        />
        <FormTwo 
          hidden={twoHidden}
          pickedLocation={pickedLocation}
        />
        <Button 
          title='Change tab' 
          onPress={
            this.changeTab
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})

export default CreateScreen
