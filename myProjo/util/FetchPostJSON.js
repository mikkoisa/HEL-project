export default async (url, bodyData, refresh) => {
  fetch('https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/event/', { 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ApiKey: 'M4940gwq7zkoY7lT5Vd6',
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      console.log(response)
      if (response.status >= 400) {
        console.log(`Fetch error: ${response.status}`)
      } else if (response.status === 201) {
        console.log(response.text())
        refresh(bodyData)
        // handleNavigation('Map', mockData)
      }   
    })
    .catch((error, statusCode) => {
      console.log(`Something went wrong: ${error} with ${statusCode}`)
    })
}
