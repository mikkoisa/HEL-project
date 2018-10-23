import React from 'react'
import { Text, View, StyleSheet, Button, Dimensions} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';

const {height} = Dimensions.get('window')

class ListScreen extends React.Component{
  

render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

  export default ListScreen