import { AsyncStorage } from 'react-native'

export default async () => {
  console.log('getting')
  try {
    const value = await AsyncStorage.getItem('SavedEvents');
    if (value !== null) {
      // We have data!!
      return value
    } 
    return null
  } catch (error) {
    console.log('error getting ', error)
    return error
    // Error retrieving data
  } 
}
