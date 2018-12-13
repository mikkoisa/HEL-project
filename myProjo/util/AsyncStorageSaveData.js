import { AsyncStorage } from 'react-native'
// Saving own events to asyncStorage.
// TODO: Change saving to database after creating login authentication.
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
