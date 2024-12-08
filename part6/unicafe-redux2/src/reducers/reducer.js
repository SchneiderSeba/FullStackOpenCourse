const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const initialStateNotes = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
    filter: 'ALL'
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
    filter: 'ALL'
  },
]

export const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 }
    case 'OK':
      return { ...state, ok: state.ok + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      return initialState
    case 'DO_NOTHING':
      return state
    default: return state
  }
  
}

export const noteReducer = (state = initialStateNotes, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    default: return state
  }
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

