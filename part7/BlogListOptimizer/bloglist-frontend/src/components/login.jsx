import { useState } from 'react'
import PropTypes from 'prop-types'
import './login.css'

export const LoginForm = ({ handleLogin, handleSignUp }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return isVisible ? (
    <SignUpForm
      handleSignUp={handleSignUp}
      handleLogin={handleLogin}
      toggleVisibility={toggleVisibility}
    />
  ) : (
    <form onSubmit={onSubmit} role="form">
      <div>
        Username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={toggleVisibility} className="signupBtn">
        Sign Up
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export const SignUpForm = ({ handleSignUp, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleSignUp({ username, name, password })
      setUsername('')
      setPassword('')
      setName('')
    } catch (error) {
      console.log('Error signing up:', error)
    }
  }

  return isVisible ? (
    <LoginForm handleLogin={handleLogin} handleSignUp={handleSignUp} />
  ) : (
    <form onSubmit={onSubmit} role="form">
      <div>
        Username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Name
        <input
          data-testid="name"
          type="text"
          value={name}
          name="Name"
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div>
        Password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="signupBtn">
        Sign Up
      </button>
      <button type="button" onClick={toggleVisibility}>
        Login
      </button>
    </form>
  )
}

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
}
