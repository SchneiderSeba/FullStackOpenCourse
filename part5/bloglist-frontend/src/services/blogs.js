import axios from 'axios'
const baseUrl = 'https://blogsweb-production-89be.up.railway.app/api/blogs'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}