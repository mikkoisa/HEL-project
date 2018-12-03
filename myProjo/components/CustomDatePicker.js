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
    const { saveDate, date } = this.props
    const placeholder = new Date()
    if (date.year) {
      placeholder.setFullYear(parseInt(`20${date.year}`, 10))
      placeholder.setMonth(date.month - 1)
      placeholder.setDate(date.day)
    }
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        mode: 'default',
        date: placeholder,
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
    const { saveTime, time } = this.props
    const today = new Date()
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: parseInt(time.hour, 10) || today.getHours() + 1,
        minute: parseInt(time.minute, 10) || 0,
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
    const { date, time, errorDate, errorTime } = this.props
    if (time.hour) {
      time.hour = (`0${time.hour}`).slice(-2)
    }
    if (time.minute) {
      time.minute = (`0${time.minute}`).slice(-2)
    }
    if (date.year) {
      date.year = (`${date.year}`).slice(-2)
    }
    if (date.month) {
      date.month = (`0${date.month}`).slice(-2)
    }
    if (date.day) {
      date.day = (`0${date.day}`).slice(-2)
    }
    return (
      <View style={styles.container}>
        <View style={
          dateFocused ? styles.textFieldFocused
            : errorDate ? styles.textFieldError : styles.textField}
           /* eslint no-nested-ternary: 0 */
        >
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
                {date.day || '00'}
                /
                {date.month || '00'}
                /
                {date.year || '00'}
              </Text>

            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.label}>
          <Text 
            style={dateFocused ? styles.labelTextFocused 
              : errorDate ? styles.labelTextError : styles.labelText}
          >
            {'Date'}
          </Text>
        </View>
        <View style={timeFocused ? styles.textFieldFocused
          : errorTime ? styles.textFieldError : styles.textField}
        >
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
                {time.hour || '00'}
                :
                {time.minute || '00'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.labelRight}>
          <Text 
            style={timeFocused ? styles.labelTextFocused
              : errorTime ? styles.labelTextError : styles.labelText}
          >
            {'Time'}
          </Text>
        </View>
        <Text style={timeFocused || dateFocused ? styles.errorTextHidden 
          : errorDate || errorTime ? styles.errorText : styles.errorTextHidden}
        >
          {errorDate || errorTime || 'Helper'}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  textField: {
    // height: 40,
    width: '45%',
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 3,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '4%',
  },
  textFieldFocused: {
    // height: 40,
    width: '45%',
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 3,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '4%',
  },
  textFieldError: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#b00020ff',
    borderRadius: 3,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginTop: '4%',
  },
  content: {
    color: '#00000040',
    padding: '6%',
  },
  icon: {
    color: '#00000087',
    padding: '6%',
  },
  errorText: {
    color: '#b00020ff',
    fontSize: 12,
    paddingLeft: '4%',
    marginBottom: '4%',
  },
  errorTextHidden: {
    color: '#ffffff',
    fontSize: 12,
    paddingLeft: '4%',
    marginBottom: '4%',
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
    top: '0%',
    left: '2.5%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
  },
  labelRight: {
    position: 'absolute',
    alignItems: 'center',
    top: '0%',
    right: '27%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
  },
  labelText: {
    color: '#00000060',
  },
  labelTextFocused: {
    color: '#f57c00',
  },
  labelTextError: {
    color: '#b00020ff',
  },
})

export default CustomDatePicker
