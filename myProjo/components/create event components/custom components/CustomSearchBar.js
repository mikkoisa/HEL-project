import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
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

  componentWillUnmount = () => {
  }

  render() {
    const { title, moveMap } = this.props
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
              placeholder='Search for location or address'
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
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                textInput: {
      
                },
              }}
              autoFocus={false}
              
              onBlur={this.unFocus}
              returnKeyType="search" 
              listViewDisplayed='false'
              fetchDetails
              onPress={(data, details = null) => { 
                moveMap(details.geometry.location, 'newLocation')
              }}

              minLength={2} // minimum length of text to search
              getDefaultValue={() => ''}
              nearbyPlacesAPI='GooglePlacesSearch'

              query={{
                location: '60.1695291,24.9383613',
                radius: 500,
                key: 'API KEY HERE',
              }}
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'sport',
              }}

              debounce={0}
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
  searchBar: {
  },
  textField: {
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 3,
    paddingRight: '3%',
    marginVertical: '5%',
  },
  textFieldFocused: {
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
