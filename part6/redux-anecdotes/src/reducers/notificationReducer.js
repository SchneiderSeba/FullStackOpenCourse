import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        // addNotification: (state, action) => action.payload,
        // // voteNotification: (state, action) => `You voted for '${action.payload}'`
        // voteNotification: (state, action) => {
        //     return `You voted for '${action.payload}'`
        // }
        setNotification: (state, action) => action.payload,
        clearNotification: () => ""

    }
})

export const { addNotification, voteNotification, setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, timeInSeconds) => {
    return dispatch => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, timeInSeconds * 1000)
    }
  }