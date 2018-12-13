import React from 'react'
// import PropTypes from 'prop-types'
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
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
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).subtract(2, 'hours').format('LL') === moment().format('LL'))
    } else if (filter === 'tomorrow') {
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).subtract(2, 'hours').format('LL') === moment().add(1, 'days').format('LL'))
    } else if (filter === 'this week') {
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).subtract(2, 'hours').isAfter(moment().startOf('isoWeek'))
        && moment(obj.start_time).subtract(2, 'hours').isBefore(moment().endOf('isoWeek')))
    } else if (filter === 'next week') {
      filteredEvents = filteredEvents.filter(obj => moment(obj.start_time).subtract(2, 'hours').isAfter(moment().add(1, 'weeks').startOf('isoWeek'))
        && moment(obj.start_time).subtract(2, 'hours').isBefore(moment().add(1, 'weeks').endOf('isoWeek')))
    }

    const firstEvent = filteredEvents[0]

    console.log(filteredEvents)
    if (filteredEvents.length !== 0) { 
      return (
        <View style={styles.container}>
          <NavigationEvents
            onWillFocus={() => {
              refreshList()
              refreshOwnEvents()
            }
        }
          />
          <FlatList
            style={{ flex: 1 }}
            data={filteredEvents}
            renderItem={({ item }) => (
              firstEvent === item
                ? (
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: '2%', flexWrap: 'wrap', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#00000012', elevation: 2 }}>
                      <TouchableOpacity style={[styles.filterButton, filter === 'all' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'all' }) }}>
                        <Text>
                          {'All'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.filterButton, filter === 'today' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'today' }) }}>
                        <Text>
                          {'Today'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.filterButton, filter === 'tomorrow' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'tomorrow' }) }}>
                        <Text>
                          {'Tomorrow'} 
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.filterButton, filter === 'this week' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'this week' }) }}>
                        <Text>
                          {'This Week'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.filterButton, filter === 'next week' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'next week' }) }}>
                        <Text>
                          {'Next Week'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <EventListItem
                      item={item} 
                      onHandlePress={handleNavigation}
                    />
                  </View>
                )
                : (
                  <EventListItem
                    item={item} 
                    onHandlePress={handleNavigation}
                  />
                )
            )}
            keyExtractor={event => `${event.id}`}
          />
        </View>
      ) 
    } 
    console.log('elseen')
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            refreshList()
            refreshOwnEvents()
          }
        }
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: '2%', flexWrap: 'wrap', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#00000012', elevation: 2 }}>
          <TouchableOpacity style={[styles.filterButton, filter === 'all' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'all' }) }}>
            <Text>
              {'All'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filter === 'today' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'today' }) }}>
            <Text>
              {'Today'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filter === 'tomorrow' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'tomorrow' }) }}>
            <Text>
              {'Tomorrow'} 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filter === 'this week' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'this week' }) }}>
            <Text>
              {'This Week'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filter === 'next week' ? { backgroundColor: '#f57c00CC' } : { }]} onPress={() => { this.setState({ filter: 'next week' }) }}>
            <Text>
              {'Next Week'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

EventList.defaultProps = {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
