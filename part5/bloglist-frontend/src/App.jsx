import { useState, useEffect } from 'react'
import { getAll } from './services/blogs.js'
import { login } from './services/login.js'
import { BlogSection } from './components/BlogSection.jsx'
import { LoginForm } from './components/loginForm.jsx'
import { Footer } from './Footer.jsx'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const handleLogin = async (username, password) => {  
    try {
      const user = await login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  return (
    <>
      <h1>Blogs</h1>
      {/* <Notification message={errorMessage} /> */}

      {user === null ? <LoginForm handleLogin={handleLogin}/> : <BlogSection blogs={blogs} />}

      <Footer user={user?.name}/>
      
    </> 
    )
}

export default App