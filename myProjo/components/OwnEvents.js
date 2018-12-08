import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'

const OwnEvents = props => (
  <View style={styles.container}>
    <Text style={styles.title}>Own events</Text>
    <FlatList
      style={styles.list}
      data={props.eventList}
          // onScrollBeginDrag={() => this.onSwipeUp()}
          // onMomentumScrollEnd={() => this.onSwipeDown()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>
            {item.name.fi}
          </Text>
          <Text>
            {item.start_time}
          </Text>
        </View>
      )}
      keyExtractor={event => `${event.id}`}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingTop: '7%',
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: '#00000087',
    marginBottom: '5%',
  },
  list: {
    borderTopWidth: 1,
    borderColor: '#00000087',
  },
  item: {
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    borderBottomWidth: 1,
    borderColor: '#00000087',
  },
})

export default OwnEvents
