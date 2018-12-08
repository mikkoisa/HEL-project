import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

const TopBar = props => (
  <View
    style={[styles.container, props.customStyle]}
  >
    <View />
    <Image source={require('../assets/imageedit_3_4217153951.png')} /* eslint-disable-line global-require */ />   
    <TouchableOpacity 
      disabled={props.buttonDisabled} 
      style={styles.button} 
      onPress={() => { props.handleNavigation('Own') }}
    >
      <Icon
        name="user"
        color={props.buttonDisabled ? '#9b9b9b' : '#000000'}
        size={24}
      />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#00000012',
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '7%',
  },
  button: { 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
})

export default TopBar
