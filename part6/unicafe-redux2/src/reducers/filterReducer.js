export const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        console.log(action.payload)
        return action.payload
      default:
        return state
    }
  }

import { createSelector } from 'reselect'

const selectNotes = state => state.notes
const selectFilter = state => state.filter

export const filteredNotesSelector = createSelector(
  [selectNotes, selectFilter],
  (notes, filter) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  }
)