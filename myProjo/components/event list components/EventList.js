import React from 'react'
// import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import moment from 'moment'
import EventListItem from './EventListItem'

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
    }
  }
  

  render() {
    const { filter } = this.state
    const { events, handleNavigation, refreshList, refreshOwnEvents } = this.props
    let filteredEvents = events

    if (filter === 'today') {
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).format('LLLL') === moment().format('LLLL'))
    } else if (filter === 'tomorrow') {
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).format('LLLL') === moment().add(1, 'days').format('LLLL'))
    } else if (filter === 'this week') {
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).isAfter(moment().startOf('isoWeek'))
        && moment(obj.start_time).isBefore(moment().endOf('isoWeek')))
    } else if (filter === 'next week') {
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).isAfter(moment().add(1, 'weeks').startOf('isoWeek'))
        && moment(obj.start_time).isBefore(moment().add(1, 'weeks').endOf('isoWeek')))
    }

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            refreshList()
            refreshOwnEvents()
          }
        }
        />
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: '2%', /* flexWrap: 'wrap', */ backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#00000012', elevation: 2 }}>
            <TouchableOpacity style={styles.filterButton} onPress={() => { this.setState({ filter: 'all' }) }}>
              <Text>
                {'All'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => { this.setState({ filter: 'today' }) }}>
              <Text>
                {'Today'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => { this.setState({ filter: 'tomorrow' }) }}>
              <Text>
                {'Tomorrow'} 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => { this.setState({ filter: 'this week' }) }}>
              <Text>
                {'This Week'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => { this.setState({ filter: 'next week' }) }}>
              <Text>
                {'Next Week'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => (
            <EventListItem
              item={item} 
              onHandlePress={handleNavigation}
            />
          )}
          keyExtractor={event => `${event.id}`}
        />
      </View>
    )
  }
}

EventList.defaultProps = {

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  }, 
  filterButton: {
    marginBottom: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24%',
    height: 32,
    borderRadius: 16,
    paddingHorizontal: '2%',
    paddingBottom: '5%',
    marginHorizontal: '2%',
    backgroundColor: '#0000001e',
  },  
})


export default EventList
