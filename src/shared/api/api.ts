// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://app.nobaddays.site/api',
  baseURL: 'http://localhost:7001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default api
