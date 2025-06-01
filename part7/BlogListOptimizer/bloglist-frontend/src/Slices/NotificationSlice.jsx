import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    setNotification: (state, action) => {
      const { message, type } = action.payload
      state.message = message
      state.type = type
    },
    clearNotification: (state) => {
      state.message = null
      state.type = null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer