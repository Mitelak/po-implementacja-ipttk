import { API_URL } from '@/consts'

function parseJSON (response) {
  if (response.status === 401) {
    return new Promise((resolve) => resolve({
      json: {
        status: response.status,
        message: response.statusText
      }
    }))
  }

  if (response.status === 500) {
    return new Promise((resolve) => resolve({
      json: {
        status: response.status,
        message: 'Internal Server Error'
      }
    }))
  }

  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json
    })))
}

export default function (endpoint, options = {
  method: 'GET',
  headers: {}
}, payload = null) {
  const fetchOptions = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: payload && JSON.stringify(payload)
  }

  if (localStorage.getItem('token')) {
    fetchOptions.headers.authorization = localStorage.getItem('token')
  }

  return new Promise((resolve, reject) => fetch(API_URL + endpoint, fetchOptions)
    .then(parseJSON)
    .then(response => {
      if (response.ok) {
        return resolve(response.json)
      }
      return reject(response.json)
    })
    .catch(err => reject(err.message)))
}
