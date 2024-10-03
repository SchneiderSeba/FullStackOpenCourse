
import React, { useState } from 'react'
import './loginForm.css'

export const LoginForm = ({ handleLogin }) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
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

export const LoggedUser = ({ user, setUser }) => {
  return (
    <div className='loggedSection'>
      <p>{user.name} is logged <span>IN</span></p>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
}