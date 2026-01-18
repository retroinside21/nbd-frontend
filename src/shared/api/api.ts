// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://155.212.189.107', // <- замени на свой базовый URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default api
