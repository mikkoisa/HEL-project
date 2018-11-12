import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EventListItem = (props) => {
  const { onHandlePress, item } = props
  if (!item.images[0]) {
    item.images = [{ url: 'https://images.pexels.com/photos/39562/the-ball-stadion-football-the-pitch-39562.jpeg?cs=srgb&dl=ball-football-game-39562.jpg&fm=jpg' }]
  }
  console.log(item.images)

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
          source={{ uri: item.images[0].url }}
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
    // borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f7f8f9',
    elevation: 5,
    margin: 5,
    // padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 15,

    // justifyContent: 'space-between',
  },
  imageContainer: {

    paddingRight: 15,
  },
  textContainer: {
    // alignItems: 'center',
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
    // resizeMode: 'contain',
    
  },
  textTitle: {
    color: '#f57c00',
    fontSize: 17,
  },
  textDescription: {
    // flex: 1,
    // flexWrap: 'wrap',
  }, 
})

export default EventListItem
