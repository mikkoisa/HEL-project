import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomTextInput from './CustomTextInput'
import CustomDatePicker from './CustomDatePicker'

const FormOne = (props) => {
  const { hidden, saveText, saveDate, saveTime, changeTab,
    name, shortDescription, description, date, time, minAge, maxAge } = props
  if (hidden) {
    return null
  }
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.form}/* keyboardShouldPersistTaps='always' */
    >
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
        styleLabel={{ top: '12%' }}
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
      />

      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-start' }}>
        <CustomTextInput 
          style={{ width: 70, justifyContent: 'center', marginVertical: 0, paddingLeft: '27%' }}
          styleLabel={{ top: '-8%', left: '12%', paddingHorizontal: '12%' }}
          value={minAge}
          title='Age'
          placeholder='Min'
          id='minAge'
          keyType='numeric'
          saveText={saveText}
        />
        <Text centerText='true' style={{ marginVertical: '5%', marginRight: '3%' }}> - </Text>
        <CustomTextInput
          style={{ width: 70, justifyContent: 'center', marginVertical: 0, paddingLeft: '26%' }}
          styleLabel={{ width: 0 }}
          // title='Max age'
          value={maxAge}
          placeholder='Max'
          id='maxAge'
          keyType='numeric'
          saveText={saveText}
        />
      </View>
      <TouchableOpacity
        style={styles.nextbutton}
        title='Change tab'
        onPress={
          changeTab
        }
      >
        <Icon
          style={{ color: '#f57c00' }}
          name='arrow-circle-right'
          size={30}
        />
      </TouchableOpacity>

    </ScrollView>
  ) 
}

const styles = StyleSheet.create({
  form: {
    paddingTop: '2%',
    paddingBottom: '15%',
    paddingHorizontal: '15%',
  },
  nextbutton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    // marginRight: '15%',
    //  marginBottom: '5%',
    width: '11%',
    height: '11%',
    // backgroundColor: '#f57c00',
    paddingBottom: '10%',
    borderRadius: 50,
  },
})

export default FormOne
