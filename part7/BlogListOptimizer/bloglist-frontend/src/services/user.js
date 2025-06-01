import axios from 'axios'
const baseUrl = 'https://blogsweb-production-89be.up.railway.app/api/users'

export const getAllUsers = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}
export const createNewUser = async (newObject) => {
  const res = await axios.post(baseUrl, newObject)
  return res.data
}
