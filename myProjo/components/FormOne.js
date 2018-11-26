import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import CustomTextInput from './CustomTextInput'
import CustomDatePicker from './CustomDatePicker'

const FormOne = (props) => {
  const { hidden, saveText, saveDate, saveTime,
    name, shortDescription, description, date, time, minAge, maxAge } = props
  if (hidden) {
    return null
  }
  return (
    <ScrollView style={styles.form}/* keyboardShouldPersistTaps='always' */>
      <Text style={styles.title}>Event information</Text>
      <CustomTextInput
        title='Event name'
        placeholder='Event name'
        saveText={saveText}
        id='name'
        keyType='default'
        value={name}
      />
      <CustomTextInput
        title='Short description'
        placeholder='Short description of the event'
        saveText={saveText}
        id='shortDescription'
        keyType='default'
        value={shortDescription}
      />
      <CustomTextInput
        title='Description'
        placeholder='Event Description'
        saveText={saveText}
        multiline
        lines={4}
        id='description'
        keyType='default'
        value={description}
      />
      
      <CustomDatePicker
        date={date}
        time={time}
        title='Date'
        saveDate={saveDate}
        saveTime={saveTime}
        multiline
      />

      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <CustomTextInput 
          style={styles.ageInput}
          value={minAge}
          title='Age'
          placeholder='Min'
          id='minAge'
          keyType='numeric'
          saveText={saveText}
        />
        <Text style={{ marginHorizontal: 12, marginVertical: 25 }}> - </Text>
        <CustomTextInput
          style={styles.ageInput}
          // title='Max age'
          value={maxAge}
          placeholder='Max'
          id='maxAge'
          keyType='numeric'
          saveText={saveText}
        />
      </View>

    </ScrollView>
  ) 
}

const styles = StyleSheet.create({
  ageInput: {
    width: 70,
  },
  title: {
    paddingBottom: '5%',
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
