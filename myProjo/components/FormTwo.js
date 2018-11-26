import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
import CustomSearchBar from './CustomSearchBar'


const FormTwo = (props) => {
  const { hidden, moveMap, pickedLocation, submitEvent, changeTab } = props
  if (hidden) {
    return null
  }
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.form}/* keyboardShouldPersistTaps='always' */
    >
      <CustomSearchBar
        title='Location'
        placeholder='Search for location or address'
        moveMap={moveMap}
      />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          region={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
          onRegionChangeComplete={(region) => {
            moveMap(region, 'move')
          }}
        />
        <Icon
          style={styles.icon}
          name='map-marker'
          size={38}
        />  
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: '10%' }}>
        <TouchableOpacity
          style={styles.prevbutton}
          title='Change tab'
          onPress={
            changeTab
          }
        >
          <Icon
            style={{ color: '#f57c00' }}
            name='arrow-circle-left'
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createButton}
          title='Submit Event'
          onPress={
            submitEvent
          }
        >
          <Text style={{ color: '#f57c00', fontSize: 17, fontFamily: 'sans-serif' }}>
            { 'Create ' }
            <Icon
              style={{ color: '#f57c00' }}
              name='plus'
              size={17}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ) 
}

const styles = StyleSheet.create({

  form: {
    paddingTop: '5%',
    paddingBottom: '15%',
    paddingHorizontal: '15%',
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
  icon: {
    position: 'absolute',
    top: '40%',
    left: '45%',
  },
  prevbutton: {
    alignItems: 'center',
    marginBottom: '15%',
    width: '11%',
    height: '50%',
    // backgroundColor: '#f57c00',
    borderRadius: 50,
  },
  createButton: {
    justifyContent: 'center', 
    alignItems: 'center',    
    width: '30%',
    height: '50%',
  },
})

export default FormTwo
