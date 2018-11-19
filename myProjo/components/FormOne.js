import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, Button, ScrollView, DatePickerAndroid } from 'react-native'
import CustomTextInput from './CustomTextInput'
import CustomDatePicker from './CustomDatePicker'
import CustomSearchBar from './CustomSearchBar'

const FormOne = (props) => {
  const { hidden, saveText } = props
  if (hidden) {
    return null
  }
  return (
    <ScrollView style={styles.form}/* keyboardShouldPersistTaps='always' */>
      <Text style={styles.title}>
            Event information
      </Text>
      <CustomTextInput
        title='Event name'
        placeholder='Event name'
        saveText={saveText}
      />
      <CustomTextInput
        title='Short description'
        placeholder='Short description of the event'
        saveText={saveText}
      />
      <CustomTextInput
        title='Description'
        placeholder='Event Description'
        saveText={saveText}
        multiline
        lines={4}
      />
      <CustomDatePicker
        title='Date'
        saveText={saveText}
        multiline
      />
      <View style={{ borderTopWidth: 1, borderTopColor: '#00000040', marginVertical: 15 }} />

    </ScrollView>
  ) 
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#00000087',
  },
  form: {
    paddingHorizontal: '15%',
    paddingVertical: '10%',
  },
})

export default FormOne
