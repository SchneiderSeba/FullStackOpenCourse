import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/reducer.js'
import { VisibilityFilter } from './VisibilityFilter.jsx'

export const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <>
      <div>
        <form onSubmit={addNote}>
          <input name="note" />
          <button type="submit">add ➕</button>
        </form>
        <VisibilityFilter />
      </div>
    </>
  )
}