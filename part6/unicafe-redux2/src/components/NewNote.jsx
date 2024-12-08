import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../reducers/reducer'

export const NewNote = ({ store }) => {

    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes)

    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createNote(content))
      }
    const toggleImportance = (id) => {
        dispatch(toggleImportanceOf(id))
      }

    return (
        <div>
            <form onSubmit={addNote}>
              <input name="note" />
              <button type="submit">add ➕</button>
            </form>
        </div>
    )
}