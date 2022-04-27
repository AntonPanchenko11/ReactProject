import axios from 'axios'
import get from 'lodash/get'
import endsWith from 'lodash/endsWith'

// src
import { setJWTBearerToken, getJWTBearerToken, removeJWTBearerToken } from './storage.config'

const baseURL  = 'http://0.0.0.0:3000'

const headers = {
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

const axiosClient = axios.create({
  headers,
  baseURL
})

axiosClient.interceptors.request.use(
  async (request) => {
    const token = await setJWTBearerToken()
    if (token) {
      request.headers.Authorization = 'Bearer ' + token
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  async (response) => {
    const token = get(response.headers, 'authorization', false)
    if (token) {
      await getJWTBearerToken(token)
    }
    if (endsWith(response.config.url, '/sign_out') && response.status === 200) {
      await removeJWTBearerToken()
    }
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export {
  axiosClient,
  baseURL,
  headers
}