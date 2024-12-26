import { configureStore } from '@reduxjs/toolkit'
import { anecdoteSlice } from '../src/reducers/anecdoteReducer.js'
import { notificationSlice } from '../src/reducers/notificationReducer.js'

export const store = configureStore({
    reducer: {
      anecdotes: anecdoteSlice.reducer,
      notification: notificationSlice.reducer
    }
  })