import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EventListItem = (props) => {
  const { onHandlePress, item } = props
  let source = null

  if (!item.images[0]) {
    source = require('../../assets/ball-football-game-39562.jpg') // eslint-disable-line global-require
  } else {
    source = { uri: item.images[0].url }
  }

  return (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => {
        onHandlePress('Event', item)
      }}
    >
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={source}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle} numberOfLines={1}>
          {item.name[Object.keys(item.name)[0]]}
        </Text>
        <Text style={styles.textDescription} numberOfLines={3}>
          {item.short_description[Object.keys(item.short_description)[0]]}
        </Text>
      </View>
      <Icon 
        name='angle-right'
        color='#f57c00'
        size={40}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    borderColor: '#0003',
  
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f7f8f9',
    elevation: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 15,
  },
  imageContainer: {

    paddingRight: 15,
  },
  textContainer: {
    width: 0,

    flexGrow: 1,
    flex: 1,

    marginHorizontal: 10,
    justifyContent: 'center',
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 82,
    height: 82,
    
  },
  textTitle: {
    color: '#f57c00',
    fontSize: 17,
  },
  textDescription: {
  }, 
})

export default EventListItem
