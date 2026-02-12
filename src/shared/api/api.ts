// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:7001/',
  // baseURL: 'https://app.nobaddays.site/api',
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default api
