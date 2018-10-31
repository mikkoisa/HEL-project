import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import MapScreen from '../containers/MapScreen';
import ListScreen from '../containers/ListScreen';
import CreateScreen from '../containers/CreateScreen';

const RootNavigator = createMaterialBottomTabNavigator({
  Map: {
    screen: MapScreen,
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
    screen: ListScreen,
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
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#3f51b5' },
})

export default RootNavigator
