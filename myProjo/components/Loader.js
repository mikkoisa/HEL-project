import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

export default () => (
  <View>
    {/* <StatusBar hidden />
    <TopBar customStyle={{ height: '8.5%' }} buttonDisabled /> } */}
    <View style={styles.loader}>
      <ActivityIndicator animating size={70} color="#f57c00" />
    </View>
  </View>
)

const styles = StyleSheet.create({
  loader: {
    marginVertical: '75%',
    height: 50,
  },
})
