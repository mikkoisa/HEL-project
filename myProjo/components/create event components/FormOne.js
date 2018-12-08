import React from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomTextInput from './custom components/CustomTextInput'
import CustomDatePicker from './custom components/CustomDatePicker'
import CusomAgeInput from './custom components/CustomAgeInput'

const FormOne = (props) => {
  const { hidden, saveText, saveDate, saveTime, changeTab,
    formData } = props
  if (hidden) {
    return null
  }
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.form} 
      keyboardShouldPersistTaps='always'
    >
      <CustomTextInput
        title='Event name'
        placeholder='Event name'
        saveText={saveText}
        id='name'
        keyType='default'
        value={formData.name}
        error={formData.nameError}
      />
      <CustomTextInput
        title='Short description'
        placeholder='Short description of the event'
        saveText={saveText}
        id='shortDescription'
        keyType='default'
        value={formData.shortDescription}
        error={formData.shortError}
      />
      <CustomTextInput
        styleLabel={{ top: 1 }}
        title='Description'
        placeholder='Event Description'
        saveText={saveText}
        multiline
        lines={3}
        id='description'
        keyType='default'
        value={formData.description}
        error={formData.descError}
      />
      
      <CustomDatePicker
        date={formData.date}
        time={formData.time}
        title='Date'
        saveDate={saveDate}
        saveTime={saveTime}
        errorDate={formData.dateError}
        errorTime={formData.timeError}
      />
      <CusomAgeInput
        saveText={saveText}
        valueMin={formData.minAge}
        valueMax={formData.maxAge}
        error={formData.ageError}
      />
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
    paddingBottom: '5%',
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
