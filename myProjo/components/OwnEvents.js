import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, FlatList, Text, StyleSheet } from 'react-native'
// Own events page with list of events
const OwnEvents = props => (
  <View style={styles.container}>
    <Text style={styles.title}>My events</Text>
    <FlatList
      style={styles.list}
      data={props.eventList}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto' }}>
            {item.name.fi}
          </Text>
          <Text style={styles.itemText}>
            <Icon
              style={styles.icon}
              name='calendar'
              size={14}
            />
            {'  '}
            {item.start_time.slice(8, 10)}
            {'.'}
            {item.start_time.slice(5, 7)}
            {'.'}
            {item.start_time.slice(0, 4)}
            {'   '}
            <Icon
              style={styles.icon}
              name='clock-o'
              size={14}
            />
            {'  '}
            {item.start_time.slice(11, 16)}
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
    margin: '5%',
    marginBottom: '0%',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontFamily: 'sans-serif',
    color: '#00000087',
    marginBottom: '5%',
    paddingHorizontal: '10%',
  },
  list: {
    borderColor: '#00000087',
  },
  item: {
    marginHorizontal: '10%',
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    borderBottomWidth: 1,
    borderColor: '#00000087',
  },
  icon: {
    color: '#00000087',
    padding: '10%',
  },
  itemText: {

  },
})

export default OwnEvents
