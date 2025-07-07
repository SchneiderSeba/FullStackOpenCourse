/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './Slices/NotificationSlice.jsx'
import { getAll, setToken, createBlog, updateBlog, deleteBlog } from './services/blogs.js'
import { login } from './services/login.js'
import { BlogSection, FormNewBlog } from './components/BlogSection.jsx'
import { LoggedUser } from './components/loggedInfo.jsx'
import { LoginForm, SignUpForm } from './components/login.jsx'
import { Footer } from './Footer.jsx'
import { Notification } from './components/Notification.jsx'
import { ToggleBtn } from './components/ToggleBtn.jsx'
import { createNewUser } from './services/user.js'
import { setNewBlog, clearNewBlog } from './Slices/CreateBlogSlice.jsx'
import { setLoginCredentials, clearLoginCredentials } from './Slices/loginSlice.jsx'
import { Users } from './components/Users.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogAdded, setBlogAdded] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [viewContent, setViewContent] = useState(false)
  const [newLikes, setNewLikes] = useState(0)
  const [refresher, setRefresher] = useState(false)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const { message, type } = notification
  const [showUsers, setShowUsers] = useState(false)

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
      dispatch(setLoginCredentials({ user }))
      // dispatch(setLoginCredentials({ username, password, id }))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log('User logged in:', user)
      dispatch(setNotification({ message: 'Login successful', type: 'success' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
      setShowCreateForm(false)
      setRefresher(!refresher)
      setToken(user.token)
      setUser(user)
    } catch (error) {
      // setErrorMessage('Wrong Username or Password')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 30000)
      dispatch(setNotification({ message: 'Wrong Username or Password', type: 'error' }))
      setTimeout(() => {
        dispatch(clearLoginCredentials())
        dispatch(clearNotification())
      }, 3000)
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
      dispatch(setNotification({ message: 'User created successfully', type: 'success' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
      setShowCreateForm(false)
      setRefresher(!refresher)
    } catch (error) {
      console.error('Error creating user:', error)
      // setErrorMessage('Error creating user')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      dispatch(setNotification({ message: 'Error creating user', type: 'error' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const handleCreateBlog = async (newBlog) => {
    try {

      const blog = await createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      dispatch(setNewBlog(blog))
      // const blog = await createBlog(newBlog)

      // setBlogAdded(`Blog ${newBlog.title} added`)
      // setTimeout(() => {
      //   setBlogAdded(null)
      // }, 5000)
      dispatch(setNotification({ message: `Blog ${newBlog.title} added`, type: 'success' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
      setShowCreateForm(false)
      setRefresher(!refresher)
    } catch (error) {
      // setErrorMessage('Error creating blog')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      dispatch(setNotification({ message: 'Error creating blog', type: 'error' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const handleUpdateBlog = async (id, upDateBlog) => {
    try {
      const returnedBlog = await updateBlog(id, upDateBlog)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      setNewLikes(returnedBlog.likes)
      dispatch(setNotification({ message: `Blog ${returnedBlog.title} updated`, type: 'success' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
      setRefresher(!refresher)
      setViewContent(false)
      return returnedBlog
    } catch (error) {
      // setErrorMessage('Error updating blog')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      dispatch(setNotification({ message: 'Error updating blog', type: 'error' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const handleDeleteBlog = async (_id, user) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    const blogToDelete = blogs.find((blog) => blog._id === _id)

    if (blogToDelete.user.id !== user.id) {
      // setErrorMessage('You are not allowed to delete this blog')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      dispatch(setNotification({ message: 'You are not allowed to delete this blog', type: 'error' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }
      , 3000)
      return
    }
    try {
      await deleteBlog(_id)
      setBlogs(blogs.filter((blog) => blog._id !== _id))
      setRefresher(!refresher)
      dispatch(setNotification({ message: `Blog ${blogToDelete.title} deleted`, type: 'success' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
      setViewContent(false)
    } catch (error) {
      // setErrorMessage('Only allowed to delete your own blogs')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      dispatch(setNotification({ message: 'Only allowed to delete your own blogs', type: 'error' }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const handleToggle = () => {
    setShowCreateForm(!showCreateForm)
  }

  const handleView = () => {
    setViewContent(!viewContent)
  }

  const handleShowUsers = () => {
    setShowUsers(!showUsers)
    //timer to reset state//
    setTimeout(() => {
      setShowUsers(false)
    }, 15000)

  }

  return (
    <>
      <h1>Blogs Website</h1>

      <Notification />

      {/* {errorMessage && <Notification message={errorMessage} type="error" />}

      {blogAdded && <Notification message={blogAdded} type="success" />} */}

      {user !== null && <LoggedUser user={user} setUser={setUser} />}

      {user !== null && (
        <ToggleBtn
          handleToggle={handleToggle}
          showCreateForm={showCreateForm}
        />
      )}

      {showCreateForm && <FormNewBlog handleCreateBlog={handleCreateBlog} />}

      {user && <Users handleShowUsers={handleShowUsers} showUsers={showUsers} user={user} blogs={blogs} />}

      {user === null ? (
        <LoginForm handleLogin={handleLogin} handleSignUp={handleSignUp} />
      ) : (
        <BlogSection
          blogs={blogs}
          viewContent={viewContent}
          handleView={handleView}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
          user={user}
        />
      )}

      {user !== null && <Footer user={user} />}
    </>
  )
}

export default App
