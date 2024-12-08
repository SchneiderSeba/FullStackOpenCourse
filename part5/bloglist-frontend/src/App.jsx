/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { getAll, setToken, createBlog, updateBlog, deleteBlog } from './services/blogs.js'
import { login } from './services/login.js'
import { BlogSection, FormNewBlog } from './components/BlogSection.jsx'
import { LoggedUser } from './components/loggedInfo.jsx'
import { LoginForm, SignUpForm } from './components/login.jsx'
import { Footer } from './Footer.jsx'
import { Notification } from './components/Notification.jsx'
import { ToggleBtn } from './components/ToggleBtn.jsx'
import { createNewUser } from './services/user.js'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogAdded, setBlogAdded] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [viewContent, setViewContent] = useState(false)
  const [newLikes, setNewLikes] = useState(0)
  const [refresher, setRefresher] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [newLikes, refresher])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
    const timeoutId = setTimeout(() => {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      console.log('Token eliminado, usuario deslogueado')
      setRefresher(!refresher)
    }, 1000 * 60)

    return () => clearTimeout(timeoutId)

  }, [])

  const handleLogin = async (username, password, id) => {
    try {
      const user = await login({ username, password, id })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log('User logged in:', user)
      setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 30000)
    }
    console.log('logging in with', username, password)
  }

  const handleSignUp = async (userData) => {
    try {
      const newUser = await createNewUser(userData)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))
      setToken(newUser.token)
      setUser(newUser)
      console.log('User created:', newUser)
    } catch (error) {
      console.error('Error creating user:', error)
      setErrorMessage('Error creating user')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const blog = await createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      setBlogAdded(`Blog ${newBlog.title} added`)
      setTimeout(() => {
        setBlogAdded(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (id, upDateBlog) => {
    try {
      const returnedBlog = await updateBlog(id, upDateBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setNewLikes(returnedBlog.likes)
      return returnedBlog
    } catch (error) {
      setErrorMessage('Error updating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (_id, user) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    const blogToDelete = blogs.find(blog => blog._id === _id)

    if (blogToDelete.user.id !== user.id) {
      setErrorMessage('You are not allowed to delete this blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    try {
      await deleteBlog(_id)
      setBlogs(blogs.filter(blog => blog._id !== _id))
      setRefresher(!refresher)
    } catch (error) {
      setErrorMessage('Only allowed to delete your own blogs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleToggle = () => {
    setShowCreateForm(!showCreateForm)
  }

  const handleView = () => {
    setViewContent(!viewContent)
  }

  return (
    <>
      <h1>Blogs Website</h1>

      {errorMessage && <Notification message={errorMessage} type="error" />}

      {blogAdded && <Notification message={blogAdded} type="success" />}

      {user === null ? <Notification message='Please login to See our blogs' type="before" /> : <LoggedUser user={user} setUser={setUser} />}

      {user !== null && <ToggleBtn handleToggle={handleToggle} showCreateForm={showCreateForm}/>}

      {showCreateForm && <FormNewBlog handleCreateBlog={handleCreateBlog}/>}

      {user === null ? <LoginForm handleLogin={handleLogin} handleSignUp={handleSignUp} /> : <BlogSection blogs={blogs} viewContent={viewContent}  handleView={handleView} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} user={user}/>}

      {user !== null && (<Footer user={user} />)}

    </>
  )
}

export default App
