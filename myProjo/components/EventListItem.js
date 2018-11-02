import React from 'react'
import { View, Text } from 'react-native'

const EventListItem = (props) => {
  const { title, shortDescription } = props

  return (
    <View>
      <Text>
        {title}
      </Text>
      <Text>
        {shortDescription}
      </Text>
    </View>
  )
}

export default EventListItem
