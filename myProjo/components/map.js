import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { Marker, Callout, Overl } from 'react-native-maps';
// import PropTypes from 'prop-types';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { CoordinatorLayout, BottomSheetBehavior, FloatingActionButton } from 'react-native-bottom-sheet-behavior'

import { View, Text, StyleSheet, Modal, Alert, TouchableHighlight, Button } from 'react-native';
import userMarker from '../assets/userMarker.png'
import soccerBall from '../assets/soccerBall.png'

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            visible: false,
            height: 100,

            // List of events here, this is a test list
           
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const { position, events } = this.props
        if (events != null) {
            console.log(events)
        }
        
        // const temploc = {latlng: {latitude: 60.1695291, longitude: 24.9383613}}
        return(
            <View
            style={ styles.container }>
                <MapView
                    style={ styles.container }
                    region={position.coords}>
                    {events.map((event, i) => ( // This will iterate trhrough the events and display them as markers
                        <Marker
                            key={i}
                            coordinate={temploc}
                            title={event.name.fi}
                            description={event.short_description}
                            image={soccerBall}
                            onCalloutPress={() => {
                                this.setModalVisible(true);
                            }}
                        />
                    ))}
                    <Marker //This is the marker for the user's location
                        image={userMarker}
                        coordinate={position.coords}
                        />
                    
                </MapView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    presentationStyle='pageSheet'
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                        <View> 
                            <Text>Hello World!</Text>
                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
Map.propTypes = {

}

Map.defaultProps = {
    events: [
        {latlng: {latitude: 60.1695291, longitude: 24.9383613}, title: 'Football in the city', description: 'Come and play football in the middle of the city!'}
    ]
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        margin: 15, 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        bottom: 50,
        height: 50
    },
    test:{
        //height: this.state.height,
    }
})

export default Map