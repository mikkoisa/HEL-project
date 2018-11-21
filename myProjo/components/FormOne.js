import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import CustomTextInput from './CustomTextInput'
import CustomDatePicker from './CustomDatePicker'

const FormOne = (props) => {
  const { hidden, saveText, saveDate, saveTime, name, shortDescription, description } = props
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
        id='name'
        value={name}
        saveText={saveText}
      />
      <CustomTextInput
        title='Short description'
        placeholder='Short description of the event'
        saveText={saveText}
        id='shortDescription'
        value={shortDescription}
      />
      <CustomTextInput
        title='Description'
        placeholder='Event Description'
        saveText={saveText}
        multiline
        lines={4}
        id='description'
        value={description}
      />

      <View style={{ flexDirection: 'row' }}>
        <CustomTextInput 
          style={{ width: '25%' }}
          title='Age'
          placeholder='Min age'
        />
        <Text> - </Text>
        <CustomTextInput
          style={{ width: '50%' }}
          title='Age'
          placeholder='Max age'
        />
      </View>
      
      <CustomDatePicker
        title='Date'
        saveDate={saveDate}
        saveTime={saveTime}
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
    paddingTop: '10%',
  },
})

export default FormOne
