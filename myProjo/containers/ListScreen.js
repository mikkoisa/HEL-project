import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

class ListScreen extends React.Component{

render() {
    return (
      <View style={styles.container}>
        <Text>List comes here</Text>
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

  export default ListScreen