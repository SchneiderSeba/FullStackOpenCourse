import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/reducer'

export const Note = ({ note, toggleImportanceOf }) => {
    return (
        <li >
            {note.content} <strong>{note.important ? 'important' : ''}</strong> <button onClick={() => toggleImportanceOf(note.id)}>🔁</button>
        </li>
    )
}

export const Notes = ({ toggleImportanceOf }) => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.notes)

    return (
        <div>
            <ul>
                {notes.map(note => 
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportanceOf={() =>
                            dispatch(toggleImportanceOf(note.id))
                        }
                    />
                )}
            </ul>
        </div>
    )
}