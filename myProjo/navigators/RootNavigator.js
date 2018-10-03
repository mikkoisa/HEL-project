import MapScreen from '../containers/MapScreen';
import ListScreen from '../containers/ListScreen';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'


const RootNavigator = createBottomTabNavigator({
    Map: {
        screen: MapScreen
    },

    List: {
        screen: ListScreen
    },

    More: {
        screen: MapScreen
    }

})

export default RootNavigator