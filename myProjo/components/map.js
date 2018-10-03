import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { View, Text, StyleSheet} from 'react-native';
import userMarker from '../assets/userMarker.png'

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { position } = this.props
        return(
            <MapView
                style={ styles.container }
                region={position.coords}>
                <Marker
                    image={userMarker}
                    coordinate={position.coords}
                    />
    
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f7f7f7'
    }
})

export default Map