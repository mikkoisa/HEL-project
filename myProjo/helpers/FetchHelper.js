import fetchGetJSON from '../util/FetchGetJSON'
import { baseEventApiUrl } from '../constants/config'

export default () => fetchGetJSON(`${baseEventApiUrl}/event/?start=today&end=today&division=helsinki&include=location&keyword=yso:p916`)
// .then(result => getEventCoordinates(result.data))
// .catch((e) => {
//  console.log(e)
// })


/* const getEventCoordinates = (list) => {
  // Gets location id from object and puts it to new array.
  const locationList = list.map(item => item.location['@id']);
  // gets promises from fetches and then gets array that contains all place information
  // return getLocations(locationList)
  // .then(values => combineEventInfo(list, values)).catch((e) => {
  //  console.log(e)
  // })
}

const getLocations = (locationList) => {
  // Multiple fetches and after fetching it continues
  const locationResult = []
  for (let i = 0; i < locationList.length; i += 1) {
    console.log('fetchaa sijainnin')
    locationResult.push(fetchGetJSON(locationList[i]))
  }
  return Promise.all(locationResult)
}

const combineEventInfo = (list, values) => {
  const combinedList = []
  for (let i = 0; i < list.length; i += 1) {
    combinedList.push({ ...list[i], 
      ...values[i].position, 
      ...{ locName: values[i].name }, 
      ...{ locAddress: values[i].street_address,
      } })
  }
  return combinedList
} */
