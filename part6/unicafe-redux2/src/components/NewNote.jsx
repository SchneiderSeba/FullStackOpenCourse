import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../reducers/reducer.js'
import { filterChange } from '../reducers/filterReducer.js'
import { VisibilityFilter } from './VisibilityFilter.jsx'

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

    const filterSelected = (value) => {
        if(value === 'ALL') {
          return store.dispatch(filterChange('ALL'))
        }
        if(value === 'ONLYIMPORTANT') {
          return store.dispatch(filterChange('IMPORTANT'))
        }
        if(value === 'ONLYNONIMPORTANT') {
          return store.dispatch(filterChange('NONIMPORTANT'))
        }

        console.log(value)
      }

    return (
      <>
        <div>
            <form onSubmit={addNote}>
              <input name="note" />
              <button type="submit">add ➕</button>
            </form>
            <VisibilityFilter filterSelected={filterSelected} />
        </div>
        
      </>
    )
}