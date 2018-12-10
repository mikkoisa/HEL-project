import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import MapScreen from '../containers/MapScreen'
import ListScreen from '../containers/ListScreen'
import CreateScreen from '../containers/CreateScreen'
import EventDetails from '../components/EventDetails'
import OwnEventScreen from '../containers/OwnEventsScreen'
import EventList from '../components/event list components/EventList'
import TopBar from '../components/TopBar';

const ListStack = createStackNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <TopBar />,
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('handleBarNavigation')}
        >
          <Icon
            name="user"
            color="#000000"
            size={30}
          />
        </TouchableOpacity>
      ),
      headerTitleContainerStyle: {
        paddingLeft: '5%',
      },
      headerRightContainerStyle: {
        marginRight: '3%',
      },
    }),
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
  Own: {
    screen: OwnEventScreen,
    navigationOptions: {
      title: 'Own page',
      headerStyle: {
        backgroundColor: '#f57c00CC',
        borderBottomWidth: 1,
        borderColor: '#00000087',
      },
      headerTitleStyle: {
        fontFamily: 'Roboto',
        color: '#ffffff',
      },
      headerLeftContainerStyle: {
      },
    }, 
  },
})

const MapStack = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <TopBar />,
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('handleBarNavigation')}
        >
          <Icon
            name="user"
            color="#000000"
            size={30}
          />
        </TouchableOpacity>
      ),
      headerTitleContainerStyle: {
        paddingLeft: '5%',
      },
      headerRightContainerStyle: {
        marginRight: '3%',
      },
    }),

  },
  Event: {
    screen: EventDetails,
    navigationOptions: {
      header: null,
    },
  },
  Own: {
    screen: OwnEventScreen,
    navigationOptions: {
      title: 'Own page',
      headerStyle: {
        backgroundColor: '#ffad42',
        borderBottomWidth: 1,
        borderColor: '#00000087',
      },
      headerTitleStyle: {
        fontFamily: 'Roboto',
        color: '#ffffff',
      },
      headerLeftContainerStyle: {
      },
    }, 
  },
})

const RootNavigator = createMaterialBottomTabNavigator({
  Map: {
    screen: MapStack,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: tabbarVisible(navigation),
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
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: tabbarVisible(navigation),
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

const tabbarVisible = (navigation) => {
  const { routes } = navigation.state;

  let showTabbar = true;
  routes.forEach((route) => {
    if (route.routeName === 'Own' || route.routeName === 'Event') {
      showTabbar = false;
    }
  });

  return showTabbar;
};

export default RootNavigator
