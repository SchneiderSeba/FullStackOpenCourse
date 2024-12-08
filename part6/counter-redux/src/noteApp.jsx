// import { noteReducer } from "./reducers/noteReducer"

import { store } from './reducers/noteReducer.js'
  
  export const NoteApp = () => {
    return(
      <div>
        <ul>
          {store.getState().map(note=>
            <li key={note.id}>
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
            </li>
          )}
          </ul>
      </div>
    )
  }