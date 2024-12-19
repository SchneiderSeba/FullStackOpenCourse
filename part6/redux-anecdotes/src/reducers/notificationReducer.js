import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        addNotification: (state, action) => action.payload,
        // voteNotification: (state, action) => `You voted for '${action.payload}'`
        voteNotification: (state, action) => {
            return `You voted for '${action.payload}'`
        }
    }
})

export const { addNotification, voteNotification } = notificationSlice.actions