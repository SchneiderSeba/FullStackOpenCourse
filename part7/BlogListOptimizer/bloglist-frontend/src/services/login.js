import axios from 'axios'
const baseUrl = 'https://blogsweb-production-89be.up.railway.app/api/login'

export const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}
