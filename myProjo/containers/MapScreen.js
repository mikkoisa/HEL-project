import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { Text, View, StyleSheet } from 'react-native'

class MapScreen extends React.Component{

render() {
    return (
      <View style={styles.container}>
        <Text>Map comes here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7'
  }
})

  export default MapScreen