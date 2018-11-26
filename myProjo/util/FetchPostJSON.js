export default (url, bodyData) => {
  // console.log(`goes to fetch: ${url}`)
  // M4940gwq7zkoY7lT5Vd6 API KEY FOR OUR GROUP
  const headers = {
    Method: 'POST',
    Accept: 'application/json',
    'Content-type': 'application/json',
    ApiKey: 'M4940gwq7zkoY7lT5Vd6',
  }

  const data = {
    headers,
    body: JSON.stringify(bodyData),
  }

  return fetch(url, data)
    .then((response) => {
      // console.log(response)
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