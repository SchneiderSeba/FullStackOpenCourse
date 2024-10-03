import { useState, useEffect } from 'react'
import { getAll, setToken, createBlog } from './services/blogs.js'
import { login } from './services/login.js'
import { BlogSection, FormNewBlog } from './components/BlogSection.jsx'
import { LoggedUser, LoginForm } from './components/loginForm.jsx'
import { Footer } from './Footer.jsx'
import { Notification } from './components/Notification.jsx'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogAdded, setBlogAdded] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        setToken(user.token)
      }
      setTimeout(() => {
        window.localStorage.removeItem('loggedBlogAppUser')
      }, 1000 * 20)
    }, [])

  const handleLogin = async (username, password) => {  
    try {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const blog = await createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      setBlogAdded(`Blog ${newBlog.title} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <h1>Blogs Website</h1>

      {errorMessage && <Notification message={errorMessage} type="error" />}

      {blogAdded && <Notification message={blogAdded} type="success" />}

      {user === null ? <Notification message='Please login to create a blog' /> : <LoggedUser user={user} setUser={setUser} />}

      {user !== null && <FormNewBlog handleCreateBlog={handleCreateBlog} />}

      {user === null ? <LoginForm handleLogin={handleLogin}/> : <BlogSection blogs={blogs} />}
      

      <Footer user={user?.name}/>
      
    </> 
    )
}

export default App