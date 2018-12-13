// Getting data from linked couses test api. Can be also used in other fetches.
export default (url, customHeaders = {}) => {
  // console.log(`goes to fetch: ${url}`)
  const defaultHeaders = {
    Method: 'GET',
    Accept: 'application/json',
    'Content-type': 'application/json',
  }
  const headers = {
    ...defaultHeaders,
    ...customHeaders,
  }
  // console.log(headers)

  return fetch(url, headers)
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
