import React from 'react'
import { View, StyleSheet, Button, DatePickerAndroid } from 'react-native'
import moment from 'moment'
import TopBar from './TopBar'
import FormOne from './FormOne'
import FormTwo from './FormTwo';

class CreateScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oneHidden: false,
      twoHidden: true,
      pickedDate: moment().format(),
      pickedLocation: { latitude: 60.1695291, longitude: 24.9383613 },
      // latText: null,
      // lngText: null,
      titleText: null,
      descText: null,
      marker: { latitude: 60.1695291, longitude: 24.9383613 },
    }
  }

  submitEvent = () => {
    const { titleText, descText, marker } = this.state
    // console.log(this.form.getValues())
    console.log(titleText + descText + marker)
  }

  getCoordinates = (coordinates) => {
    console.log(coordinates)
  }

  saveText = (text) => {
    console.log(text)
    this.setState({ titleText: text })
  }

  moveMap = (location) => {
    // this.setState({ pickedLocation: location })
    console.log(location)
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
    const { /* marker, */ pickedDate, /* pickedLocation, */ oneHidden, twoHidden } = this.state
    console.log(pickedDate)
    return (
      <View style={styles.container}>
        <TopBar />
        <FormOne hidden={oneHidden} />
        <FormTwo hidden={twoHidden} />
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
