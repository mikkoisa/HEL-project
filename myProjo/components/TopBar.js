import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const TopBar = (props) => {
  const { hide } = props
  if (hide) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/imageedit_3_4217153951.png')} /* eslint-disable-line global-require */ />   
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '12%',
    borderBottomWidth: 1,
    borderColor: '#00000012',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default TopBar
