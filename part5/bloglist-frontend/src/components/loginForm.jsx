
import React, { useState } from 'react'

export const LoginForm = ({ handleLogin }) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    }

return (

    <form onSubmit={onSubmit}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
}

  export const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )