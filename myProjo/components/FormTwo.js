import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import CustomSearchBar from './CustomSearchBar'


const FormTwo = (props) => {
  const { hidden, moveMap, pickedLocation, submitEvent } = props
  if (hidden) {
    return null
  }
  return (
    <ScrollView style={styles.form}/* keyboardShouldPersistTaps='always' */>
      <CustomSearchBar
        title='Location'
        placeholder='Search for location or address'
        moveMap={moveMap}
      />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 60.1665342,
            longitude: 24.9350733,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          region={{
            latitude: pickedLocation.latitude,
            longitude: pickedLocation.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.createButton}
        title='Submit Event'
        onPress={
          submitEvent
        }
      >
      </TouchableOpacity>
    </ScrollView>
  ) 
}

const styles = StyleSheet.create({

  form: {
    paddingHorizontal: '15%',
    paddingTop: '10%',
  },
  mapContainer: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    // margin: '10%',
  },
  map: {
    // flex: 1,
    // justifyContent: 'center',
    // margin: '10%',
    padding: '45%',
  },
  createButton: {
    width: 100,
    height: 50,
    backgroundColor: '#f57c00',
  },
})

export default FormTwo
