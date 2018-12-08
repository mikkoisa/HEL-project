import { AsyncStorage } from 'react-native'

export default async (data) => {
  console.log('saving...', data)
  try {
    await AsyncStorage.setItem('SavedEvents', JSON.stringify(data))
    return 'success'
  } catch (error) {
    console.log('error saving ', error)
    // Error saving data
    return ('error', error)
  }
}
