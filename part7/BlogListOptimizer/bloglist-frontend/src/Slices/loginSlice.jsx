
import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: { _id: '', username: null, password: null, token: null },
  reducers: {
    setLoginCredentials: (state, action) => {
      return action.payload
      // const { _id, username, password } = action.payload
      // state._id = _id
      // state.username = username
      // state.password = password
    },
    clearLoginCredentials: (state) => {
      return { _id: '', username: null, password: null, token: null }
      // state._id = ''
      // state.username = null
      // state.password = null
    }
  }
})

export const { setLoginCredentials, clearLoginCredentials } = loginSlice.actions
export default loginSlice.reducer