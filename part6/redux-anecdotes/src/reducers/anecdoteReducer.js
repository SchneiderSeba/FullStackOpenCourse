import { createSlice } from "@reduxjs/toolkit"
import { getAll } from '../../services/anecdotes'
import { updateVotes as updateVotesService } from '../../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

export const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialAnecdotes = anecdotesAtStart.map(asObject).sort((a, b) => {
//   const aContent = a.content.substring(0, 3).toLowerCase();
//   const bContent = b.content.substring(0, 3).toLowerCase();
//   if (aContent < bContent) return -1;
//   if (aContent > bContent) return 1;
//   return 0;
// });


const initialState = { anecdotes: [], filter: '' }

// export const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'VOTE': {
//       const id = action.data.id
//       const anecdoteToVote = state.anecdotes.find(a => a.id === id)
//       const votedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1
//       }
//       return {
//         ...state,
//         anecdotes: state.anecdotes.map(a => a.id !== id ? a : votedAnecdote)
//       }
//     }
//     case 'NEW_ANECDOTE':
//       return {
//         ...state,
//         anecdotes: [...state.anecdotes, action.data]
//       }

//     case 'SET_FILTER':
//       return { ...state, filter: action.data }

//     default:
//       return state
//   }
// }

export const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.anecdotes.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.anecdotes.find(a => a.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes++
      }
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      state.anecdotes = action.payload
    }
  }
})

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

// export const setFilter = (filter) => {
//   return {
//     type: 'SET_FILTER',
//     data: filter
//   }
// }

export const { createAnecdote, addVote, setFilter, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions


export const initializerAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const updateVotes = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await updateVotesService(id)
    dispatch(addVote(updatedAnecdote.id))
  }
}