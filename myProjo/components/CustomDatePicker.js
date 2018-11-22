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
    const { saveDate } = this.props
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        mode: 'default',
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        saveDate(year, month, day)
        this.dateUnFocus()
      }
      this.dateUnFocus()
    } catch ({ code, message }) {
      console.log(message);
    }
  }

  askTime = async () => {
    const { saveTime } = this.props
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        saveTime(hour, minute)
        this.timeUnFocus()
      }
      this.timeUnFocus()
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  render() {
    const { dateFocused, timeFocused } = this.state
    const { date, time } = this.props
    time.hour = (`0${time.hour}`).slice(-2);
    time.minute = (`0${time.minute}`).slice(-2);
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
                {date.day}
                /
                {date.month}
                /
                {date.year}
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
                {time.hour}
                :
                {time.minute}
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
    paddingVertical: 5,
    paddingRight: 15,
    paddingLeft: 5,
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
    right: 70,
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
