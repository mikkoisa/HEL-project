// Static variables
export default {
  // Test API URL.
  baseEventApiUrl: 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1',
  // Current filtering what we show in our app. yso:p916 is liikunta.
  helsinkiToday: '/event/?start=today&division=helsinki&include=location&keyword=yso:p916',
  // Posting our own events in these urls.
  // TODO: Split base url from these  
  postEvent: 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/event',
  postLocation: 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/place',
} 
