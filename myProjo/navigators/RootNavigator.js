import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import MapScreen from '../containers/MapScreen';
import ListScreen from '../containers/ListScreen';
import CreateScreen from '../containers/CreateScreen';
import EventDetails from '../components/EventDetails';
import EventList from '../components/EventList'

const ListStack = createStackNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      header: null,
    },
  },
  EventList: {
    screen: EventList,
    navigationOptions: {
      header: null,
    },
  },
  Event: {
    screen: EventDetails,
    navigationOptions: {
      header: null,
    },
  },
})

const MapStack = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: {
      header: null,
    },
  },
  Event: {
    screen: EventDetails,
    navigationOptions: {
      header: null,
    },
  },
})

const RootNavigator = createMaterialBottomTabNavigator({
  Map: {
    screen: MapStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="map"
          color={tintColor}
          size={24}
        />
      ),
    }),
  },

  List: {
    screen: ListStack,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="list"
          color={tintColor}
          size={24}
        />
      ),
    }),
  },

  Create: {
    screen: CreateScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="plus-circle"
          color={tintColor}
          size={24}
        />
      ),
    }),
  },

}, {
  tabBarOptions: { 
    showIcon: true, 
  }, 
  initialRouteName: 'Map',
  activeColor: '#f57c00',
  inactiveColor: '#000000',
  barStyle: { backgroundColor: '#FFFFFF' },
})

export default RootNavigator
