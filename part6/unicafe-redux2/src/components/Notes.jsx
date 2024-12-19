import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/reducer.js'
import { filteredNotesSelector } from '../reducers/filterReducer.js'

export const Note = ({ note, toggleImportanceOf }) => {
    return (
        <li >
            {note.content} <strong>{note.important ? 'important' : ''}</strong> <button onClick={() => toggleImportanceOf(note.id)}>🔁</button>
        </li>
    )
}

export const Notes = () => {
    const dispatch = useDispatch()
    // const notes = useSelector(state => { 
    //     if (!Array.isArray(state.notes)) {
    //         console.error('state.notes no es un array:', state.notes)
    //         console.log('state.notes:', state.notes)
    //         return []
    //       }
        
    //     if ( state.filter === 'ALL' ) {
    //     return state.notes
    //     }
    //   return state.filter  === 'IMPORTANT' 
    //     ? state.notes.filter(note => note.important)
    //     : state.notes.filter(note => !note.important)
    // }) 

    const notes = useSelector(filteredNotesSelector)

    return (
        <div>
            <ul>
                {notes.map(note => 
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportanceOf={() => dispatch(toggleImportanceOf(note.id))}
                    />
                )}
            </ul>
        </div>
    )
}