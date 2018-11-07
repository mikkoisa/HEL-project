import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import soccerBall from '../assets/soccerBall.png'

const EventListItem = (props) => {
  const { onHandlePress, item } = props

  return (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => {
        onHandlePress(true, item)
      }}
    >
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={soccerBall}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>
          {item.title}
        </Text>
        <Text style={styles.textDescription}>
          {item.shortDescription}
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
    padding: 15,

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
    width: 50,
    height: 50,
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
