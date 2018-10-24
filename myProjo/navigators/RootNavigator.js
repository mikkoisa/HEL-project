import MapScreen from '../containers/MapScreen';
import ListScreen from '../containers/ListScreen';
import CreateScreen from '../containers/CreateScreen';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import soccerBall from '../assets/soccerBall.png'


const RootNavigator = createMaterialBottomTabNavigator({
    Map: {
        screen: MapScreen,

        navigationOptions: {
            title: 'Map',
        }
             
    },

    List: {
        screen: ListScreen
    },

    Create: {
        screen: CreateScreen
    }

},  {
    initialRouteName: 'Map',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
}

)

export default RootNavigator