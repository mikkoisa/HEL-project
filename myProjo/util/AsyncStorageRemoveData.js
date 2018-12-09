import { AsyncStorage } from 'react-native'

export default async () => {
  console.log('deleting ...')
  try {
    await AsyncStorage.removeItem('SavedEvents')
    console.log('removed!!!!')
    return 'success'
  } catch (error) {
    console.log('error removing ', error)
    // Error saving data
    return ('error', error)
  }
}
