import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, View, StyleSheet, DatePickerAndroid, TimePickerAndroid, TouchableWithoutFeedback } from 'react-native'

class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateFocused: false,
      timeFocused: false,
    }
  }

  dateFocus = () => {
    this.setState({ dateFocused: true })
    this.askDate()
  }

  dateUnFocus = () => {
    this.setState({ dateFocused: false })
  }

  timeFocus = () => {
    this.setState({ timeFocused: true })
    this.askTime()
  }

  timeUnFocus = () => {
    this.setState({ timeFocused: false })
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
        this.dateUnFocus()
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.log(message);
    }
  }

  askTime = async () => {
    try {
      const { action /* , hour, minute */ } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        this.timeUnFocus()
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  render() {
    const { dateFocused, timeFocused } = this.state
    return (
      <View style={styles.container}>
        <View style={dateFocused ? styles.textFieldFocused : styles.textField}>
          <TouchableWithoutFeedback onPress={this.dateFocus}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            >
              <Icon
                style={styles.icon}
                name='calendar'
                size={18}
              />
              <Text style={styles.content}>
                00/00/00
              </Text>
              
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.label}>
          <Text 
            style={dateFocused ? styles.labelTextFocused : styles.labelText}
          >
            Date
          </Text>
        </View>
        <View style={timeFocused ? styles.textFieldFocused : styles.textField}>
          <TouchableWithoutFeedback onPress={this.timeFocus}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
            >
              <Icon
                style={styles.icon}
                name='clock-o'
                size={18}
              />
              <Text style={styles.content}>
                00:00
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.labelRight}>
          <Text 
            style={timeFocused ? styles.labelTextFocused : styles.labelText}
          >
            Time
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomColor: '#00000040',
    // borderBottomWidth: 1,
    // marginBottom: 5,
  },
  textField: {
    // backgroundColor: '#00000012',
    // height: 40,
    width: '45%',
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 3,
    paddingLeft: 7,
    paddingRight: 10,
    paddingVertical: 5,
    marginVertical: 15,
    justifyContent: 'center',
  },
  textFieldFocused: {
    // height: 40,
    width: '45%',
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 3,
    paddingLeft: 7,
    paddingRight: 10,
    paddingVertical: 5,
    marginVertical: 15,
    justifyContent: 'center',
  },
  content: {
    color: '#00000040',
    padding: 5,
  },
  icon: {
    color: '#00000087',
    padding: 6,
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
    top: 5,
    left: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  labelRight: {
    position: 'absolute',
    alignItems: 'center',
    top: 5,
    right: 50,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  labelText: {
    color: '#00000060',
  },
  labelTextFocused: {
    color: '#f57c00',
  },
})

export default CustomDatePicker
