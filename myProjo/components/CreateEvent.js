import React from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import Form from 'react-native-form'
import MapView, { Marker } from 'react-native-maps'
// import { Marker } from 'react-native-maps'

class CreateScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latText: null,
      lngText: null,
      titleText: null,
      descText: null,
      marker: { latitude: 60.1695291, longitude: 24.9383613 },
    }
  }

  submitEvent = () => {
    const { titleText, descText, marker } = this.state
    // console.log(this.form.getValues())
    console.log(titleText + descText + marker)
  }

  getCoordinates = (coordinates) => {
    console.log(coordinates)
  }

  render() {
    const { latText, lngText, marker } = this.state
    return (
      <View style={styles.container}>
        <Form>
          <View style={styles.form}>
            <Text>Title </Text>
            <TextInput 
              onChangeText={text => this.setState({ titleText: text })}
            />
            <Text>Description </Text>
            <TextInput 
              onChangeText={text => this.setState({ descText: text })}
            />

            <View>
              <Text>Location</Text>
              <Text>
                Lat: 
                {latText}
              </Text>
              <Text>
                Lng: 
                {lngText}
              </Text>
            </View>

            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 60.1665342,
                  longitude: 24.9350733,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                onPress={e => this.setState(
                  { 
                    latText: e.nativeEvent.coordinate.latitude, 
                    lngText: e.nativeEvent.coordinate.longitude, 
                    marker: e.nativeEvent.coordinate,
                  },
                )}
              >
                <Marker
                  coordinate={marker}
                />
              </MapView>
            </View>
          </View>
        </Form>
        <Button
          onPress={this.submitEvent}
          title="Create"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
  },
  form: {

  },

  mapContainer: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    margin: '10%',
  },
  map: {
    // flex: 1,
    // justifyContent: 'center',
    // margin: '10%',
    padding: '45%',
  },
})

export default CreateScreen
