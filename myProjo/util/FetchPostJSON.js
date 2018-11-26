export default (url, bodyData) => {
  // console.log(`goes to fetch: ${url}`)
  // M4940gwq7zkoY7lT5Vd6 API KEY FOR OUR GROUP
  const headers = {
    Method: 'POST',
    Accept: 'application/json',
    'Content-type': 'application/json',
    ApiKey: 'M4940gwq7zkoY7lT5Vd6',
  }

  console.log('DOES IT GO HERE')
  const bodyString = JSON.stringify(bodyData)

  const data = {
    ...headers,
    body: bodyData,
  }

  console.log(data)
  console.log(url)

  return fetch(url, { 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyString,
  })
    .then((response) => {
      console.log(response)
      if (response.status >= 400) {
        console.log(`Fetch error: ${response.status}`)
        Promise.reject(null, response.status)
      }
      return response.json();
    })
    .catch((error, statusCode) => {
      console.log(`Something went wrong: ${error} with ${statusCode}`)
    })
}
