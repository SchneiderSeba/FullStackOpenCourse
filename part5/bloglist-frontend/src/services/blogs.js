import axios from 'axios'
const baseUrl = 'https://blogsweb-production-89be.up.railway.app/api/blogs'

let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('Making POST request with:', newObject, config)
  try {
    const response = await axios.post(baseUrl, newObject, config)
    console.log('Response:', response)
    return response.data
  } catch (error) {
    console.log('Error al crear blog:', error.response || error)
    throw error
  }
}

export const updateBlog = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}