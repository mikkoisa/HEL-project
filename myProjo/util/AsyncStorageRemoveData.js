import { AsyncStorage } from 'react-native'
// Deleting own event from asynStorage.
// TODO: Change deleting to database after creating login authentication.
export default async () => {
  console.log('deleting ...')
  try {
    await AsyncStorage.removeItem('SavedEvents')
    // console.log('removed!!!!')
    return 'success'
  } catch (error) {
    console.log('error removing ', error)
    // Error saving data
    return ('error', error)
  }
}
