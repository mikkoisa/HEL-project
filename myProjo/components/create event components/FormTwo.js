import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView from 'react-native-maps'
import CustomSearchBar from './custom components/CustomSearchBar'


class FormTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    const { hidden, moveMap, newLocation, submitEvent, changeTab, position } = this.props
    if (hidden) {
      return null
    }
    return (
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.form} 
        keyboardShouldPersistTaps='always'
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
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02, 
            }}
            region={newLocation ? { 
              latitude: newLocation.lat,
              longitude: newLocation.lng,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            } : {
              // If no locaton searched, show initial region
            }}
             
            onRegionChangeComplete={(region) => {
              // When user has moved map, send location to form
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
            <Text style={{ color: '#ffffff', fontSize: 17, fontFamily: 'sans-serif' }}>
              { 'Create ' }
              <Icon
                style={{ color: '#ffffff' }}
                name='plus'
                size={17}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
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
  },
  map: {
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
    borderRadius: 50,
  },
  createButton: {
    justifyContent: 'center', 
    alignItems: 'center',    
    backgroundColor: '#f57c00',
    borderRadius: 4,
    width: '30%',
    height: '50%',
  },
})

export default FormTwo
