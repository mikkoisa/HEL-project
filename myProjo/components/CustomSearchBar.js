import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class CustomSearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  unFocus = () => {
    this.setState({ focused: false })
  }

  render() {
    const { saveText, title, placeholder, multiline, moveMap } = this.props
    const { focused } = this.state
    return (
      <View>
        <View style={focused ? styles.textFieldFocused : styles.textField}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          >
            <GooglePlacesAutocomplete
              // style={{ color: '#00000087', width: '100%' }}
              placeholder='Search for location or address'
            /* styles={{
              container: {
                alignItems: 'center',
                margin: 0,
                padding: 0,
                // height: 40,
              },
              textInputContainer: {
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                paddingTop: 3,
                margin: 0,
                height: 30,
              },
              textInput: {
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 6,
                paddingBottom: 6,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
              },
            }} */
              styles={{
                container: {
                  
                },
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  
                  width: '100%',
                  
                },
                description: {
                  // fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                textInput: {
                  // flex: 1,
                  // justifyContent: 'flex-start',
                  
                },
              }}
              autoFocus={false}
              // underlineColorAndroid='transparent'
              // multiline={multiline}
              onFocus={this.onFocus}
              onBlur={this.unFocus}
              // onChangeText={text => saveText(text)}
              returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='false' // true/false/undefined
              fetchDetails
              // renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(details.geometry.location);
                // this.setState({ pickedLocation: details.geometry.location })
                moveMap(details.geometry.location)
              }}

              minLength={2} // minimum length of text to search
              getDefaultValue={() => ''}
              nearbyPlacesAPI='GooglePlacesSearch'

              query={{
                location: '60.1695291,24.9383613',
                radius: 500,
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'API KEY HERE',
              // language: 'en', // language of the results
              // types: '(geocode)', // default: 'geocode'
              }}
              GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'sport',
              }}

              debounce={200}
              // renderRightButton={() => <Text>Custom text after the input</Text>}
            />
            
          </View>
          
        </View>
        <View style={styles.label}>
          <Text 
            style={focused ? styles.labelTextFocused : styles.labelText}
          >
            {title}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textField: {
    // backgroundColor: '#00000012',
    // height: 40,
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 3,
    paddingLeft: 7,
    paddingVertical: 5,
    marginVertical: 15,
  },
  textFieldFocused: {
    // height: 40,
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 3,
    paddingLeft: 7,
    paddingVertical: 5,
    marginVertical: 15,
  },
  icon: {
    color: '#00000087',
    padding: 6,
  },
  label: {
    position: 'absolute',
    alignItems: 'center',
    top: 5,
    left: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  labelText: {
    color: '#00000060',
  },
  labelTextFocused: {
    color: '#f57c00',
  },
})

export default CustomSearchBar
